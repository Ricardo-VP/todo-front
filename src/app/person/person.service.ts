import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Person } from './person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private apiURL = 'https://sheltered-caverns-32656.herokuapp.com/api/person/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Person[]> {
    return this.httpClient
      .get<Person[]>(this.apiURL)
      .pipe(catchError(this.errorHandler));
  }

  create(person: any): Observable<Person> {
    return this.httpClient
      .post<Person>(this.apiURL, JSON.stringify(person), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  find(id: any): Observable<Person> {
    return this.httpClient
      .get<Person>(this.apiURL + id)
      .pipe(catchError(this.errorHandler));
  }

  update(id: any, person: any): Observable<Person> {
    return this.httpClient
      .put<Person>(this.apiURL + id, JSON.stringify(person), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  delete(id: any) {
    return this.httpClient
      .delete<Person>(this.apiURL + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
