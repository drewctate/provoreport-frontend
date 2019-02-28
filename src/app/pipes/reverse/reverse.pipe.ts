import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(array: any[]): any[] {
    if (!array) {
      return;
    }

    return array.reverse();
  }

}
