import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { TagsService, EventFiltersService } from '../services';
import { DateRange, TagInfo } from '../types';
import { Router, ActivatedRoute } from '@angular/router';
import { DateRangeGenerator } from './date-range';
import { Moment } from 'moment';

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
  public dateRanges: DateRange[];

  public tagInfos: TagInfo[];
  public selectedTags: Map<string, boolean> = new Map();

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

  /*
   * DATES
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

  public async activateDateRange(range: DateRange) {
    this.activeDateRange = range;
    const filteredEvents = await this.eventFiltersService.filterEventsByDate(
      range
    );

    const newTagInfos = this.tagsService.countTagsOnEvents(filteredEvents);

    this.tagInfos = newTagInfos;

    this.updateDateRangeQueryParams(range);
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

  public startDateChanged(date: Moment) {
    this.customDateRange.start = date;
    this.customDateRange.end = this.activeDateRange.end;
    const recognized = this.isRecognizedDateRange(this.customDateRange);
    this.activeDateRange = recognized || this.customDateRange;
  }

  public endDateChanged(date: Moment) {
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
      this.router.navigate(['.'], { queryParams: { tags: null } });
      return;
    }

    const tagString = selectedTagNames.reduce((prev, curr, index) => {
      let ret;
      if (index === 0) {
        ret = curr;
      } else {
        ret = prev += ' ' + curr;
      }
      return ret;
    }, '');
    this.router.navigate(['.'], {
      queryParams: { tags: tagString },
      queryParamsHandling: 'merge'
    });
  }

  private updateDateRangeQueryParams(range: DateRange) {
    const startDateString = range.start.format('YYYYMMDDThhmmss');
    const endDateString = range.end.format('YYYYMMDDThhmmss');

    this.router.navigate(['.'], {
      queryParams: { startDate: startDateString, endDate: endDateString },
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
        const tags = tagStr.split(' ');
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
        const startDateStr = <string>params.get('startDate');
        const endDateStr = <string>params.get('endDate');
        if (!startDateStr && !endDateStr) {
          resolve(false);
          return;
        }
        const range = DateRangeGenerator.getDateRangeFromStrings(startDateStr, endDateStr);
        this.activateDateRange(range)
          .then(_ => resolve(true));
      });
    });
  }
}
