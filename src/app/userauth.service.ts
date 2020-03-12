import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class UserauthService {
  constructor(private http: HttpClient) {}
  header : any;
  userAuth(UserId, Password): Observable<any> {
    let user = {
      UserId,
      Password
    };
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);

    return this.http.post<any>(environment.apiUrl, user);
  }

  userLogout(UserID): Observable<any>
  {
    let user = {
      UserID  ,
      Password : ""
    };
    return this.http.post<any>(environment.logoutUrl , user);
  }
}
