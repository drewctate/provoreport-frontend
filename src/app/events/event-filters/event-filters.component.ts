import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { DateRangeGenerator } from './date-range';
import { environment } from '../../../environments/environment';
import { DateRange, TagInfo, Event } from '../../types';
import { TagsService, EventFiltersService } from '../services';
import { SplashService } from '../../services';
import { CustomDatePickerDialogComponent } from './custom-date-picker-dialog/custom-date-picker-dialog.component';

@Component({
  selector: 'app-event-filters',
  templateUrl: './event-filters.component.html',
  styleUrls: ['./event-filters.component.scss']
})
export class EventFiltersComponent implements OnInit {
  @Output() tagsChanged = new EventEmitter<string[]>();

  public activeDateRange: DateRange = DateRangeGenerator.getThisWeek();
  public customDateRange = false; // True if activeDateRange is custom

  private searchString = '';
  private searchTimeout = null;
  private searchDebounceLength = 300;
  public maxQueryLength = environment.fuseOptions.maxPatternLength;

  public dateRanges: DateRange[];

  public tagInfos: TagInfo[];
  public selectedTags: Map<string, boolean> = new Map();

  private readonly queryStringTagSeparator = ',';

  constructor(
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private eventFiltersService: EventFiltersService,
    private splash: SplashService,
    private route: ActivatedRoute,
    private router: Router,
    private tagsService: TagsService
  ) {
  }

  async ngOnInit() {
    this.tagInfos = await this.tagsService.getAllTags();
    this.updateFilterTags(this.selectedTags);
    await this.getTagsFromQueryParams();
    const dateRanges = await this.initializeDateRanges();
    const weekRange = dateRanges[1];
    const initialRange = await this.getDateRangeFromQueryParams();
    await this.activateDateRange(initialRange || weekRange);
    this.splash.hide();
  }

  /*
   * TAGS
   */

  public isTagSelected(tagInfo: TagInfo) {
    return this.selectedTags.has(tagInfo.tag) && this.selectedTags.get(tagInfo.tag);
  }

  public toggleSelected(tagInfo: TagInfo) {
    if (this.isTagSelected(tagInfo)) {
      this.selectedTags.set(tagInfo.tag, false);
    } else {
      this.selectedTags.set(tagInfo.tag, true);
    }
    this.cdRef.detectChanges();

    this.updateFilterTags(this.selectedTags);
    this.updateTagQueryParam(this.selectedTags);
  }

  public clearTagFilters() {
    this.selectedTags.clear();
    this.updateTagQueryParam(this.selectedTags);
    this.updateFilterTags(this.selectedTags);
  }

  private getSelectedTagNames(selectedTags: Map<string, boolean>): string[] {
    return Array.from(selectedTags.entries())
      .filter(([_, selected]) => selected)
      .map(([tagName, _]) => tagName);
  }

  /**
   * Updates the available tags after a filter operation. Some tags
   * may not exist in the new filtered list. If they don't, they are
   * removed from the filter service and the query params.
   * @param filteredEvents The new list of filtered events.
   * @param range The currently active date range (for updating the query params)
   */
  private updateTagsAfterFilter(filteredEvents: Event[], range: DateRange) {
    const newTagInfos = this.tagsService.countTagsOnEvents(filteredEvents);

    this.tagInfos = newTagInfos;

    for (const tagName of Array.from(this.selectedTags.keys())) {
      const tagInfoWithThatName = this.tagInfos.find(info => info.tag === tagName);
      if (!tagInfoWithThatName) {
        this.selectedTags.set(tagName, false);
      }
    }

    this.updateFilterTags(this.selectedTags);
    this.updateTagQueryParam(this.selectedTags)
      .then(_ => {
        this.updateDateRangeQueryParams(range);
      });
  }

  /*
   * DATES and SEARCH
   */

  public isDateRangeSelected(range: DateRange) {
    return DateRangeGenerator.areRangesEqual(range, this.activeDateRange);
  }

  private initializeDateRanges(): DateRange[] {
    this.dateRanges = [
      DateRangeGenerator.getToday(),
      DateRangeGenerator.getThisWeek(),
      DateRangeGenerator.getThisWeekend(),
      DateRangeGenerator.getNextWeek(),
      DateRangeGenerator.getNextWeekend()
    ];
    return this.dateRanges;
  }

