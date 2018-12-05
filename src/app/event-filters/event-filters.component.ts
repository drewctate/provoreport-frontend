import { Component, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { TagsService, EventFiltersService } from '../services';
import { TagInfo } from '../types';
import { Router, ActivatedRoute } from '@angular/router';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-event-filters',
  templateUrl: './event-filters.component.html',
  styleUrls: ['./event-filters.component.scss']
})
export class EventFiltersComponent implements OnInit {

  @Output() tagsChanged = new EventEmitter<string[]>();

  public tagInfos: TagInfo[];
  public selectedTags: Map<TagInfo, boolean> = new Map();

  constructor(
    private cdRef: ChangeDetectorRef,
    private eventFiltersService: EventFiltersService,
    private route: ActivatedRoute,
    private router: Router,
    private tagsService: TagsService
  ) { }

  async ngOnInit() {
    this.tagInfos = await this.tagsService.getAllTags();
    this.updateFilterService(this.selectedTags);
    // this.selectedTags = this.getTagsFromQueryParams();
    this.getTagsFromQueryParams();
  }

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

  private getSelectedTagNames(selectedTags: Map<TagInfo, boolean>) {
    return Array.from(selectedTags.entries())
      .filter(([_, selected]) => selected)
      .map(([info, _]) => info.tag);
  }

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
