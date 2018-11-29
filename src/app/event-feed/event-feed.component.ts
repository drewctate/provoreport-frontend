import { Component } from '@angular/core';
import { EventsService } from '../services';

@Component({
  selector: 'app-event-feed',
  templateUrl: './event-feed.component.html',
  styleUrls: ['./event-feed.component.scss']
})
export class EventFeedComponent {

  public events: any[];

  constructor(eventsService: EventsService) {
    eventsService.getEvents()
      .then(events => this.events = events);
  }

}
