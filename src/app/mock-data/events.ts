import { Event } from '../types/index';
import * as moment from 'moment';

export class EventFaker {
    private static _events: Event[] = [];

    public static fakeEvents() {
        const formatString = 'YYYYMMDDTHHmmss';
        const currentDate = moment().startOf('day');

        return this._events.map(event => {
            const seven = currentDate.clone().add(19, 'h');
            const eight = currentDate.clone().add(20, 'h');
            event.startDateTime = seven.format(formatString);
            event.endDateTime = eight.format(formatString);
            currentDate.add(1, 'day');
            return event;
        });
    }
}
