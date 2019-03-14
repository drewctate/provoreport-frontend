import { Injectable } from '@angular/core';
import { Event } from '../../../../types';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private _savedEvents: Map<string, Event> = new Map();
  private _events: Event[];

  constructor(private http: HttpClient) { }

  get savedEvents() {
    return Array.from(this._savedEvents.values());
  }

  public saveEvent(event: Event) {
    if (!this.isSavedEvent(event)) {
      this._savedEvents.set(event.id, event);
    }
  }

  public unSaveEvent(event: Event) {
    this._savedEvents.delete(event.id);
  }

  public isSavedEvent(event: Event) {
    return this._savedEvents.has(event.id);
  }

  public getEvents(bypassCache: boolean = false): Promise<Event[]> {
    if (this._events && !bypassCache) {
      return Promise.resolve(this._events);
    }

    return new Promise<Event[]>((resolve) => {
      this.http.get(`${environment.ROOT_URL}/events`,
        { params: { startDateTime: moment().toISOString(), endDateTime: moment().add(2, 'week').toISOString() } })
        .subscribe((events: Event[]) => {
          this._events = events;
          resolve(events);
        });
    });
  }

  public shareEvents(events: Event[], senderName: string, recipients: string[]): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const req = {
        events: events,
        senderName: senderName,
        recipients: recipients
      };
      this.http.post(`${environment.ROOT_URL}/share`, req)
        .subscribe(_ => {
          resolve(true);
        });
    });
  }
}
