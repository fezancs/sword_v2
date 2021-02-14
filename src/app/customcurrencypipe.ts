import { Pipe , PipeTransform } from '@angular/core';

@Pipe({ name: 'arooj'})
export class CustomCurrencyPipe implements PipeTransform {
    

   transform(value : any): string{

    var fav:string=""
    if(value=="dolar"){
        fav="dol";
    }
    if(value=="DOLAR"){
        fav="dol";
    }
    if(value=="euro"){
        fav="euro";
    }
    return fav;  
      

   }

}