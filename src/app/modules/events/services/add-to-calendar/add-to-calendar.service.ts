import { Injectable } from '@angular/core';
import { Event } from '../../../../types';
import { CalendarUtils } from './utils';

import saveAs from 'file-saver';

@Injectable({
    providedIn: 'root'
})
export class AddToCalendarService {

    constructor() { }

    /**
     * Google URL Generation Doc
     * anchor address:
      http://www.google.com/calendar/event?
      This is the base of the address before the parameters below.

      action:
          action=TEMPLATE
          A default required parameter.

      src:
          Example: src=default%40gmail.com
          Format: src=text
          This is not covered by Google help but is an optional parameter
          in order to add an event to a shared calendar rather than a user's default.

      text:
          Example: text=Garden%20Waste%20Collection
          Format: text=text
          This is a required parameter giving the event title.

      dates:
          Example: dates=20090621T063000Z/20090621T080000Z
                (i.e. an event on 21 June 2009 from 7.30am to 9.0am
                  British Summer Time (=GMT+1)).
          Format: dates=YYYYMMDDToHHMMSSZ/YYYYMMDDToHHMMSSZ
                This required parameter gives the start and end dates and times
                (in Greenwich Mean Time) for the event.

      location:
          Example: location=Home
          Format: location=text
          The obvious location field.

      trp:
          Example: trp=false
          Format: trp=true/false
          Show event as busy (true) or available (false)

      sprop:
          Example: sprop=http%3A%2F%2Fwww.me.org
          Example: sprop=name:Home%20Page
          Format: sprop=website and/or sprop=name:website_name

      add:
          Example: add=default%40gmail.com
          Format:  add=guest email addresses
     * @param event Event to generate link from
     */
    public getGoogleCalendarUrl(event: Event) {
        let googleCalendarUrl = 'https://www.google.com/calendar/render?action=TEMPLATE'
        googleCalendarUrl += `&text=${event.title}`;
        googleCalendarUrl += `&dates=${event.startDateTime}/${event.endDateTime}`;
        googleCalendarUrl += `&details=${event.url}`;
        if (event.location) {
            googleCalendarUrl += `&location=${event.location}`;
        }

        return googleCalendarUrl;
    }

    public getYahooCalendarUrl(event: Event) {
        let yahooCalendarUrl = 'http://calendar.yahoo.com/?v=60&view=d&type=20';
        const duration = CalendarUtils.getHoursDuration(event.startDateTime, event.endDateTime);

        yahooCalendarUrl += '&TITLE=' + event.title;
        yahooCalendarUrl += '&ST=' + event.startDateTime + '&DUR=' + duration;
        yahooCalendarUrl += '&DESC=' + event.url;
        yahooCalendarUrl += '&in_loc=' + event.location;

        return yahooCalendarUrl;
    }

    public getMicrosoftCalendarUrl(event: Event) {
        let microsoftCalendarUrl = 'http://calendar.live.com/calendar/calendar.aspx?rru=addevent';
        microsoftCalendarUrl += '&summary=' + event.title;
        microsoftCalendarUrl += '&dtstart=' + event.startDateTime + '&dtend=' + event.endDateTime;
        microsoftCalendarUrl += '&description=' + event.url;
        microsoftCalendarUrl += '&location=' + event.location;

        return microsoftCalendarUrl;
    }


    public downloadIcs(event: Event) {
        const fileName = CalendarUtils.getIcsFileName(event.title),
            icsData = this.getIcsCalendar(event),
            icsBlob = CalendarUtils.getIcsBlob(icsData);

        saveAs(icsBlob, fileName);
    }

    private getIcsCalendar(event: Event) {
        return [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            'CLASS:PUBLIC',
            'DESCRIPTION:' + CalendarUtils.formatIcsText(event.url, 62),
            'DTSTART:' + event.startDateTime,
            'DTEND:' + event.endDateTime,
            'LOCATION:' + CalendarUtils.formatIcsText(event.location, 64),
            'SUMMARY:' + CalendarUtils.formatIcsText(event.title, 66),
            'TRANSP:TRANSPARENT',
            'END:VEVENT',
            'END:VCALENDAR',
            'UID:' + CalendarUtils.getUid(),
            'DTSTAMP:' + CalendarUtils.getTimeCreated(),
            'PRODID:angular-addtocalendar'
        ].join('\n');
    }
}
