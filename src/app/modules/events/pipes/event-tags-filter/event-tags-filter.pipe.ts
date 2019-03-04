import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../../../../types';

@Pipe({
  name: 'eventTagsFilter'
})
export class EventTagsFilterPipe implements PipeTransform {

  transform(events: Event[], selectedTags: string[]): any {
    if (!events) {
      return;
    }
    if (!selectedTags || selectedTags.length === 0) {
      return events;
    }
    return events.filter(event => {
      for (const tag of selectedTags) {
        if (event.tags.includes(tag)) {
          return true;
        }
      }
    });
  }

}
