import { CountryC } from './../../shared/model/countryC';
import { Country } from './../../shared/model/country';
import { Router, ActivatedRoute, ParamMap, NavigationEnd  } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CountriesService } from 'src/app/shared/services/countries.service';
import { switchMap, share, map, shareReplay } from 'rxjs/operators';
import { Countries } from '../../shared/model/countries';
import { ThemeService } from './../../core/services/theme.service';


@Component({
  selector: 'app-single-country',
  templateUrl: './single-country.component.html',
  styleUrls: ['./single-country.component.scss']
})
export class SingleCountryComponent implements OnInit {
  name: string;
  id: number;
  countryId;
  country: Country = new Country();
  countryC: CountryC = new CountryC();
  //countryC;
  reg;
  currencies;
  languages;
  borders;
  isDarkTheme: Observable<boolean>;
  border1;
  alpha3Code;
  //countryName; 

 countryN = new Array();
 mySubscription: any;


  constructor(public activatedRoute: ActivatedRoute,
              public router: Router,
              public countriesService: CountriesService,
              private themeService: ThemeService ) { 

                this.router.routeReuseStrategy.shouldReuseRoute = function() {
                  return false;
                };
                this.mySubscription = this.router.events.subscribe((event) => {
                  if (event instanceof NavigationEnd) {
                    // Trick the Router into believing it's last link wasn't previously loaded
                    this.router.navigated = false;
                  }
                });

              }

  ngOnInit() {

    this.activatedRoute.params.pipe(switchMap((params: ParamMap) => {
      this.name = params['name'];
    
      return this.countriesService.getCountry(this.name);
      })).subscribe(response => {
        for( var i = 0; i < length; i++) {
           this.country = response[i];
        }
        this.country = response[i];
        this.reg = this.country.regionalBlocs[i];
        this.currencies = this.country.currencies[i];
        this.languages = this.country.languages;
        this.borders = this.country.borders;
        for (var i = 0; i < this.borders.length; i++) {
          this.border1 = this.country.borders[i];
          this.alpha3Code = this.border1;
          this.getCountryBorders(this.alpha3Code);
      }
      }, error => {
        console.log(error);
      }
    );
    this.isDarkTheme = this.themeService.isDarkTheme;

  }


  getCountryBorders(alpha3Code) {
    this.activatedRoute.params.pipe(switchMap((params: ParamMap) => {
      for ( var i = 0; i < length; i++) {
      this.borders[i] = params['alpha3Code'];
      }

      return this.countriesService.getBorders(alpha3Code)
      })).subscribe(data => {
        this.countryC = data;
        this.countryN.push(this.countryC.name);
      }, error => {
        console.log(error);
      }
    );
  }

  goTo(country) {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
    this.router.navigate(['/single-country/', country]);
  }
}
