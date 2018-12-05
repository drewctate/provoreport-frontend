import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AddToCalendarService } from '../services';
import { Event } from '../types';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {

  @Input() event: Event;
  @Input() saved: boolean;
  @Input() selectedTags: string[];
  @Input() hideTags: boolean;
  @Output() saveEvent = new EventEmitter<Event>();
  @Output() unSaveEvent = new EventEmitter<Event>();

  constructor(private addToCalendar: AddToCalendarService) {

  }

  public isTagSelected(tag: string) {
    return this.selectedTags && this.selectedTags.includes(tag);
  }

  public save(event: Event) {
    this.saveEvent.emit(event);
  }

  public unSave(event: Event) {
    this.unSaveEvent.emit(event);
  }

  public getGoogleCalendarUrl(event: Event) {
    return this.addToCalendar.getGoogleCalendarUrl(event);
  }

  public getYahooCalendarUrl(event: Event) {
    return this.addToCalendar.getYahooCalendarUrl(event);
  }

}
