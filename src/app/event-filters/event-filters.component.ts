import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { TagsService, EventFiltersService } from '../services';
import { DateRange, TagInfo, Event } from '../types';
import { Router, ActivatedRoute } from '@angular/router';
import { DateRangeGenerator } from './date-range';
import { Moment } from 'moment';
import { environment } from '../../environments/environment';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-event-filters',
  templateUrl: './event-filters.component.html',
  styleUrls: ['./event-filters.component.scss']
})
export class EventFiltersComponent implements OnInit {
  @Output() tagsChanged = new EventEmitter<string[]>();

  public activeDateRange: DateRange = DateRangeGenerator.getThisWeek();
  private customDateRange = DateRangeGenerator.getToday();
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
    private eventFiltersService: EventFiltersService,
    private route: ActivatedRoute,
    private router: Router,
    private tagsService: TagsService
  ) {
  }

  async ngOnInit() {
    this.tagInfos = await this.tagsService.getAllTags();
    this.updateFilterTags(this.selectedTags);
    await this.getTagsFromQueryParams();
    const gotRangeFromQueryParams = await this.getDateRangeFromQueryParams();
    await this.initializeDateRanges(gotRangeFromQueryParams);
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

  private initializeDateRanges(gotRangeFromQueryParams: boolean) {
    const weekDateRange = DateRangeGenerator.getThisWeek();

    this.dateRanges = [
      DateRangeGenerator.getToday(),
      weekDateRange,
      DateRangeGenerator.getThisWeekend(),
      DateRangeGenerator.getNextWeek(),
      DateRangeGenerator.getNextWeekend()
    ];

    if (!gotRangeFromQueryParams) {
      return this.activateDateRange(weekDateRange);
    }
  }

  public debouncedSearch(searchString: string) {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.filterBySearchString(searchString);
    }, this.searchDebounceLength);
  }

  /**
   * Activates a new date range, applies the current search string
   * and updates the tags. Currently triggers an event refresh
   * @param range The range to filter by.
   */
  public async activateDateRange(range: DateRange) {
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

  /**
   * Signals a change in the start date. Meant to be used with custom date picker (UNUSED)
   */
  public startDateTimeChanged(date: Moment) {
    this.customDateRange.start = date;
    this.customDateRange.end = this.activeDateRange.end;
    const recognized = this.isRecognizedDateRange(this.customDateRange);
    this.activeDateRange = recognized || this.customDateRange;
  }

  /**
   * Signals a change in the start date. Meant to be used with custom date picker (UNUSED)
   */
  public endDateTimeChanged(date: Moment) {
    this.customDateRange.end = date;
    this.customDateRange.start = this.activeDateRange.start;
    const recognized = this.isRecognizedDateRange(this.customDateRange);
    this.activeDateRange = recognized || this.customDateRange;
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

  private getDateRangeFromQueryParams(): Promise<boolean> {
    return new Promise((resolve) => {
      this.route.queryParamMap.pipe(first()).subscribe(params => {
        const startDateTimeStr = <string>params.get('startDateTime');
        const endDateTimeStr = <string>params.get('endDateTime');
        if (!startDateTimeStr && !endDateTimeStr) {
          resolve(false);
          return;
        }
        const range = DateRangeGenerator.getDateRangeFromStrings(startDateTimeStr, endDateTimeStr);
        this.activateDateRange(range)
          .then(_ => resolve(true));
      });
    });
  }
}
