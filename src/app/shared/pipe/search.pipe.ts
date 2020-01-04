import { Country } from './../model/country';
import { Countries } from './../model/countries';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(Countries: any, searchText: any): any {
    if(searchText == null) return Countries;

    return Countries.filter(function(Country){
      return Country.CountryName.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })
  }

}
