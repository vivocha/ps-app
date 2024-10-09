import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'vvcMask' })
export class VvcMaskPipe implements PipeTransform {
  transform(value: string): string {
    const regex: RegExp = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;
    let maskedValue: string;
    if (regex.test(value)) {
      let masked: string = value.slice(0, -4);
      let visible: string = value.slice(-4);
      maskedValue = `${masked.replace(/./g, '*')}${visible}`;
    } else {
      maskedValue = value;
    }
    return maskedValue;
  }
}