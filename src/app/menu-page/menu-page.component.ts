import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Renderer2,
  OnDestroy,
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
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: "app-menu-page",
  templateUrl: "./menu-page.component.html",
  styleUrls: ["./menu-page.component.scss"],
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
      transition("in => out", animate("100ms ease-in-out")),
      transition("out => in", animate("100ms ease-in-out")),
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
export class AdminPageComponent implements OnInit, AfterViewInit ,OnDestroy {
  items: MenuItem[];
  visibleSidebar1: boolean;
  isHamburguer = true;
  userName: string;
  @Input() depth: number;
  myDiv: any;
  menuState: string = "in";
  selectedLink: any;
  mainLinks : any[] = [];
  sideMenu : boolean
  private renderer: Renderer2;
  @ViewChild("appDrawer") appDrawer: boolean;
  @ViewChild(SidenavComponent) sidenav;
  screenHeight: number;
  screenWidth: number;
  slinks: any[] =[];
  xlinks: any[] = [];
  cookieString: string;
  constructor(
    private router: Router,
    private navlinkservice: NavlinksService,
    private navService: NavService,
    private userService: UserauthService,
    private cookieService : CookieService,
    private title : Title,
    private elementRef : ElementRef
  ) {
  
    console.log(this.cookieString);
   
    if (this.depth === undefined) {
      this.depth = 0;
    }

    this.userName = sessionStorage.getItem("username");

    this.onResize();
  }
  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }
  @HostListener("window:resize")
  onResize() {
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

    this.title.setTitle('CR-PL - Menu Page')
    this.navlinkservice.currentData.subscribe(data => {
      console.log(data,"Dashboard compoennt");
      this.sideMenu = data
    });
  }
  filterUsers() {
    var x =[];
    console.log(this.selectedLink);

    if(this.selectedLink == "")
    {
      console.log("empty");


      this.links = this.mainLinks
    }
    // this.links = this.links.filter(
    //   item => item.Node.toLowerCase().includes(this.selectedLink.toLowerCase()));
    else{
         this.xlinks = this.mainLinks.filter(
      item => item.Node.toLowerCase().includes(this.selectedLink.toLowerCase()));

          if(this.xlinks.length == 0)
          {
            for (let index = 0; index < this.mainLinks.length; index++) {
              this.slinks = this.mainLinks[index]["Forms"].filter( items => items.Name.toLowerCase().includes(this.selectedLink.toLowerCase()))
               if(this.slinks.length > 0)
               {

                 x.push(...this.slinks);
                 console.log(x);

                 this.links = x

               }
          }
        }
          else
          {
            console.log(this.xlinks);

            this.links = this.xlinks
          }


    }
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

    this.mainLinks = JSON.parse(data);
    this.links = this.mainLinks;


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
  changeOpt(){
    console.log(this.sideMenu);
    
    // console.log(environment.sideMenu,"optcheck");

    console.log(this.sideMenu,"Menu page compoennt");
    
      this.navlinkservice.setData(this.sideMenu);
      if(this.sideMenu == true){
        this.cookieService.set('menuState',"sideTrue")
      }
      else if(this.sideMenu == false){
        this.cookieService.set('menuState',"sideFalse")
      }

 
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
  changeTitle()
{
  this.title.setTitle('CR-PL - Menu Page')
}
}
