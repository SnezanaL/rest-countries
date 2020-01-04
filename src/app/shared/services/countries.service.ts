import { CountryC } from './../model/countryC';
import { Country } from './../model/country';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { Countries } from '../model/countries';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

    // Define API
    apiURL = 'https://restcountries.eu/rest/v2';

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // HttpClient API get() method => Fetch countries list
  getCountries(): Observable<Countries> {
    return this.http.get<Countries>(this.apiURL + '/all')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  getRegions(region) {
    return this.http.get(this.apiURL + '/region/' + region)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  getCountry(name): Observable<Countries> {
    return this.http.get<Countries>(this.apiURL + '/name/' + name )
    .pipe(
        map(res => res as Countries),
        retry(1),
        catchError(this.handleError)
      );
  }

  getBorders(alpha3Code): Observable<CountryC> {
    return this.http.get<CountryC>(this.apiURL + '/alpha/' + alpha3Code )
    .pipe(
        map(res => res),
        //retry(1),
        catchError(this.handleError)
      );
  }

  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
