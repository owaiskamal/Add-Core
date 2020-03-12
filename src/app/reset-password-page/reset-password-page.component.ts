import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss']
})
export class ResetPasswordPageComponent implements OnInit {

  constructor(private messageService : MessageService , private route : Router , private _location : Location) { }

  userName : String ="";
  checked : Boolean =  false;
  password : String ="";
  cPassword : String = "";
  ngOnInit() {
  }
  autoGen()
  {

    if(this.checked === true)
    {
      
      this.password = "CR-PL123"
      this.cPassword = "CR-PL123"
    }
    else if(this.checked === false)
    {
      this.password = "";
    this.cPassword = "";
    }
    
  }
  resetPassword()
  {
    this.messageService.add
    ({
      severity:'success',
      summary:'Reset Successfully',
      detail: 'Password has been reset '
    });
    this.resetform();
  }
  resetform()
  {
    this.checked= false;
    this.userName = "";
    this.password = "";
    this.cPassword = "";
  }
  backToMainScreen()
  {
   this._location.back();
  }

}
