import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }

  getEvents() {
    return Promise.resolve(
      [
        {
          title: 'Fall 2018 Reason for Hope',
          url: 'https://calendar.byu.edu/event/fall-2018-reason-hope',
          time: '10:00 AM to 4:00 PM',
          location: 'Wilkinson Student Center',
          thumbnail: 'https://calendar.byu.edu/sites/default/files/styles/thumbnail/public/Other_600x600.jpg?itok=d4gtvndZ'
        },
        {
          title: 'Utah Valley University - BYU Women\'s Basketball',
          url: 'https://calendar.byu.edu/event/utah-valley-university-byu-womens-basketball',
          time: '11:00 AM to 1:00 PM',
          location: '',
          thumbnail: 'https://calendar.byu.edu/sites/default/files/styles/thumbnail/public/Athletics_600x600.jpg?itok=-BMDPJOC'
        },
        {
          title: 'Disciple Scholar Lecture Series with Dr. Julie Crockett',
          url: 'https://calendar.byu.edu/event/disciple-scholar-lecture-series-dr-julie-crockett',
          time: '5:30 PM to 7:00 PM',
          location: '321 MSRB',
          thumbnail: 'https://calendar.byu.edu/sites/default/files/styles/thumbnail/public/Crockett_Julie_web-compressor_new-1_0.jpg?itok=bCCDjUEW'
        },
        {
          title: 'BYU Luau',
          url: 'https://calendar.byu.edu/event/byu-luau-1',
          time: '6:00 PM',
          location: 'BYU WSC Ballroom',
          thumbnail: 'https://calendar.byu.edu/sites/default/files/styles/thumbnail/public/LUAUblock6x6.jpg?itok=y79NdE6f'
        },
        {
          title: 'Free Live Animal Show - Classification',
          url: 'https://calendar.byu.edu/event/free-live-animal-show-classification-64',
          time: '7:30 PM to 8:15 PM',
          location: 'Bean Life Science Museum',
          thumbnail: 'https://calendar.byu.edu/sites/default/files/styles/thumbnail/public/Classification_CalendarIcon.jpg?itok=jcys0xOk'
        },
        {
          title: '100 Dollar Show',
          url: 'https://www.utahvalley.com/event/100-dollar-show/23958/',
          location: 'Venue: Springville Museum of Art',
          thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/6.Katrina-Berg-i-llbethere.katrinaberg_88a57cd5-5056-a36a-0bfbbd49c83712d0.jpg'
        },
        {
          title: '2018 Holiday Beehive Bazaar Handmade Art and Craft Fair',
          url: 'https://www.utahvalley.com/event/2018-holiday-beehive-bazaar-handmade-art-and-craft-fair/23970/',
          location: 'The Bright Building',
          thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/web-postcard-01_f19e5ef6-5056-a36a-0b6625fdf3ec57b8.jpg'
        },
        {
          title: '33rd Annual Spiritual and Religious Art of Utah',
          url: 'https://www.utahvalley.com/event/33rd-annual-spiritual-and-religious-art-of-utah/23961/',
          location: 'Venue: Springville Museum of Art',
          thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/Springville-Museum-32-annual-246_849b8147-5056-a36a-0b0eeec26873f7fc.jpg'
        },
        {
          title: 'A Christmas Carol',
          url: 'https://www.utahvalley.com/event/a-christmas-carol/24991/',
          location: 'Venue: Hale Center Theater Orem',
          thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/Christmas-Carol-2018_6a01b863-5056-a36a-0bd2e6381975a39c.jpg'
        },
        {
          title: 'Country Swing/Dance',
          url: 'https://www.utahvalley.com/event/country-swing-dance/23687/',
          location: '',
          thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/LocoSwingDance2460_b7d0b7ec-5056-a36a-0b4dac9b51a182a2.jpg'
        },
        {
          title: 'Faculty Art Show',
          url: 'https://www.utahvalley.com/event/faculty-art-show/23770/',
          location: 'Venue: Woodbury Art Museum (Utah Valley University)',
          thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/faculty_show_web0_20ed4af8-5056-a36a-0b3822920500d7a5.jpg'
        },
        {
          title: 'Holiday Concert with the UVU Symphony',
          url: 'https://www.utahvalley.com/event/holiday-concert-with-the-uvu-symphony/23895/',
          location: 'Venue: Utah Valley University Performing Arts',
          thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/HolidayConcert2018_400px0_f64b61a2-5056-a36a-0b9d0de1273e9a0c.jpg'
        },
        {
          title: 'Holy Cow Boutique Christmas Show',
          url: 'https://www.utahvalley.com/event/holy-cow-boutique-christmas-show/23679/',
          location: 'Summit Center',
          thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/Shopping-at-the-Bazaar3_1e82a22f-5056-a36a-0b8b628ceeb7a3ed.jpg'
        },
        {
          title: 'Holy Cow Christmas Boutique',
          url: 'https://www.utahvalley.com/event/holy-cow-christmas-boutique/23954/',
          location: 'Summit Center',
          thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/Christmas-Tree4_f90b93a5-5056-a36a-0b4a091da916a633.jpg'
        },
        {
          title: 'Lite Brite Nite',
          url: 'https://www.utahvalley.com/event/lite-brite-nite/23931/',
          location: 'Venue: University Place',
          thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/orchard-lighting-inspo-40_f9370b54-5056-a36a-0baa4fe963d97050.jpg'
        }
      ]
    );
  }
}
