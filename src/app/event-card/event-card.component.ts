import { Component, Input } from '@angular/core';
import { AddToCalendarService } from '../services';
import { Event } from '../types';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {

  @Input() event;

  constructor(private addToCalendar: AddToCalendarService) {

  }

  public getGoogleCalendarUrl(event: Event) {
    return this.addToCalendar.getGoogleCalendarUrl(event);
  }

}
