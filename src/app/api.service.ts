import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { UserService } from './user.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private userService: UserService) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  getLoads(): Observable<any> {
    const token = this.userService.getToken();
    return this.http.get(`${apiUrl}/load/history/${token}`, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getUser(data): Observable<any> {
    return this.http.put(`${apiUrl}/user`, data, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  searchLoad(data): Observable<any> {
    const token = this.userService.getToken();
    return this.http.post(`${apiUrl}/load/search/${token}`, data, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postLoad(data): Observable<any> {
    data.user_id = this.userService.getToken();
    return this.http.post(`${apiUrl}/load`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  createUser(data): Observable<any> {
    return this.http.post(`${apiUrl}/user`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteLoad(id: number): Observable<{}> {
    const url = `${apiUrl}/load/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
