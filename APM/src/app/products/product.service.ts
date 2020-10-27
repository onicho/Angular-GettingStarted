import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ObjectUnsubscribedError, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {IProduct} from './product';
import { computeDecimalDigest } from '@angular/compiler/src/i18n/digest';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl ='api/products/products.json';

    constructor(private http: HttpClient){}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
          tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse){
      // in a real world app, we may send the server to some remote 
      // logging infrastructure instead of just logging to console
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
        // a client-side error ObjectUnsubscribedError, handle it accordingly
        errorMessage = `An error occured: ${err.error.message}`;
      } else {
        // a backend retunred unsuccessful code 
        // response body may contain some clues as well
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }
      console.error(errorMessage);
      return throwError(errorMessage);
    }

}