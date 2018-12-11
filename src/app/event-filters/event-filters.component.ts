import { Component, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
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

  public activeDateRange: DateRange;
  private customDateRange = DateRangeGenerator.getToday();
  public dateRanges: DateRange[];

  public tagInfos: TagInfo[];
  public selectedTags: Map<TagInfo, boolean> = new Map();

  constructor(
    private cdRef: ChangeDetectorRef,
    private eventFiltersService: EventFiltersService,
    private route: ActivatedRoute,
    private router: Router,
    private tagsService: TagsService
  ) {
    this.initializeDateRanges();
  }

  async ngOnInit() {
    this.tagInfos = await this.tagsService.getAllTags();
    this.updateFilterService(this.selectedTags);
    this.getTagsFromQueryParams();
  }

  /*
   * TAGS
   */

  public isTagSelected(tagInfo: TagInfo) {
    return this.selectedTags.has(tagInfo) && this.selectedTags.get(tagInfo);
  }

  public toggleSelected(tagInfo: TagInfo) {
    if (this.isTagSelected(tagInfo)) {
      this.selectedTags.set(tagInfo, false);
    } else {
      this.selectedTags.set(tagInfo, true);
    }
    this.cdRef.detectChanges();

    this.updateFilterService(this.selectedTags);
    this.updateQueryParams(this.selectedTags);
  }

  private getSelectedTagNames(selectedTags: Map<TagInfo, boolean>): string[] {
    return Array.from(selectedTags.entries())
      .filter(([_, selected]) => selected)
      .map(([info, _]) => info.tag);
  }

  /*
  * DATES
  */

  private initializeDateRanges() {
    this.activeDateRange = DateRangeGenerator.getThisWeek();
    this.dateRanges = [
      DateRangeGenerator.getToday(),
      this.activeDateRange,
      DateRangeGenerator.getThisWeekend(),
      DateRangeGenerator.getNextWeek(),
      DateRangeGenerator.getNextWeekend(),
    ];
  }

  public activateDateRange(range: DateRange) {
    this.activeDateRange = range;
  }

  private isRecognizedDateRange(range: DateRange): DateRange | null {
    const sameArr = this.dateRanges
      .filter(r => r.end.isSame(range.end, 'day')
        && r.start.isSame(range.start, 'day'));

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

  private updateFilterService(selectedTags: Map<TagInfo, boolean>) {
    this.eventFiltersService.selectedTags = this.getSelectedTagNames(selectedTags);
  }

  private updateQueryParams(selectedTags: Map<TagInfo, boolean>) {
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
    this.router.navigate(['.'], { queryParams: { tags: tagString } });
  }

  private getTagsFromQueryParams() {
    this.route.queryParamMap.pipe(first()).subscribe(params => {
      const tagStr = <string>params.get('tags');
      if (!tagStr) {
        return;
      }
      const tags = tagStr.split(' ');
      const selectedTagInfos = this.tagInfos.filter(tagInfo => tags.includes(tagInfo.tag));
      const mapContructorArg = <ReadonlyArray<[TagInfo, boolean]>><{}>selectedTagInfos.map(tagInfo => [tagInfo, true]);
      this.selectedTags = new Map(mapContructorArg);
      this.updateFilterService(this.selectedTags);
    });
  }

}
