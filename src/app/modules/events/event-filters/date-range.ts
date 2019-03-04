import * as moment from 'moment';

import { DateRange } from '../../../types';

export class DateRangeGenerator {
    private static readonly MONDAY = 1;
    private static readonly FRIDAY = 5;
    private static readonly SUNDAY = 7;
    private static get TODAY() { return moment().startOf('day'); }

    static getToday(): DateRange {
        return {
            name: 'Today',
            start: this.TODAY,
            end: this.TODAY
        };
    }

    /**
     * Returns DateRange with the rest of this week
     */
    static getThisWeek(): DateRange {
        return {
            name: 'This Week',
            start: this.TODAY,
            end: this.TODAY.isoWeekday(this.SUNDAY)
        };
    }

    static getThisWeekend(): DateRange {
        return {
            name: 'This Weekend',
            start: this.TODAY.isoWeekday(this.FRIDAY),
            end: this.TODAY.isoWeekday(this.SUNDAY)
        };
    }

    static getNextWeek(): DateRange {
        const nextMonday = this.TODAY.add(1, 'weeks').isoWeekday(this.MONDAY);
        const nextSunday = this.TODAY.add(1, 'weeks').isoWeekday(this.SUNDAY);

        return {
            name: 'Next Week',
            start: nextMonday,
            end: nextSunday
        };
    }

    static getNextWeekend(): DateRange {
        const nextFriday = this.TODAY.add(1, 'weeks').isoWeekday(this.FRIDAY);
        const nextSunday = this.TODAY.add(1, 'weeks').isoWeekday(this.SUNDAY);

        return {
            name: 'Next Weekend',
            start: nextFriday,
            end: nextSunday
        };
    }

    static getDateRangeFromStrings(startDateTimeStr?: string, endDateTimeStr?: string): DateRange {
        const startDateTime = startDateTimeStr ? moment(startDateTimeStr) : this.TODAY;
        const endDateTime = endDateTimeStr ? moment(endDateTimeStr) : this.TODAY;
        return {
            start: startDateTime,
            end: endDateTime
        };
    }

    static areRangesEqual(r1: DateRange, r2: DateRange) {
        return r1.start.isSame(r2.start, 'day') && r1.end.isSame(r2.end, 'day');
    }

    static cloneRange(range: DateRange): DateRange {
        return {
            name: range.name,
            start: range.start.clone(),
            end: range.end.clone()
        };
    }

}
