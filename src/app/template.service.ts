import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http:HttpClient) { }
  getTemplates(obj):Observable<any>{
    console.log("obj" , obj)
    return this.http.get(environment.baseUrl + obj);
    
  }
  
}