  public debouncedSearch(searchString: string) {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.filterBySearchString(searchString);
    }, this.searchDebounceLength);
  }


  /**
   * Opens custom date dialog, then checks if date range is truly custom.
   * If so, activates custom range, if not, activates matching range
   */
  public openCustomDateDialog() {
    const dialogRef = this.dialog.open(CustomDatePickerDialogComponent, {
      data: {
        activeDateRange: DateRangeGenerator.cloneRange(this.activeDateRange)
      }
    });
    const subscription = dialogRef.afterClosed().subscribe((customRange: DateRange) => {
      this.activateDateRange(customRange);
      subscription.unsubscribe();
    });
  }

  /**
   * Activates a new date range, applies the current search string
   * and updates the tags. Currently triggers an event refresh
   * @param range The range to filter by.
   */
  public async activateDateRange(range: DateRange) {
    const recognized = this.isRecognizedDateRange(range);
    this.customDateRange = !recognized;
    this.activeDateRange = range;
    const filteredEvents = await this.eventFiltersService.filterEvents(
      range, this.searchString
    );
    this.updateTagsAfterFilter(filteredEvents, range);
  }

  /**
   * Filters by search string
   * and updates the tags. (UNUSED)
   * @param range The range to filter by.
   */
  public filterBySearchString(searchString: string) {
    this.searchString = searchString;
    const filteredEvents = this.eventFiltersService.filterEventsOnlyBySearchString(
      searchString
    );
    this.updateTagsAfterFilter(filteredEvents, this.activeDateRange);
  }


  private isRecognizedDateRange(range: DateRange): DateRange | null {
    const sameArr = this.dateRanges.filter(
      r => r.end.isSame(range.end, 'day') && r.start.isSame(range.start, 'day')
    );

    if (sameArr.length) {
      return sameArr[0];
    }

    return null;
  }

  /*
   * OTHER
   */

  private updateFilterTags(selectedTags: Map<string, boolean>) {
    this.eventFiltersService.selectedTags = this.getSelectedTagNames(
      selectedTags
    );
  }

  private updateTagQueryParam(selectedTags: Map<string, boolean>) {
    const selectedTagNames = this.getSelectedTagNames(selectedTags);
    if (selectedTagNames.length === 0) {
      return this.router.navigate(['.'], {
        queryParams: { tags: null },
        queryParamsHandling: 'merge'
      });
    }

    const tagString = selectedTagNames.reduce((prev, curr, index) => {
      let ret;
      if (index === 0) {
        ret = curr;
      } else {
        ret = prev += this.queryStringTagSeparator + curr;
      }
      return ret;
    }, '');
    return this.router.navigate(['.'], {
      queryParams: { tags: tagString },
      queryParamsHandling: 'merge'
    });
  }

  private updateDateRangeQueryParams(range: DateRange) {
    const startDateTimeString = range.start.format('YYYYMMDDThhmmss');
    const endDateTimeString = range.end.format('YYYYMMDDThhmmss');

    return this.router.navigate(['.'], {
      queryParams: { startDateTime: startDateTimeString, endDateTime: endDateTimeString },
      queryParamsHandling: 'merge'
    });
  }

  private getTagsFromQueryParams(): Promise<boolean> {
    return new Promise((resolve) => {
      this.route.queryParamMap.pipe(first()).subscribe(params => {
        const tagStr = <string>params.get('tags');
        if (!tagStr) {
          resolve(false);
          return;
        }
        const tags = tagStr.split(this.queryStringTagSeparator);
        const selectedTagInfos = this.tagInfos.filter(tagInfo =>
          tags.includes(tagInfo.tag)
        );
        const mapContructorArg = <ReadonlyArray<[string, boolean]>>(
          (<{}>selectedTagInfos.map(tagInfo => [tagInfo.tag, true]))
        );
        this.selectedTags = new Map(mapContructorArg);
        this.updateFilterTags(this.selectedTags);
        resolve(true);
      });
    });
  }

  private getDateRangeFromQueryParams(): Promise<DateRange> {
    return new Promise((resolve) => {
      this.route.queryParamMap.pipe(first()).subscribe(params => {
        const startDateTimeStr = <string>params.get('startDateTime');
        const endDateTimeStr = <string>params.get('endDateTime');
        if (!startDateTimeStr && !endDateTimeStr) {
          resolve(null);
          return;
        }
        const range = DateRangeGenerator.getDateRangeFromStrings(startDateTimeStr, endDateTimeStr);
        resolve(range);
      });
    });
  }
}
