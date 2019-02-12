import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as Fuse from 'fuse.js';

import { EventsService } from '../events/events.service';
import { DateRange, Event } from '../../types';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EventFiltersService {

  private _selectedTags: string[] = [];
  private _filteredByDateEvents: Event[];
  private _filteredEvents: Event[];

  constructor(private eventsService: EventsService) {
  }

  public get filteredEvents(): Event[] {
    return this._filteredEvents;
  }

  public get selectedTags() {
    return this._selectedTags;
  }

  public set selectedTags(tags: string[]) {
    this._selectedTags = tags;
  }

  public filterEventsOnlyBySearchString(searchString?: string) {
    if (searchString) {
      const fuse = new Fuse(this._filteredByDateEvents, environment.fuseOptions);
      this._filteredEvents = fuse.search(searchString);
    } else {
      this._filteredEvents = this._filteredByDateEvents;
    }
    return this._filteredEvents;
  }

  public async filterEvents(range: DateRange, searchString?: string) {
    const allEvents = await this.eventsService.getEvents();
    this._filteredByDateEvents = allEvents.filter(event => {
      return moment(event.startDateTime).isSameOrAfter(range.start, 'day')
        && moment(event.endDateTime).isSameOrBefore(range.end, 'day');
    });

    if (searchString) {
      this._filteredEvents = this.filterEventsOnlyBySearchString(searchString);
    } else {
      this._filteredEvents = this._filteredByDateEvents;
    }

    return this._filteredEvents;
  }

}
