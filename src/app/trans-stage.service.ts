import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransStageService {

  constructor(private http:HttpClient) { }

  getFiles(): Observable<any>{
    return this.http.get(environment.fakeJson)
  }
}
