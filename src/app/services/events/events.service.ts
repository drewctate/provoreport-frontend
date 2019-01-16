import { Injectable } from '@angular/core';
import { Event } from '../../types';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private _savedEvents: Map<number, Event> = new Map();

  private _events: Event[] = [
    {
      id: 1,
      title: 'Fall 2018 Reason for Hope',
      url: 'https://calendar.byu.edu/event/fall-2018-reason-hope',
      time: '10:00 AM to 4:00 PM',
      startDate: '20181213T200000',
      endDate: '20181213T210000',
      location: 'Wilkinson Student Center',
      thumbnail: 'https://calendar.byu.edu/sites/default/files/styles/thumbnail/public/Other_600x600.jpg?itok=d4gtvndZ',
      tags: [
        'BYU',
        'Religious'
      ]
    },
    {
      id: 2,
      title: 'Utah Valley University - BYU Women\'s Basketball',
      url: 'https://calendar.byu.edu/event/utah-valley-university-byu-womens-basketball',
      time: '11:00 AM to 1:00 PM',
      startDate: '20181214T210000',
      endDate: '20181214T220000',
      location: '',
      thumbnail: 'https://calendar.byu.edu/sites/default/files/styles/thumbnail/public/Athletics_600x600.jpg?itok=-BMDPJOC',
      tags: [
        'BYU',
        'Sports',
        'Basketball'
      ]
    },
    {
      id: 3,
      title: 'Disciple Scholar Lecture Series with Dr. Julie Crockett',
      url: 'https://calendar.byu.edu/event/disciple-scholar-lecture-series-dr-julie-crockett',
      time: '5:30 PM to 7:00 PM',
      startDate: '20181215T220000',
      endDate: '20181215T230000',
      location: '321 MSRB',
      thumbnail: 'https://calendar.byu.edu/sites/default/files/styles/thumbnail/public/Crockett_Julie_web-compressor_new-1_0.jpg?itok=bCCDjUEW',
      tags: [
        'BYU',
        'Education',
        'Religious'
      ]
    },
    {
      id: 4,
      title: 'BYU Luau',
      url: 'https://calendar.byu.edu/event/byu-luau-1',
      time: '6:00 PM',
      startDate: '20181216T230000',
      endDate: '20181217T000000',
      location: 'BYU WSC Ballroom',
      thumbnail: 'https://calendar.byu.edu/sites/default/files/styles/thumbnail/public/LUAUblock6x6.jpg?itok=y79NdE6f',
      tags: [
        'BYU',
        'Multicultural',
        'Music',
        'Dance'
      ]
    },
    {
      id: 5,
      title: 'Free Live Animal Show - Classification',
      url: 'https://calendar.byu.edu/event/free-live-animal-show-classification-64',
      time: '7:30 PM to 8:15 PM',
      startDate: '20181218T000000',
      endDate: '20181218T010000',
      location: 'Bean Life Science Museum',
      thumbnail: 'https://calendar.byu.edu/sites/default/files/styles/thumbnail/public/Classification_CalendarIcon.jpg?itok=jcys0xOk',
      tags: [
        'BYU',
        'Nature',
        'Animals'
      ]
    },
    {
      id: 6,
      title: '100 Dollar Show',
      url: 'https://www.utahvalley.com/event/100-dollar-show/23958/',
      location: 'Venue: Springville Museum of Art',
      startDate: '20181219T010000',
      endDate: '20181219T020000',
      thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/6.Katrina-Berg-i-llbethere.katrinaberg_88a57cd5-5056-a36a-0bfbbd49c83712d0.jpg',
      tags: [
        'Arts',
        'Painting',
        'Shopping'
      ]
    },
    {
      id: 15,
      title: '2018 Holiday Beehive Bazaar Handmade Art and Craft Fair',
      url: 'https://www.utahvalley.com/event/2018-holiday-beehive-bazaar-handmade-art-and-craft-fair/23970/',
      location: 'The Bright Building',
      startDate: '20181220T020000',
      endDate: '20181220T030000',
      thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/web-postcard-01_f19e5ef6-5056-a36a-0b6625fdf3ec57b8.jpg',
      tags: [
        'Arts',
        'Shopping',
        'Local'
      ]
    },
    {
      id: 7,
      title: '33rd Annual Spiritual and Religious Art of Utah',
      url: 'https://www.utahvalley.com/event/33rd-annual-spiritual-and-religious-art-of-utah/23961/',
      location: 'Venue: Springville Museum of Art',
      startDate: '20181221T030000',
      endDate: '20181221T040000',
      thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/Springville-Museum-32-annual-246_849b8147-5056-a36a-0b0eeec26873f7fc.jpg',
      tags: [
        'Religious',
        'Arts',
        'Painting',
        'Sculpture'
      ]
    },
    {
      id: 8,
      title: 'A Christmas Carol',
      url: 'https://www.utahvalley.com/event/a-christmas-carol/24991/',
      location: 'Venue: Hale Center Theater Orem',
      startDate: '20181222T040000',
      endDate: '20181222T050000',
      thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/Christmas-Carol-2018_6a01b863-5056-a36a-0bd2e6381975a39c.jpg',
      tags: [
        'Christmas',
        'Theater'
      ]
    },
    {
      id: 9,
      title: 'Country Swing/Dance',
      url: 'https://www.utahvalley.com/event/country-swing-dance/23687/',
      location: '',
      startDate: '20181223T050000',
      endDate: '20181223T060000',
      thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/LocoSwingDance2460_b7d0b7ec-5056-a36a-0b4dac9b51a182a2.jpg',
      tags: [
        'Dance',
        'Arts'
      ]
    },
    {
      id: 10,
      title: 'Faculty Art Show',
      url: 'https://www.utahvalley.com/event/faculty-art-show/23770/',
      location: 'Venue: Woodbury Art Museum (Utah Valley University)',
      startDate: '20181224T060000',
      endDate: '20181224T070000',
      thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/faculty_show_web0_20ed4af8-5056-a36a-0b3822920500d7a5.jpg',
      tags: [
        'Arts',
        'Painting',
        'Sculpture'
      ]
    },
    {
      id: 11,
      title: 'Holiday Concert with the UVU Symphony',
      url: 'https://www.utahvalley.com/event/holiday-concert-with-the-uvu-symphony/23895/',
      location: 'Venue: Utah Valley University Performing Arts',
      startDate: '20181225T070000',
      endDate: '20181225T080000',
      thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/HolidayConcert2018_400px0_f64b61a2-5056-a36a-0b9d0de1273e9a0c.jpg',
      tags: [
        'Arts',
        'Music',
        'UVU'
      ]
    },
    {
      id: 12,
      title: 'Holy Cow Boutique Christmas Show',
      url: 'https://www.utahvalley.com/event/holy-cow-boutique-christmas-show/23679/',
      location: 'Summit Center',
      startDate: '20181226T080000',
      endDate: '20181226T090000',
      thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/Shopping-at-the-Bazaar3_1e82a22f-5056-a36a-0b8b628ceeb7a3ed.jpg',
      tags: [
        'Christmas'
      ]
    },
    {
      id: 14,
      title: 'Lite Brite Nite',
      url: 'https://www.utahvalley.com/event/lite-brite-nite/23931/',
      location: 'Venue: University Place',
      startDate: '20181227T090000',
      endDate: '20181227T100000',
      thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/orchard-lighting-inspo-40_f9370b54-5056-a36a-0baa4fe963d97050.jpg',
      tags: [

      ]
    }
  ];

  constructor() { }

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
    const formatString = 'YYYYMMDDTHHmmss';
    const currentDate = moment().startOf('day');

    return Promise.resolve(
      this._events.map(event => {
        const seven = currentDate.clone().add(19, 'h');
        const eight = currentDate.clone().add(20, 'h');
        event.startDate = seven.format(formatString);
        event.endDate = eight.format(formatString);
        currentDate.add(1, 'day');
        return event;
      })
    );
  }
}
