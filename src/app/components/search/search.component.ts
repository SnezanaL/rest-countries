import { Country } from './../../shared/model/country';
import { Countries } from './../../shared/model/countries';
import { CountriesService } from './../../shared/services/countries.service';
import { FormControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { SearchService } from './../../shared/services/search.service';
import { Component, OnDestroy, Input, EventEmitter, Output, OnInit} from '@angular/core';
import {map, startWith, debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit  {

  private searchTerm = new Subject<string>();
  autocompleteBox = {hide: true};
  countries;
  searchTextBox: any;

  constructor(private searchService: SearchService,
              public countrieservice: CountriesService) {

                this.searchTerm.pipe(debounceTime(200), distinctUntilChanged())
                .subscribe(searchTerm => {

                //this.searchService.search(searchTerm).subscribe(response => {
                  this.countrieservice.getCountry(searchTerm).subscribe(response => {

                  console.log(searchTerm);
                  console.log(response);
            
                  this.countries = response as Countries;
                  console.log(this.countries);
            
                  this.autocompleteBox.hide = false;
            
                }, err => {
            
                  console.log(err);
            
                });
            
            
              });
  }

  ngOnInit() {

  }

  onKeyup(searchText: string) {

    console.log('got text: ', searchText);
 
    if (searchText !== '') {
      this.searchTerm.next(searchText);
    }

   }
 
   showDetail(countries: Countries) {
     this.autocompleteBox.hide = true;
   }


}
