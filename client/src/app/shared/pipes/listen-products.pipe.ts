import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listenProducts',
  standalone: false
})
export class ListenProductsPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }

}
