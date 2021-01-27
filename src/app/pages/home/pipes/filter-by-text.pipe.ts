import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'filterByText',
})
export class FilterByTextPipe implements PipeTransform {
  transform(arrayElements: any, searchingText: any): any {
    if (searchingText && arrayElements.length > 0) {
      let filteredArrayElement = [];
      let splittedText = searchingText;
      // [',', '[', ']', '(', ')', ',', '.', '-', '_'].forEach((char) => {
      //   splittedText = splittedText.split(char).join(' ');
      // });
      return _.filter(arrayElements, (element: any) => {
        if (
          element.name.toLowerCase().indexOf(searchingText.toLowerCase()) > -1
        ) {
          return element;
        }
      });
      // return filteredArrayElement;
    } else {
      return arrayElements;
    }
  }
}
