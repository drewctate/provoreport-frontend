import { Injectable } from '@angular/core';

import { EventsService } from '../events/events.service';
import { DateRange, Event } from '../../types';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EventFiltersService {

  private _selectedTags: string[] = [];
  private _filteredByDateEvents: Event[];

  constructor(private eventsService: EventsService) {
  }

  public get filteredByDateEvents(): Event[] {
    return this._filteredByDateEvents;
  }

  public get selectedTags() {
    return this._selectedTags;
  }

  public set selectedTags(tags: string[]) {
    this._selectedTags = tags;
  }

  public async filterEventsByDate(range: DateRange) {
    const allEvents = await this.eventsService.getEvents();
    this._filteredByDateEvents = allEvents.filter(event => {
      return moment(event.startDate).isSameOrAfter(range.start, 'day')
        && moment(event.endDate).isSameOrBefore(range.end, 'day');
    });
    return this._filteredByDateEvents;
  }

}
