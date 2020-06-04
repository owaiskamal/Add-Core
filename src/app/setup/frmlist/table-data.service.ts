import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  constructor(private http:HttpClient) { }
  getTableData(formID) : Observable<any>
  {
    const UserID = sessionStorage.getItem('username');
    const AccessToken = sessionStorage.getItem('token');
    let setup = {
      formID,
      UserID,
      AccessToken
    };

    return this.http.post(environment.setupUrl,setup);
  }
}
