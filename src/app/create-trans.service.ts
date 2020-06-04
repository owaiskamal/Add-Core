import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateTransService {

  constructor(private http : HttpClient) { }

  getCreateTransaction(formID , UserID , AccessToken):Observable<any>
  {
    let obj = {
      formID : formID ,
       UserID : UserID ,
        AccessToken : AccessToken
    }
    return this.http.post(environment.createTrans , obj)
  }
}
