import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly http: HttpClient) {}

  get<T>(
    url: string,
    params?: Record<string, string>,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.http
      .get<T>(`${url}`, { headers, params: params })
      .pipe(catchError(this.handleError));
  }

  post<B, T>(url: string, body: B, headers?: HttpHeaders): Observable<T> {
    return this.http
      .post<T>(`${url}`, body, { headers })
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof HttpErrorResponse) {
      console.log(`An error occured:, ${error.message}`);
    } else {
      console.log(
        `Base service returned code ${error.status},` +
          `body was : ${error.error}`
      );
    }
    return throwError(error);
  }
}
