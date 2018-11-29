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

  constructor(eventsService: EventsService) {
    eventsService.getEvents()
      .then(events => this.events = events);
  }

}
