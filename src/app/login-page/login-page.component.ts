import { Component, ElementRef, OnDestroy, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { UserauthService } from "../userauth.service";
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PushNotificationService} from '../push-notification.service';
import { Title } from '@angular/platform-browser';
import {ConfirmationService} from 'primeng/api';
import { animate, group, keyframes, style, transition, trigger } from '@angular/animations';
export type FadeState = 'visible' | 'hidden';
@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
  providers: [ConfirmationService],
  animations: [
    trigger('state', [
      transition('* => visible' ,
      [ group([

      animate(
        '1000ms',
        keyframes([
          style({ opacity: 0, easing: 'ease', offset: 0 }),
          style({ opacity: 1, easing: 'ease', offset: 0.5 }),
          style({ opacity: 1, easing: 'ease', offset: 1 })
        ])
      ),
      animate(
        '1000ms',
        keyframes([
          style({ visibility: 'visible', transform: 'scale3d(0.3, 0.3, 0.3)', easing: 'ease', offset: 0 }),
          style({ transform: 'scale3d(1, 1, 1)', easing: 'ease', offset: 1 })
        ])
      )
    ])
       ] )



    ])
  ]
})
export class LoginPageComponent implements OnInit , OnDestroy {
  state: FadeState;
  loginShow: boolean = true;
  spinnerIcon: boolean;
  passwordShow = false;
  constructor(
    private messageService: MessageService,
    private router: Router,
    private authService: UserauthService,
    private http:HttpClient,
    private _notificationService: PushNotificationService,
    private title : Title,
    private confirmationService : ConfirmationService,
    private userService : UserauthService,
    private elementRef: ElementRef
  ) {
    this._notificationService.requestPermission();
    this.title.setTitle('CR-PL - Login page')
  }
  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }
  userName:string;
  password:string;
  showProgress = false;
  position : string;

  ipAddress: '';
  ngOnInit() {
    this.state = "visible"
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
      console.log(res,"Complete response");
      if (res.code == "-1") {
          console.log(res);
          this.spinnerIcon = false;
        this.messageService.add({
          severity: "error",
          summary: "Login Failed",
          detail: "Invalid User ID and Password"
        });

      }

       else if(res.code == "00") {
        //this.getNotifications();
        this.spinnerIcon = false;

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
           this.router.navigateByUrl("/menu/Dashboard");
        }, 600);
      }
      else if(res.code == "03")
      {
        this.spinnerIcon = false;
        console.log(res.description);

        this.sessionLogout("top");
      }
    },
    (error)=> {
      this.spinnerIcon = false;
      console.log(error.name);

      this.messageService.add({
        severity: "error",
        summary: "Login Failed",
        detail: error.name
      });
    });
  }
  changePassword() {

    this.router.navigateByUrl("/changepassword");
  }
  showPassword()
  { console.log(this.passwordShow , "asdasdsad");

    this.passwordShow =! this.passwordShow;
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
