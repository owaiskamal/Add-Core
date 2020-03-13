import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';
import { NavlinksService } from './navlinks.service';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { NavService } from '../nav.service';
import { UserauthService } from '../userauth.service';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class AdminPageComponent implements OnInit ,AfterViewInit  {
  items: MenuItem[];
  visibleSidebar1: boolean;

  @Input() depth: number;
  myDiv;
  menuState:string = 'out';

  private renderer: Renderer2
  @ViewChild('appDrawer') appDrawer : boolean
  @ViewChild(SidenavComponent) sidenav;
  constructor(private router:Router,private navlinkservice: NavlinksService , private navService : NavService , private userService : UserauthService ) {
    if (this.depth === undefined) {
      this.depth = 0;
    }


   }
  navbarOpen = false;
  sidebarOpen = true;
  public links = [];
  expanded : boolean;

  ngOnInit() {

this.getLinks();
}
ngAfterViewInit()
{


  // this.navService.appDrawer = this.appDrawer;
  // console.log(this.navService.appDrawer);


}
/* onItemClick($event)
{
  console.log($event);
  this.expanded = !this.expanded;

 } */
// <div class="sidenav">
// <app-sidenav *ngFor="let item of links" [item]="item"></app-sidenav>
// </div>
getLinks() {
  var data = sessionStorage.getItem('menuitem')
  console.log(JSON.parse(data));

  this.links = JSON.parse(data);
  // this.navlinkservice
  //   .getLinks()
  //   .subscribe(res => {
  //     console.log("Eae", res);
  //     this.links = res;
  //   });
}
receiveMessage(event:string)
{

  this.myDiv.style.display = 'none';

  //this.sidebarOpen = $event;
}
toggleNavbar() {

  this.menuState = this.menuState === 'out' ? 'in' : 'out';
  this.sidebarOpen = !this.sidebarOpen;
}

logout() {
  var data = sessionStorage.getItem('username')
  this.userService.userLogout(data).subscribe(res=>{
    console.log(res);
    sessionStorage.removeItem('token');
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('menuitem')
  this.router.navigateByUrl("");

  },
  (error)=>
  {
    console.log("Logout Not Working" , error);

  })
  // remove user from local storage to log user out

  //this.currentUserSubject.next(null);
}
adminpage(){
  this.router.navigateByUrl("adminpage");
}
}
