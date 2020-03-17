import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  constructor(private http:HttpClient) { }
  getData():Observable<any>{
     return this.http.get(environment.baseUrl + 'data');
  }
  deleteData(obj,id):Observable<any>{
    console.log(id , "serv");
    
    return this.http.delete(environment.baseUrl + obj + '/' + id);
  }
}
