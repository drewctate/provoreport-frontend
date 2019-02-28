import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

const getSortFunc = (attribute: string, type: 'date' | 'val') => {
  if (type === 'date') {
    return (a, b) => {
      if (moment(a[attribute]).isBefore(moment(b[attribute]))) {
        return -1;
      } else if (moment(b[attribute]).isBefore(moment(a[attribute]))) {
        return 1;
      } else {
        return 0;
      }
    };
  } else {
    return (a, b) => {
      if (a[attribute] < (b[attribute])) {
        return -1;
      } else if (b[attribute] > a[attribute]) {
        return 1;
      } else {
        return 0;
      }
    };
  }
};

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: any[], attribute: string, type: 'date' | 'val' = 'val'): any {
    if (!array) {
      return;
    }

    if (attribute) {
      return array.sort(getSortFunc(attribute, type));
    } else {
      return array.sort();
    }
  }

}
