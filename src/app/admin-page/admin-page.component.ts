import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Renderer2,
} from "@angular/core";
import { MenuItem } from "primeng/api";
import { Router } from "@angular/router";
import { NavlinksService } from "./navlinks.service";
import { SidenavComponent } from "../sidenav/sidenav.component";
import { NavService } from "../nav.service";
import { UserauthService } from "../userauth.service";
import {
  trigger,
  state,
  transition,
  animate,
  style,
} from "@angular/animations";
import { HostListener } from "@angular/core";
import { Title } from '@angular/platform-browser';

@Component({
  selector: "app-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.scss"],
  animations: [
    trigger("slideInOut", [
      state(
        "in",
        style({
          transform: "translate3d(0,0,0)",
        })
      ),
      state(
        "out",
        style({
          transform: "translate3d(100%, 0, 0)",
        })
      ),
      transition("in => out", animate("400ms ease-in-out")),
      transition("out => in", animate("400ms ease-in-out")),
    ]),
    trigger("hamburguerX", [
      state("hamburguer", style({})),
      state(
        "topX",
        style({
          transform: "rotate(45deg)",
          transformOrigin: "left",
          margin: "4px",
        })
      ),
      state(
        "hide",
        style({
          opacity: 0,
        })
      ),
      state(
        "bottomX",
        style({
          transform: "rotate(-45deg)",
          transformOrigin: "left",
          margin: "4px",
        })
      ),

      transition("topX => *", animate("0.2s")),
    ]),
  ],
  host: {
    "(window:click)": "onResize()",
  },
})
export class AdminPageComponent implements OnInit, AfterViewInit {
  items: MenuItem[];
  visibleSidebar1: boolean;
  isHamburguer = true;
  userName: string;
  @Input() depth: number;
  myDiv: any;
  menuState: string = "out";

  private renderer: Renderer2;
  @ViewChild("appDrawer") appDrawer: boolean;
  @ViewChild(SidenavComponent) sidenav;
  screenHeight: number;
  screenWidth: number;
  constructor(
    private router: Router,
    private navlinkservice: NavlinksService,
    private navService: NavService,
    private userService: UserauthService,
    private title : Title
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
    }

    this.onResize();
  }
  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
    /*  console.log(this.screenWidth); */
    if (window.innerWidth <= 768 && this.myDiv != "dropdown") {
      this.menuState = "in";
      console.log("hello conp");
      this.isHamburguer = true;
    } else if (window.innerWidth <= 768 && this.myDiv === "dropdown") {
      this.menuState = "out";
      console.log("hello moppo");
      this.myDiv = null;
      console.log(this.myDiv, "asdasd");
    } else if (window.innerWidth >= 768) {
      this.menuState = "out";
    } else if (window.innerWidth <= 768) {
      this.menuState = "in";
      this.isHamburguer = true;
    }
  }
  navbarOpen = false;
  sidebarOpen = true;
  public links = [];
  expanded: boolean;

  ngOnInit() {
    this.getLinks();
    
    this.title.setTitle('CR-PL - Admin Page')
  }

  ngAfterViewInit() {
    // this.navService.appDrawer = this.appDrawer;
    // console.log(this.navService.appDrawer);
  }
  // outsideClick()
  // {
  //   this.menuState = 'in'
  //   console.log("side out");

  //  // this.sidebarOpen = !this.sidebarOpen;
  // }

  /* onItemClick($event)
{
  console.log($event);
  this.expanded = !this.expanded;

 } */
  // <div class="sidenav">
  // <app-sidenav *ngFor="let item of links" [item]="item"></app-sidenav>
  // </div>
  getLinks() {
    this.userName = sessionStorage.getItem("username");
    var data = sessionStorage.getItem("menuitem");
    console.log(JSON.parse(data));

    this.links = JSON.parse(data);
    // this.navlinkservice
    //   .getLinks()
    //   .subscribe(res => {
    //     console.log("Eae", res);
    //     this.links = res;
    //   });
  }
  receiveMessage(event: string) {
    console.log(event);
    this.myDiv = event;

    //this.sidebarOpen = $event;
  }
  toggleNavbar($event) {
    $event.stopPropagation();

    this.menuState = this.menuState === "out" ? "in" : "out";
    this.sidebarOpen = !this.sidebarOpen;
    this.isHamburguer = !this.isHamburguer;
  }

  logout() {
    var data = sessionStorage.getItem("username");
    this.userService.userLogout(data).subscribe(
      (res) => {
        console.log(res);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("menuitem");
        this.router.navigateByUrl("");
      },
      (error) => {
        console.log("Logout Not Working", error);
      }
    );
    // remove user from local storage to log user out

    //this.currentUserSubject.next(null);
  }
  adminpage() {
    this.router.navigateByUrl("adminpage"); 
    
    this.title.setTitle('CR-PL - Admin Page')
  }
}
