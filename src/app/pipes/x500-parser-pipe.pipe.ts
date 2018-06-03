import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'x500ParserPipe'
})
export class X500ParserPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.split(',', 1)[0].substring(2);
  }

}
