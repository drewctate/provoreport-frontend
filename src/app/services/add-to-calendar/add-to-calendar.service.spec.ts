import { TestBed } from '@angular/core/testing';

import { AddToCalendarService } from './add-to-calendar.service';

describe('AddToCalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddToCalendarService = TestBed.get(AddToCalendarService);
    expect(service).toBeTruthy();
  });

  it('should generate a correct Google Calendar link', () => {
    const service: AddToCalendarService = TestBed.get(AddToCalendarService);
    const calendarURL = service.getGoogleCalendarUrl({
      title: 'Fall 2018 Reason for Hope',
      url: 'https://calendar.byu.edu/event/fall-2018-reason-hope',
      ticketsUrl: 'none',
      description: 'none',
      location: 'Wilkinson Student Center',
      startDateTime: '20190114T190000',
      endDateTime: '20190114T190000',
      thumbnail: 'https://calendar.byu.edu/sites/default/files/styles/thumbnail/public/Other_600x600.jpg?itok=d4gtvndZ',
      id: '',
      past: '',
      tags: []
    });

    expect(calendarURL).toEqual('https://www.google.com/calendar/render?action=TEMPLATE&text=Fall 2018 Reason for Hope&dates=20190114T190000/20190114T190000&details=https://calendar.byu.edu/event/fall-2018-reason-hope&location=Wilkinson Student Center');
  });


});
