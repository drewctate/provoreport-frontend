import { Component } from '@angular/core';
import { TagsService } from '../services';
import { TagInfo } from '../types';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-event-filters',
  templateUrl: './event-filters.component.html',
  styleUrls: ['./event-filters.component.scss']
})
export class EventFiltersComponent {

  public tagInfos: TagInfo[];
  public selectedTags: Map<TagInfo, boolean> = new Map();

  get selectedTagsArr(): string[] {
    return Array.from(this.selectedTags.keys()).map(info => info.tag);
  }

  constructor(
    private cdRef: ChangeDetectorRef,
    private tagsService: TagsService
  ) {
    this.init();
  }

  private async init() {
    this.tagInfos = await this.tagsService.getAllTags();
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
  }

}
