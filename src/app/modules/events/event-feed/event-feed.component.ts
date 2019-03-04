import { Component } from '@angular/core';
import { EventsService, EventFiltersService } from '../services';
import { Event } from '../../../types';

@Component({
  selector: 'app-event-feed',
  templateUrl: './event-feed.component.html',
  styleUrls: ['./event-feed.component.scss']
})
export class EventFeedComponent {

  constructor(
    private eventsService: EventsService,
    public eventFiltersService: EventFiltersService
  ) { }

  get selectedTags(): string[] {
    return this.eventFiltersService.selectedTags;
  }

  public saveEvent(event: Event) {
    this.eventsService.saveEvent(event);
  }

  public unSaveEvent(event: Event) {
    this.eventsService.unSaveEvent(event);
  }

  public isEventSaved(event: Event) {
    return this.eventsService.isSavedEvent(event);
  }

}
