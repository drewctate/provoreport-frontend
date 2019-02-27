import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../../types';
import * as moment from 'moment';

@Pipe({
  name: 'sortEvents'
})
export class SortEventsPipe implements PipeTransform {

  transform(events: Event[]): any {
    return events.sort((a, b) => {
      if (moment(a.startDateTime).isBefore(moment(b.startDateTime))) {
        return -1;
      } else if (moment(b.startDateTime).isBefore(moment(a.startDateTime))) {
        return 1;
      } else {
        return 0;
      }
    });
  }

}
