import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {

  constructor(private router : Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log("hello interceptor");

    // if (sessionStorage.length > 0) {
    // const headers = new HttpHeaders({
    //   'Authorization': sessionStorage.getItem('token'),
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Credentials': 'true'
    // });
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(req).pipe(
        catchError(
        (err) => {
          if (err.status === 401){
            this.handleAuthError();
            return of(err);
          }
          throw err;
        }
      )
    );
  }
  private handleAuthError() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("menuitem");

    this.router.navigateByUrl('');
  }
    // } else {
    //   const changedReq = req.clone({
    //     headers: req.headers.set('Content-Type', 'application/json')
    //   });
    //   //const changedReq = req.clone();
    //   return next.handle(changedReq);

    // }
  }

