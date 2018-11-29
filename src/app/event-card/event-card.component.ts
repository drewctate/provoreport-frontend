import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AddToCalendarService } from '../services';
import { Event } from '../types';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {

  @Input() event;
  @Output() saveEvent = new EventEmitter<Event>();

  constructor(private addToCalendar: AddToCalendarService) {

  }

  public save(event) {
    this.saveEvent.emit(event);
  }

  public getGoogleCalendarUrl(event: Event) {
    return this.addToCalendar.getGoogleCalendarUrl(event);
  }

}
