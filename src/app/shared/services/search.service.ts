
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { Countries } from '../model/countries';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  search(text: string): Observable<any> {

    const query = {name};
    
    //const query1 = JSON.stringify(query);
    const uri = 'https://restcountries.eu/rest/v2/name/' + query;
   

    console.log(uri);

    const filter = encodeURI(JSON.stringify(query));

    const url = 'https://restcountries.eu/rest/v2/name/' + filter;

    console.log(url);


    return this.http.get(url)
    .pipe(map(res => res),
      catchError(err => {
        return throwError(err);
    }));

  }

}
