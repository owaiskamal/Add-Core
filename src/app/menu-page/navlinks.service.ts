import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class NavlinksService {
  private data = new BehaviorSubject(true)
       currentData = this.data.asObservable();
  constructor(private http: HttpClient) {}
  getLinks(): Observable<any> {
    return this.http.get(environment.baseUrl + "GetSetupListView");
  }
  setData(data) {
    this.data.next(data);
}
  
}
