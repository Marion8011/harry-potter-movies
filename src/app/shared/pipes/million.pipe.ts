import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'million',
  standalone: true
})
export class MillionPipe implements PipeTransform {
  transform(value: string): string {
    return `$${value} million`;
  }
}
