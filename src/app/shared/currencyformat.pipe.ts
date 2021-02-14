import { Pipe, PipeTransform } from '@angular/core';
import { environment } from './../../environments/environment';


@Pipe({
  name: 'currencyformat'
})
export class CurrencyformatPipe implements PipeTransform {

  env=environment;

  transform(value: number): any {
     
    if(localStorage.getItem("currency")=="Pound"){
      return "£" + value*2;
    }
    else if(localStorage.getItem("currency")=="Euro"){
      return "€" + value*1.5;
    }
    else if(localStorage.getItem("currency")=="Dollar"){
      return "$" + value;
    }
    else{
      return "$" + value;
    }
    
  }


}
