import { Injectable } from '@angular/core';
import { Event } from '../../types';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private _savedEvents: Map<string, Event> = new Map();

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

  public getEvents(): Promise<Event[]> {
    return new Promise<Event[]>((resolve, reject) => {
      this.http.get(`${environment.ROOT_URL}/events`, { params: { startDateTime: '20190114T190000', endDateTime: '20200114T190000' } })
        .subscribe((events: Event[]) => {
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
