import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
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
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true"
    });
    const changedReq = req.clone({ headers });
    return next.handle(changedReq);
    // } else {
    //   const changedReq = req.clone({
    //     headers: req.headers.set('Content-Type', 'application/json')
    //   });
    //   //const changedReq = req.clone();
    //   return next.handle(changedReq);
    // }
  }
}
