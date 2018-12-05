import * as moment from 'moment';

export class CalendarUtils {

    /**
     * Return 12-hour format to 24-hour.
     */
    static getMilitaryHours(hours: number): string {
        if (hours % 1 === 0.5) {
            return `${Math.floor(hours)}30`;
        }
        return `${Math.round(hours)}00`;
    }

    /**
     * Gets the duration between dates.
     */
    static getHoursDuration(startDate: string, endDate: string, timezone?: number): string {
        const start = moment(startDate);
        const end = moment(endDate);

        if (timezone) {
            start.utcOffset(timezone);
            end.utcOffset(timezone);
        }

        const hours = moment
            .duration(end.diff(start))
            .asHours();

        return this.getMilitaryHours(hours);
    }

    /**
     * Removes line breaks and ensures that the string is no
     * longer than maxLength chars (or 75 chars if none specified).
     *
     * @param  str string to sanitize
     * @param  maxLength index of string to truncate at
     */
    static formatIcsText(str: string, maxLength: number): string {
        if (!str) {
            return '';
        }
        str = str.replace(/\n/g, '\\n');
        str = str.substring(0, maxLength);

        return str;
    }

    /**
     * Format time as a universal timestamp format w.r.t. the given timezone.
     *
     * @param  timestamp valid RFC-2822 string timestamp
     * @param  timezone  tz offset (in minutes) (optional)
     */
    static toUniversalTime(timestamp: string, timezone: string): string {
        const dt = moment(timestamp);

        if (timezone) {
            dt.utcOffset(timezone);
        }
        return dt.format('YYYYMMDDTHHmmss');
    }

    /**
     * The name of the file will be the event title with alphanumeric chars
     * having the extension `.ics`.
     */
    static getIcsBlob(icsData: string): Blob {
        return new Blob([icsData], {
            type: 'application/octet-stream'
        });
    }

    /**
     * Transforms given string to be valid file name.
     */
    static getIcsFileName(title: string): string {
        if (!title) {
            return 'event.ics';
        }
        return `${title.replace(/[^\w ]+/g, '')}.ics`;
    }

    /**
     * Returns a random base 36 hash for iCal UID.
     */
    static getUid(): string {
        return Math.random().toString(36).substr(2);
    }

    /**
     * Returns a universal timestamp of current time.
     */
    static getTimeCreated(): string {
        return moment().format('YYYYMMDDTHHmmss');
    }
}
