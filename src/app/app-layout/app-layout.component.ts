import { Component, ElementRef, OnDestroy, OnInit } from "@angular/core";
import {
  trigger,
  animate,
  style,
  group,
  animateChild,
  query,
  stagger,
  transition,
} from "@angular/animations";
import { environment } from "src/environments/environment";
import { NavlinksService } from "../menu-page/navlinks.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: "app-app-layout",
  templateUrl: "./app-layout.component.html",
  styleUrls: ["./app-layout.component.scss"],
  animations: [
    trigger("routerTransition", [
      transition("* <=> *", [
        /* order */
        /* 1 */ query(
          ":enter, :leave",
          style({ opacity: 0, position: "fixed", width: "79%" }),
          { optional: true }
        ),
        /* 2 */ group([
          // block executes in parallel
          query(
            ":enter",
            [
              style({ transform: "translateX(100%)", opacity: 0 }),
              animate(
                ".5s ease-in-out",
                style({ transform: "translateX(0%)", width: "79%", opacity: 1 })
              ),
            ],
            { optional: true }
          ),
          query(
            ":leave",
            [
              style({ transform: "translateX(0%)", opacity: 1 }),
              animate(
                "0.3s ease-in-out",
                style({
                  transform: "translateX(-100%)",
                  width: "79%",
                  opacity: 0,
                })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),
    ]),

  ],
})
export class AppLayoutComponent implements OnInit ,OnDestroy {
  sideMenu: boolean;
  cookieString: string;
  menu: any[] = [];
  breadcrumbList: Array<any> = [];
  activeRoute: String;
  root: boolean = false;
  parentName: any ;
  constructor(
    private navlinkservice: NavlinksService,
    private _router: Router,
    private route: ActivatedRoute,
    private cookieService : CookieService,
    private elementRef: ElementRef
  ) {
    this.menu = JSON.parse(sessionStorage.getItem("menuitem"));
    this.listenRouting();
    this.cookieString =  this.cookieService.get("menuState")
   // this.title.setTitle( SampleJson.AppSettings[0].Title);
   if(this.cookieString == "sideFalse")
   {
     this.sideMenu =false
     console.log(this.sideMenu , "componentapp");

     this.navlinkservice.setData(this.sideMenu)
   }
   else if(this.cookieString == "sideTrue")
   {
     this.sideMenu = true
     this.navlinkservice.setData(this.sideMenu)
   }
   else{
     this.sideMenu = true;
     console.log("cookies not available");

     this.navlinkservice.setData(this.sideMenu)
   }
  }
  urlEmpty: boolean;
  ngOnInit() {


    this.navlinkservice.currentData.subscribe((data) => {
      console.log(data, "app layout compoennt");
      this.sideMenu = data;
    });
  }
  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
  listenRouting() {
    console.log("listening routes");
    this.breadcrumbList.length = 0;
    this.parentName = null
    let routerUrl: string, routerList: Array<any>, target: any;
    this._router.events.subscribe((router: any) => {
      routerUrl = router.urlAfterRedirects;
      if (routerUrl && typeof routerUrl === "string") {
        routerList = routerUrl.slice(1).split("=");
        console.log(routerList, "list");

        if (routerList.length > 1) {
          this.root = false;
          var title = decodeURI(routerList[1]);
          this.activeRoute = title;
          console.log(title);
          loop: for(let i = 0 ;i<this.menu.length;i++){


            console.log(i);

             for(let k of this.menu[i]['Forms']){
               if(k.Name == title){

                 this.parentName = this.menu[i]["Node"];


                 break loop;
              }
             }


          }
        } else {
          this.root = true;
        }
      }
    });

  }
}
