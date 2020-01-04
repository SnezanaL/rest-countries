import { HighlightifyPipe } from './../../shared/pipe/highlightify.pipe';
import { SearchService } from './../../shared/services/search.service';
import { SearchComponent } from './../search/search.component';
import { Countries } from './../../shared/model/countries';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { MatGridList } from '@angular/material';
import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CountriesService } from 'src/app/shared/services/countries.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import {map, startWith, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  providers: [SearchService]
})
export class TileComponent  implements AfterContentInit {
  @ViewChild('grid',  {static: true}) grid: MatGridList;

  country: Countries = new Countries();
  countries;
  Countries: any;
  errMessage;
  regions;
  region;

  mySubscription: any;

  private searchTerm = new Subject<string>();
  autocompleteBox = {hide: true};
  searchTextBox: null;

  selectedValue: string;

  gridByBreakpoint = {
    xl: 6,
    lg: 4,
    md: 3,
    sm: 2,
    xs: 1
  };

  constructor(
    private mediaObserver: MediaObserver,
    public countrieservice: CountriesService,
    public router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private spinner: NgxSpinnerService) {
     // this.loadRegions();
     }

  ngAfterContentInit() {
    this.mediaObserver.media$.subscribe((change: MediaChange) => {
      this.grid.cols = this.gridByBreakpoint[change.mqAlias];
    });
    this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 2000);
    
    this.filterCountries(this.searchTextBox); //when you fetch collection from server.
    this.getRegion(this.region);
  }
 
 filterCountries(value) {
    if (!value) {
        this.loadCountries();
    } else {
      this.loadCountriesFilter();
    }
    this.loadCountries();
    
    // this.filterCountries = Object.assign([], this.Countries).filter(
    //    item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    // )
 }

  loadCountriesFilter() {
    this.spinner.show();
    this.searchTerm.pipe(debounceTime(200), distinctUntilChanged())
    .subscribe(searchTerm => {


    //this.searchService.search(searchTerm).subscribe(response => {
      this.countrieservice.getCountry(searchTerm).subscribe(response => {

      // console.log(searchTerm);
      // console.log(response);

      this.Countries = response;
      // console.log(this.countries);
      this.spinner.hide();

      this.autocompleteBox.hide = false;
      this.errMessage = '';

    }, err => {
      this.clearCountries();
      this.errMessage = 'No results found.';
      //console.log(err);
    });
  });
  }


clearCountries() {
  this.Countries = [];
}


  // Get countries list
  loadCountries() {
    this.spinner.show();
    return this.countrieservice.getCountries().subscribe((data: {}) => {
      this.Countries = data;
      this.spinner.hide();
      this.errMessage = '';
      //console.log(this.countries);
    });
  }

  goToCountry(name) {
    this.router.navigate(['/single-country/', name]);
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

   getRegion(selectedValue) {
     this.region = selectedValue;
     //console.log(this.region);
   }
   onSelectedChange(value: any) {
    // do something else with the value
    // console.log(value);

    // remember to update the selectedValue
    this.selectedValue = value;
    this.region = this.selectedValue;

    this.countrieservice.getRegions(this.region).subscribe(response => {

      //console.log(this.region);
      //console.log(response);

      this.Countries = response;
      //console.log(this.Countries);

      //this.autocompleteBox.hide = false;
      //this.errMessage = '';

    }, err => {
      //this.clearCountries();
      //this.errMessage = 'No results found.';
      //console.log(err);

    });
  }
  loadRegions(region) {
    return this.countrieservice.getRegions(this.region).subscribe((data: {}) => {
      this.regions = data;
      console.log(this.regions);
    });
   }

}
