import { Injectable } from '@angular/core';
import { EventsService } from '../events/events.service';
import { Event, TagInfo } from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private eventsService: EventsService) { }

  public getAllTags(): Promise<TagInfo[]> {
    return this.eventsService.getEvents().then(events => {
      return this.countTagsOnEvents(events);
    });
  }

  public countTagsOnEvents(events: Event[]): TagInfo[] {
    if (!events) {
      return;
    }
    const tagCountsMap = new Map<string, number>();
    for (const event of events) {
      event.tags.forEach(tag => {
        if (tagCountsMap.has(tag)) {
          tagCountsMap.set(tag, tagCountsMap.get(tag) + 1);
        } else {
          tagCountsMap.set(tag, 1);
        }
      });
    }
    return Array.from(tagCountsMap.entries()).map(([tag, count]) => {
      return { tag: tag, count: count };
    });
  }
}
