import { Component, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { TagsService, EventFiltersService } from '../services';
import { TagInfo } from '../types';

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
    private tagsService: TagsService
  ) { }

  async ngOnInit() {
    this.tagInfos = await this.tagsService.getAllTags();
    this.updateFilterService(this.selectedTags);
  }

  private updateFilterService(selectedTags: Map<TagInfo, boolean>) {
    const selectedTagNames =
      Array.from(selectedTags.entries())
        .filter(([_, selected]) => selected)
        .map(([info, _]) => info.tag);

    this.eventFiltersService.selectedTags = selectedTagNames;
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
  }

}
