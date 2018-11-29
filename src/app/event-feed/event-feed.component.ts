import { Component } from '@angular/core';
import { EventsService } from '../services';
import { Event } from '../types';

@Component({
  selector: 'app-event-feed',
  templateUrl: './event-feed.component.html',
  styleUrls: ['./event-feed.component.scss']
})
export class EventFeedComponent {

  public events: Event[];

  constructor(private eventsService: EventsService) {
    eventsService.getEvents()
      .then(events => this.events = events);
  }

  public saveEvent(event: Event) {
    this.eventsService.saveEvent(event);
  }

}
