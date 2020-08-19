import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { UserauthService } from "../userauth.service";
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PushNotificationService} from '../push-notification.service';
import { Title } from '@angular/platform-browser';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
  providers: [ConfirmationService]
})
export class LoginPageComponent implements OnInit {
  spinnerIcon: boolean;
  constructor(
    private messageService: MessageService,
    private router: Router,
    private authService: UserauthService,
    private http:HttpClient,
    private _notificationService: PushNotificationService,
    private title : Title,
    private confirmationService : ConfirmationService,
    private userService : UserauthService
  ) {
    this._notificationService.requestPermission();
    this.title.setTitle('CR-PL - Login page')
  }

  userName:string;
  password:string;
  showProgress = false;
  position : string;

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
          console.log(res);

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
        console.log(res.description);

        this.sessionLogout("top");
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

  sessionLogout(position: string)
  {
    this.position = position;
    this.confirmationService.confirm({
      message: 'Already Logged In, Are you sure you want to Logout from Session?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
    this.userService.userLogout(this.userName).subscribe(
      (res) => {
        this.messageService.add({
          severity: "success",
          summary: "Status",
          detail: "User Logout Successfully"
        });
        console.log(res);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("menuitem");

      },
      (error) => {
        console.log("Logout Not Working", error);
      }
    );

      },
      key : "positionDialog"
  });
  }
/*   getIPAddress()
  {

    this.http.get("http://localhost:4200").subscribe((res:any)=>{
      this.ipAddress = res.ip;
    });
  } */
}
