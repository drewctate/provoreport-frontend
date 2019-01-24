import { EventTagsFilterPipe } from './event-tags-filter.pipe';

const events = [
  {
    id: 'none',
    title: 'Fall 2018 Reason for Hope',
    url: 'https://calendar.byu.edu/event/fall-2018-reason-hope',
    time: '10:00 AM to 4:00 PM',
    location: 'Wilkinson Student Center',
    description: 'none',
    ticketsUrl: 'none',
    startDateTime: 'none',
    endDateTime: 'none',
    past: 'false',
    thumbnail: 'https://calendar.byu.edu/sites/default/files/styles/thumbnail/public/Other_600x600.jpg?itok=d4gtvndZ',
    tags: ['BYU', 'Religious']
  },
  {
    id: 'none',
    title: 'Utah Valley University - BYU Women\'s Basketball',
    url: 'https://calendar.byu.edu/event/utah-valley-university-byu-womens-basketball',
    time: '11:00 AM to 1:00 PM',
    location: 'none',
    description: 'none',
    ticketsUrl: 'none',
    startDateTime: 'none',
    endDateTime: 'none',
    past: 'false',
    thumbnail: 'https://calendar.byu.edu/sites/default/files/styles/thumbnail/public/Athletics_600x600.jpg?itok=-BMDPJOC',
    tags: ['BYU', 'Sports', 'Basketball']
  },
  {
    id: 'none',
    title: 'Disciple Scholar Lecture Series with Dr. Julie Crockett',
    url: 'https://calendar.byu.edu/event/disciple-scholar-lecture-series-dr-julie-crockett',
    time: '5:30 PM to 7:00 PM',
    location: '321 MSRB',
    description: 'none',
    ticketsUrl: 'none',
    startDateTime: 'none',
    endDateTime: 'none',
    past: 'false',
    thumbnail: 'https://calendar.byu.edu/sites/default/files/styles/thumbnail/public/Crockett_Julie_web-compressor_new-1_0.jpg?itok=bCCDjUEW',
    tags: ['BYU', 'Education', 'Religious']
  },
  {
    id: 'none',
    title: 'BYU Luau',
    url: 'https://calendar.byu.edu/event/byu-luau-1',
    time: '6:00 PM',
    location: 'BYU WSC Ballroom',
    description: 'none',
    ticketsUrl: 'none',
    startDateTime: 'none',
    endDateTime: 'none',
    past: 'false',
    thumbnail: 'https://calendar.byu.edu/sites/default/files/styles/thumbnail/public/LUAUblock6x6.jpg?itok=y79NdE6f',
    tags: ['BYU', 'Multicultural', 'Music', 'Dance']
  },
  {
    id: 'none',
    title: 'Free Live Animal Show - Classification',
    url: 'https://calendar.byu.edu/event/free-live-animal-show-classification-64',
    time: '7:30 PM to 8:15 PM',
    location: 'Bean Life Science Museum',
    description: 'none',
    ticketsUrl: 'none',
    startDateTime: 'none',
    endDateTime: 'none',
    past: 'false',
    thumbnail: 'https://calendar.byu.edu/sites/default/files/styles/thumbnail/public/Classification_CalendarIcon.jpg?itok=jcys0xOk',
    tags: ['BYU', 'Nature', 'Animals']
  },
  {
    id: 'none',
    title: '100 Dollar Show',
    url: 'https://www.utahvalley.com/event/100-dollar-show/23958/',
    location: 'Venue: Springville Museum of Art',
    description: 'none',
    ticketsUrl: 'none',
    startDateTime: 'none',
    endDateTime: 'none',
    past: 'false',
    thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/6.Katrina-Berg-i-llbethere.katrinaberg_88a57cd5-5056-a36a-0bfbbd49c83712d0.jpg',
    tags: ['Arts', 'Painting', 'Shopping']
  },
  {
    id: 'none',
    title: '2018 Holiday Beehive Bazaar Handmade Art and Craft Fair',
    url: 'https://www.utahvalley.com/event/2018-holiday-beehive-bazaar-handmade-art-and-craft-fair/23970/',
    location: 'The Bright Building',
    description: 'none',
    ticketsUrl: 'none',
    startDateTime: 'none',
    endDateTime: 'none',
    past: 'false',
    thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/web-postcard-01_f19e5ef6-5056-a36a-0b6625fdf3ec57b8.jpg',
    tags: ['Arts', 'Shopping', 'Local']
  },
  {
    id: 'none',
    title: '33rd Annual Spiritual and Religious Art of Utah',
    url: 'https://www.utahvalley.com/event/33rd-annual-spiritual-and-religious-art-of-utah/23961/',
    location: 'Venue: Springville Museum of Art',
    description: 'none',
    ticketsUrl: 'none',
    startDateTime: 'none',
    endDateTime: 'none',
    past: 'false',
    thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/Springville-Museum-32-annual-246_849b8147-5056-a36a-0b0eeec26873f7fc.jpg',
    tags: ['Religious', 'Arts', 'Painting', 'Sculpture']
  },
  {
    id: 'none',
    title: 'A Christmas Carol',
    url: 'https://www.utahvalley.com/event/a-christmas-carol/24991/',
    location: 'Venue: Hale Center Theater Orem',
    description: 'none',
    ticketsUrl: 'none',
    startDateTime: 'none',
    endDateTime: 'none',
    past: 'false',
    thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/Christmas-Carol-2018_6a01b863-5056-a36a-0bd2e6381975a39c.jpg',
    tags: ['Christmas', 'Theater']
  },
  {
    id: 'none',
    title: 'Country Swing/Dance',
    url: 'https://www.utahvalley.com/event/country-swing-dance/23687/',
    location: 'none',
    description: 'none',
    ticketsUrl: 'none',
    startDateTime: 'none',
    endDateTime: 'none',
    past: 'false',
    thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/LocoSwingDance2460_b7d0b7ec-5056-a36a-0b4dac9b51a182a2.jpg',
    tags: ['Dance', 'Arts']
  },
  {
    id: 'none',
    title: 'Faculty Art Show',
    url: 'https://www.utahvalley.com/event/faculty-art-show/23770/',
    location: 'Venue: Woodbury Art Museum (Utah Valley University)',
    description: 'none',
    ticketsUrl: 'none',
    startDateTime: 'none',
    endDateTime: 'none',
    past: 'false',
    thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/faculty_show_web0_20ed4af8-5056-a36a-0b3822920500d7a5.jpg',
    tags: ['Arts', 'Painting', 'Sculpture']
  },
  {
    id: 'none',
    title: 'Holiday Concert with the UVU Symphony',
    url: 'https://www.utahvalley.com/event/holiday-concert-with-the-uvu-symphony/23895/',
    location: 'Venue: Utah Valley University Performing Arts',
    description: 'none',
    ticketsUrl: 'none',
    startDateTime: 'none',
    endDateTime: 'none',
    past: 'false',
    thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/HolidayConcert2018_400px0_f64b61a2-5056-a36a-0b9d0de1273e9a0c.jpg',
    tags: ['Arts', 'Music', 'UVU']
  },
  {
    id: 'none',
    title: 'Holy Cow Boutique Christmas Show',
    url: 'https://www.utahvalley.com/event/holy-cow-boutique-christmas-show/23679/',
    location: 'Summit Center',
    description: 'none',
    ticketsUrl: 'none',
    startDateTime: 'none',
    endDateTime: 'none',
    past: 'false',
    thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/Shopping-at-the-Bazaar3_1e82a22f-5056-a36a-0b8b628ceeb7a3ed.jpg',
    tags: ['Christmas']
  },
  {
    id: 'none',
    title: 'Lite Brite Nite',
    url: 'https://www.utahvalley.com/event/lite-brite-nite/23931/',
    location: 'Venue: University Place',
    description: 'none',
    ticketsUrl: 'none',
    startDateTime: 'none',
    endDateTime: 'none',
    past: 'false',
    thumbnail: 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/orchard-lighting-inspo-40_f9370b54-5056-a36a-0baa4fe963d97050.jpg',
    tags: []
  }
];

describe('EventFiltersPipe', () => {
  it('create an instance', () => {
    const pipe = new EventTagsFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('filters by tag', () => {
    const pipe = new EventTagsFilterPipe();
    expect(pipe.transform(events, ['BYU']).length).toBe(5);
    expect(pipe.transform(events, ['BYU', 'Religious']).length).toBe(6);
    expect(pipe.transform(events, ['Dance', 'Education']).length).toBe(3);
  });

  it('does not filter when given empty or undefined tag array', () => {
    const pipe = new EventTagsFilterPipe();
    expect(pipe.transform(events, []).length).toBe(14);
    expect(pipe.transform(events, undefined).length).toBe(14);
  });
});
