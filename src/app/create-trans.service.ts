import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators"; 

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
    console.log(obj,"Create transaction object")
    return this.http.post(environment.createTrans , obj)
  }
  // getProducts():Observable<any>
  // {
  //   return this.http.get(environment.productsJson).pipe(map(res => res));
  // }
  // getAccounts():Observable<any>
  // {
  //   return this.http.get(environment.accountsJson)
  // }
  getTemplates(UserID , AccessToken , formID , RequestType , selectedTemplate):Observable<any>{
    let obj = {
      formID : formID ,
      UserID : UserID ,
       AccessToken : AccessToken,
       RequestType : RequestType,
       RequestBy : selectedTemplate
    }
    //console.log("obj" , obj)
   return this.http.post(environment.txnFields , obj )    
  }

  postMasterTransaction(masterobj): Observable<Object>
  {
    return this.http.post(environment.test  , masterobj);
  }
}
