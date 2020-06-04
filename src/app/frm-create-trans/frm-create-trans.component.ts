import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateTransService } from '../create-trans.service';

@Component({
  selector: 'app-frm-create-trans',
  templateUrl: './frm-create-trans.component.html',
  styleUrls: ['./frm-create-trans.component.scss']
})
export class FrmCreateTransComponent implements OnInit {
  formID: any;
  AccessToken: string;
  UserID: string;

  constructor(private _route : ActivatedRoute , private transService : CreateTransService) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.formID = params['id']
      console.log("URL id has changed")
      this.getTransCreation();
  });
  this.UserID = sessionStorage.getItem('username');
  this.AccessToken = sessionStorage.getItem('token');
  }
  getTransCreation() {
    this.transService.getCreateTransaction(this.formID , this.UserID , this.AccessToken ).subscribe(res =>{
      console.log('detail data' , res);

    })
  }

}
