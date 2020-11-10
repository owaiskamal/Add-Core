import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import SampleJson from 'appsetting_config.json';
import { CookieService } from 'ngx-cookie-service';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { NavlinksService } from './menu-page/navlinks.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  /**
   *
   */
  sideMenu : boolean
  cookieString: string;
  constructor(private title : Title ,private primengConfig: PrimeNGConfig,
    private navlinkservice: NavlinksService ,   private cookieService : CookieService) {
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
     this.navlinkservice.setData(this.sideMenu)
   }

  }
  ngOnInit() {
    this.primengConfig.ripple = true;
    
}



}
