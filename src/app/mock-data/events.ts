import { Event } from '../types/index';
import * as moment from 'moment';

export class EventFaker {
    private static _events: Event[] = [
        {
            'id': '3125b920-0a46-4d99-be81-95dbeb27dc28',
            'title': 'Fall 2018 Reason for Hope',
            'url': 'https://calendar.byu.edu/event/fall-2018-reason-hope',
            'time': '10:00 AM to 4:00 PM',
            'startDate': '20190114T190000',
            'endDate': '20190114T200000',
            'location': 'Wilkinson Student Center',
            'thumbnail': 'https://calendar.byu.edu/sites/default/files/styles/thumbnail/public/Other_600x600.jpg?itok=d4gtvndZ',
            'tags': [
                'BYU',
                'Religious'
            ]
        },
        {
            'id': '4ea1a0fa-6d87-407e-985a-c103132ff537',
            'title': 'Utah Valley University - BYU Women\'s Basketball',
            'url': 'https://calendar.byu.edu/event/utah-valley-university-byu-womens-basketball',
            'time': '11:00 AM to 1:00 PM',
            'startDate': '20190115T190000',
            'endDate': '20190115T200000',
            'location': '',
            'thumbnail': 'https://calendar.byu.edu/sites/default/files/styles/thumbnail/public/Athletics_600x600.jpg?itok=-BMDPJOC',
            'tags': [
                'BYU',
                'Sports',
                'Basketball'
            ]
        },
        {
            'id': '97bcc337-ab6a-441f-a8fc-416bfa991761',
            'title': 'Disciple Scholar Lecture Series with Dr. Julie Crockett',
            'url': 'https://calendar.byu.edu/event/disciple-scholar-lecture-series-dr-julie-crockett',
            'time': '5:30 PM to 7:00 PM',
            'startDate': '20190116T190000',
            'endDate': '20190116T200000',
            'location': '321 MSRB',
            'thumbnail': 'https://calendar.byu.edu/sites/default/files/styles/thumbnail/public/Crockett_Julie_web-compressor_new-1_0.jpg?itok=bCCDjUEW',
            'tags': [
                'BYU',
                'Education',
                'Religious'
            ]
        },
        {
            'id': 'ab724aa5-46ca-4bfd-b008-f345256ad4fe',
            'title': 'BYU Luau',
            'url': 'https://calendar.byu.edu/event/byu-luau-1',
            'time': '6:00 PM',
            'startDate': '20190117T190000',
            'endDate': '20190117T200000',
            'location': 'BYU WSC Ballroom',
            'thumbnail': 'https://calendar.byu.edu/sites/default/files/styles/thumbnail/public/LUAUblock6x6.jpg?itok=y79NdE6f',
            'tags': [
                'BYU',
                'Multicultural',
                'Music',
                'Dance'
            ]
        },
        {
            'id': '96a284ae-5914-4bd6-9ec0-b3950e845dae',
            'title': 'Free Live Animal Show - Classification',
            'url': 'https://calendar.byu.edu/event/free-live-animal-show-classification-64',
            'time': '7:30 PM to 8:15 PM',
            'startDate': '20190118T190000',
            'endDate': '20190118T200000',
            'location': 'Bean Life Science Museum',
            'thumbnail': 'https://calendar.byu.edu/sites/default/files/styles/thumbnail/public/Classification_CalendarIcon.jpg?itok=jcys0xOk',
            'tags': [
                'BYU',
                'Nature',
                'Animals'
            ]
        },
        {
            'id': '07ae6ad7-251f-4f26-b6ff-46b31c0a4ac1',
            'title': '100 Dollar Show',
            'url': 'https://www.utahvalley.com/event/100-dollar-show/23958/',
            'location': 'Venue: Springville Museum of Art',
            'startDate': '20190119T190000',
            'endDate': '20190119T200000',
            'thumbnail': 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/6.Katrina-Berg-i-llbethere.katrinaberg_88a57cd5-5056-a36a-0bfbbd49c83712d0.jpg',
            'tags': [
                'Arts',
                'Painting',
                'Shopping'
            ]
        },
        {
            'id': '1b3b20bb-8ef2-4ce0-a840-da7ee04cc02e',
            'title': '2018 Holiday Beehive Bazaar Handmade Art and Craft Fair',
            'url': 'https://www.utahvalley.com/event/2018-holiday-beehive-bazaar-handmade-art-and-craft-fair/23970/',
            'location': 'The Bright Building',
            'startDate': '20190120T190000',
            'endDate': '20190120T200000',
            'thumbnail': 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/web-postcard-01_f19e5ef6-5056-a36a-0b6625fdf3ec57b8.jpg',
            'tags': [
                'Arts',
                'Shopping',
                'Local'
            ]
        },
        {
            'id': '8ebcfeec-1b16-47f6-a563-3f5c2c5270a6',
            'title': '33rd Annual Spiritual and Religious Art of Utah',
            'url': 'https://www.utahvalley.com/event/33rd-annual-spiritual-and-religious-art-of-utah/23961/',
            'location': 'Venue: Springville Museum of Art',
            'startDate': '20190121T190000',
            'endDate': '20190121T200000',
            'thumbnail': 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/Springville-Museum-32-annual-246_849b8147-5056-a36a-0b0eeec26873f7fc.jpg',
            'tags': [
                'Religious',
                'Arts',
                'Painting',
                'Sculpture'
            ]
        },
        {
            'id': '4c8c2815-38be-4137-8868-7dde21e1799d',
            'title': 'A Christmas Carol',
            'url': 'https://www.utahvalley.com/event/a-christmas-carol/24991/',
            'location': 'Venue: Hale Center Theater Orem',
            'startDate': '20190122T190000',
            'endDate': '20190122T200000',
            'thumbnail': 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/Christmas-Carol-2018_6a01b863-5056-a36a-0bd2e6381975a39c.jpg',
            'tags': [
                'Christmas',
                'Theater'
            ]
        },
        {
            'id': 'fb81e36d-6c29-48ec-b50d-7b55a2a867c9',
            'title': 'Country Swing/Dance',
            'url': 'https://www.utahvalley.com/event/country-swing-dance/23687/',
            'location': '',
            'startDate': '20190123T190000',
            'endDate': '20190123T200000',
            'thumbnail': 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/LocoSwingDance2460_b7d0b7ec-5056-a36a-0b4dac9b51a182a2.jpg',
            'tags': [
                'Dance',
                'Arts'
            ]
        },
        {
            'id': '3598a935-7f4a-47f7-b6c1-85b82db05461',
            'title': 'Faculty Art Show',
            'url': 'https://www.utahvalley.com/event/faculty-art-show/23770/',
            'location': 'Venue: Woodbury Art Museum (Utah Valley University)',
            'startDate': '20190124T190000',
            'endDate': '20190124T200000',
            'thumbnail': 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/faculty_show_web0_20ed4af8-5056-a36a-0b3822920500d7a5.jpg',
            'tags': [
                'Arts',
                'Painting',
                'Sculpture'
            ]
        },
        {
            'id': 'cdf66d30-f36c-4d06-a01e-a0fd037606d4',
            'title': 'Holiday Concert with the UVU Symphony',
            'url': 'https://www.utahvalley.com/event/holiday-concert-with-the-uvu-symphony/23895/',
            'location': 'Venue: Utah Valley University Performing Arts',
            'startDate': '20190125T190000',
            'endDate': '20190125T200000',
            'thumbnail': 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/HolidayConcert2018_400px0_f64b61a2-5056-a36a-0b9d0de1273e9a0c.jpg',
            'tags': [
                'Arts',
                'Music',
                'UVU'
            ]
        },
        {
            'id': '482cf130-f3ff-4cc5-9db4-39454c4c9a65',
            'title': 'Holy Cow Boutique Christmas Show',
            'url': 'https://www.utahvalley.com/event/holy-cow-boutique-christmas-show/23679/',
            'location': 'Summit Center',
            'startDate': '20190126T190000',
            'endDate': '20190126T200000',
            'thumbnail': 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/Shopping-at-the-Bazaar3_1e82a22f-5056-a36a-0b8b628ceeb7a3ed.jpg',
            'tags': [
                'Christmas'
            ]
        },
        {
            'id': '6d341949-2a11-41c3-bfaa-5c40e0d34eb8',
            'title': 'Lite Brite Nite',
            'url': 'https://www.utahvalley.com/event/lite-brite-nite/23931/',
            'location': 'Venue: University Place',
            'startDate': '20190127T190000',
            'endDate': '20190127T200000',
            'thumbnail': 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_215,q_75,w_215/https://res.cloudinary.com/simpleview/image/upload/crm/utahvalley/orchard-lighting-inspo-40_f9370b54-5056-a36a-0baa4fe963d97050.jpg',
            'tags': []
        }
    ];

    public static fakeEvents() {
        const formatString = 'YYYYMMDDTHHmmss';
        const currentDate = moment().startOf('day');

        return this._events.map(event => {
            const seven = currentDate.clone().add(19, 'h');
            const eight = currentDate.clone().add(20, 'h');
            event.startDate = seven.format(formatString);
            event.endDate = eight.format(formatString);
            currentDate.add(1, 'day');
            return event;
        });
    }
}
