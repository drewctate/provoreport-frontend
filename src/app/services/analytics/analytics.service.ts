import { Injectable } from '@angular/core';
import { Event } from 'src/app/types';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }

  /**
   * When a user clicks the item link
   * @param event The Event
   */
  public recordEventLinkClicked(event: Event) {
    (<any>window).gtag('event', 'view_item', {
      items: [event]
    });
  }

  public recordEventLike(event: Event) {
    (<any>window).gtag('event', 'like_event', {
      'value': event.id
    });
  }

  public recordEventUnlike(event: Event) {
    (<any>window).gtag('event', 'unlike_event', {
      'value': event.id
    });
  }

  public recordCustomEvent(eventAction: string, value: any = null, category: string = 'engagement', label: string = '(not set)') {
    (<any>window).gtag('event', eventAction, {
      'event_category': category,
      'event_label': label,
      'value': value
    });
  }
}
