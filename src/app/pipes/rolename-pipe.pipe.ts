import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rolename'
})
export class RolenamePipePipe implements PipeTransform {

  transform(inputBanker: any, leadBanker: string): any {
    //console.log('Input banker ' + inputBanker + ' Lead ' + leadBanker);
    if(inputBanker === leadBanker) {
      return 'Lead Banker';
    }
    else {
      return 'Book Runner';
    }
  }

}
