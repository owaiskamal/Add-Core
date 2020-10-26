import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frm-cbs-posting',
  templateUrl: './frm-cbs-posting.component.html',
  styleUrls: ['./frm-cbs-posting.component.scss']
})
export class FrmCbsPostingComponent implements OnInit {
  fileActions: any;
  filesArray :any[]= [];
  constructor() { 
  this.filesArray = [
    { name: "Company Name", code: "DAYSWOOD" },
    { name: "File Name", code: "COC001.xlsx" },
    { name: "Total Transaction", code: "1" },
    { name: "Total Amount", code: "100000" },
  ]
    this.fileActions = [
      { name: "Authorize", code: "A" },
      { name: "Reject All", code: "R" },
      
    ];
  }

  ngOnInit(): void {
  }

}
