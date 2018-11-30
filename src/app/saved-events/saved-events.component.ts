import { Component } from '@angular/core';
import { EventsService } from '../services';
import { Event } from '../types';

@Component({
  selector: 'app-saved-events',
  templateUrl: './saved-events.component.html',
  styleUrls: ['./saved-events.component.scss']
})
export class SavedEventsComponent {

  constructor(public eventsService: EventsService) { }

  get savedEvents() {
    return this.eventsService.savedEvents;
  }

  public unSaveEvent(event: Event) {
    this.eventsService.unSaveEvent(event);
  }
}
