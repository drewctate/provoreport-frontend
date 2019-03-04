import { Pipe, PipeTransform } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Pipe({
  name: 'customTitleCase'
})
export class CustomTitleCasePipe implements PipeTransform {

  private titleCase = (new TitleCasePipe()).transform;

  // Mapping of strings to their replacements
  private replaceRules = {
    'Byu': 'BYU',
    'Fhe': 'FHE',
    'Uvu': 'UVU',
    'Cpms': 'CPMS',
  };

  transform(value: string): any {
    let titleCased = this.titleCase(value);
    for (const toReplace in this.replaceRules) {
      titleCased = titleCased.replace(toReplace, this.replaceRules[toReplace]);
    }
    return titleCased;
  }

}
