import { Component, OnInit } from '@angular/core';
import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';
import { environment } from 'src/environments/environment';
import { NavlinksService } from '../menu-page/navlinks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  animations : [trigger('routerTransition', [
    transition('* <=> *', [
      /* order */
      /* 1 */ query(':enter, :leave', style({ opacity : 0 ,  position: 'fixed', width:'79%' })
        , { optional: true }),
      /* 2 */ group([  // block executes in parallel
        query(':enter', [
          style({ transform: 'translateX(100%)' , opacity : 0 }),
          animate('.5s ease-in-out', style({ transform: 'translateX(0%)' , width:'79%', opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' , opacity:1 }),
          animate('0.3s ease-in-out', style({ transform: 'translateX(-100%)' , width:'79%', opacity: 0 }))
        ], { optional: true }),
      ])
    ])
  ])
  ]
})

export class AppLayoutComponent implements OnInit {

  sideMenu : boolean
  cookieString: string;
  menu: any[]=[];
  breadcrumbList: Array<any> = [];
  activeRoute : String;
  root: boolean = false;
  constructor(private navlinkservice: NavlinksService , private _router : Router , private route : ActivatedRoute) {
    this.listenRouting()
   
    
   }
   urlEmpty : boolean
  ngOnInit() {
    
    this.menu = JSON.parse(sessionStorage.getItem('menuitem'));
   
    this.navlinkservice.currentData.subscribe(data => {
      console.log(data,"app layout compoennt");
      this.sideMenu = data
    });
   
  }
  getState(outlet) {


    return outlet.activatedRouteData.state;
  }
  listenRouting() {
    console.log("listening routes");
    this.breadcrumbList.length = 0;

    
    let routerUrl: string, routerList: Array<any>, target: any;
    this._router.events.subscribe((router: any) => {
      routerUrl = router.urlAfterRedirects;
      if (routerUrl && typeof routerUrl === 'string') {
       
        
      
        routerList = routerUrl.slice(1).split('=');
        console.log(routerList,"list");
        
        if(routerList.length > 1)
        {
          this.root = false
          var title =decodeURI(routerList[1]) 
          this.activeRoute = title
          console.log(title);
         
        }
        else{
          this.root = true
        }
         
        
      }
    });
    
   
  }
}
