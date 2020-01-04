import { ThemeService } from './../../core/services/theme.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/shared/services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  isDarkTheme: Observable<boolean>;

  Country: any;

  constructor(
    private themeService: ThemeService, 
    public countrieservice: CountriesService,
     ) { }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    //this.loadCountries();
  }

  // Get countries list
  loadCountries() {
    return this.countrieservice.getCountries().subscribe((data: {}) => {
      this.Country = data;
      //console.log(data);
    });
  }
 

}
