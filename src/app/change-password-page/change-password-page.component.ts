import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html',
  styleUrls: ['./change-password-page.component.scss']
})
export class ChangePasswordPageComponent implements OnInit {
  
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;

  constructor(private messageService :  MessageService) { }

  ngOnInit() {
  }
 clear(){
   this.oldPassword = '';
   this.newPassword = '';
   this.confirmPassword = '';
 }
 updatePassword(){
  this.messageService.add
  ({
    severity:'success',
    summary:'Password updated Successfully',
    detail: 'Updated Password'
  });
 }
}
