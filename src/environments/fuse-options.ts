import * as Fuse from 'fuse.js';
import { Event } from 'src/app/types';

export const fuseOptions: Fuse.FuseOptions<Event> = {
    shouldSort: true,
    tokenize: true,
    threshold: 0.3,
    location: 0,
    distance: 80,
    maxPatternLength: 42,
    minMatchCharLength: 1,
    keys: [
        'title',
        'description'
    ]
};
