import { Pipe, PipeTransform } from '@angular/core';

/**
 * Slices a string to a maximum length and adds an ellipsis to the end
 */
@Pipe({
  name: 'shortDescription',
  standalone: true
})
export class ShortDescriptionPipe implements PipeTransform {
  transform(value: string, maxLength: number = 15): string {
    const message = value.slice(0, maxLength);
    return message + '...';
  }
}
