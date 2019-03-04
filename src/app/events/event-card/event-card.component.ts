import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AddToCalendarService } from '../services';
import { AnalyticsService } from '../../services';
import { Event } from '../../types';

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
  @Input() noMargin: boolean;
  @Input() xIfSaved: boolean;
  @Output() saveEvent = new EventEmitter<Event>();
  @Output() unSaveEvent = new EventEmitter<Event>();

  constructor(private addToCalendar: AddToCalendarService, private analytics: AnalyticsService) {

  }

  public isTagSelected(tag: string) {
    return this.selectedTags && this.selectedTags.includes(tag);
  }

  public save(event: Event) {
    this.analytics.recordEventLike(event);
    this.saveEvent.emit(event);
  }

  public unSave(event: Event) {
    this.analytics.recordEventUnlike(event);
    this.unSaveEvent.emit(event);
  }

  public recordView(event: Event) {
    this.analytics.recordEventLinkClicked(event);
  }

  public getGoogleCalendarUrl(event: Event) {
    return this.addToCalendar.getGoogleCalendarUrl(event);
  }

  public getYahooCalendarUrl(event: Event) {
    return this.addToCalendar.getYahooCalendarUrl(event);
  }

  public getMicrosoftCalendarUrl(event: Event) {
    return this.addToCalendar.getMicrosoftCalendarUrl(event);
  }

  public downloadIcs(event: Event) {
    this.addToCalendar.downloadIcs(event);
  }

}
