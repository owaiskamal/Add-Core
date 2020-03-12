import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateCreatorService {

  constructor(private http : HttpClient) { }


  postTemplate(obj): Observable <any>
  {
    return this.http.post(environment.baseUrl + "BS" , obj );
  }

  updateTemplate(obj , prog): Observable<any>
  {
    return this.http.post(environment.baseUrl + prog , obj);
  }
}
