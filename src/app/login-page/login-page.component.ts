import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { UserauthService } from "../userauth.service";
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PushNotificationService} from '../push-notification.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  spinnerIcon: boolean;
  constructor(
    private messageService: MessageService,
    private router: Router,
    private authService: UserauthService,
    private http:HttpClient,
    private _notificationService: PushNotificationService,
    private title : Title
  ) {
    this._notificationService.requestPermission();
    this.title.setTitle('CR-PL - Login page')
  }

  userName:string;
  password:string;
  showProgress = false;

  ipAddress: '';
  ngOnInit() {
    //this.getIPAddress();
  
  }
getNotifications(){
  let data: Array < any >= [];
  data.push({
      'title': 'Approval',
      'alertContent': 'This is First Alert -- By Debasis Saha'
  });
  navigator.serviceWorker.register('../../sw.js');
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Notification with ServiceWorker');
      });
    }
  });
  this._notificationService.getNotification(data);
}



     loginUser() {
       this.spinnerIcon = true;
    this.authService.userAuth(this.userName, this.password).pipe(first()).subscribe(res => {
        this.spinnerIcon = false;
      console.log(res,"Complete response");
      if (res.code == "-1") {

        this.messageService.add({
          severity: "error",
          summary: "Login Failed",
          detail: "Invalid User ID and Password"
        });

      }

       else if(res.code == "00") {
        //this.getNotifications();
        this.messageService.add({
          severity: "success",
          summary: "Login Successfully",
          detail: "Welcome " + this.userName + "!"
        });
        this.showProgress = true;
     sessionStorage.setItem('token', res.accessToken);
     sessionStorage.setItem('username', this.userName);
     sessionStorage.setItem('menuitem' , res.detailData.detail)
     var name = 'usama';
     localStorage.setItem('name',name);
         setTimeout(() => {
           this.router.navigateByUrl("/adminpage");
        }, 1000);
      }
      else if(res.code == "03")
      {
        this.messageService.add({
          severity: "error",
          summary: "Status",
          detail: res.description
        });
      }
    },
    (error)=> {
      this.messageService.add({
        severity: "error",
        summary: "Login Failed",
        detail: "Connection Timed Out"
      });
    });
  }
  changePassword() {

    this.router.navigateByUrl("/changepassword");
  }
/*   getIPAddress()
  {

    this.http.get("http://localhost:4200").subscribe((res:any)=>{
      this.ipAddress = res.ip;
    });
  } */
}
