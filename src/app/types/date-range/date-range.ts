import { Moment } from 'moment';

export interface DateRange {
    name?: string;
    start: Moment;
    end: Moment;
}
