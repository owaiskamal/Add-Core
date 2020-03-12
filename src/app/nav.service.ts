import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Event, NavigationEnd, Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class NavService {
  public appDrawer: boolean;
  public currentUrl = new BehaviorSubject<string>(undefined);
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
   }

   public closeNav(app : boolean) {
    this.appDrawer = app;
  }
  }
