import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class NavlinksService {
  constructor(private http: HttpClient) {}
  getLinks(): Observable<any> {
    return this.http.get(environment.baseUrl + "GetSetupListView");
  }
}
