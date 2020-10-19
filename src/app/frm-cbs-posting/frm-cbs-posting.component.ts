import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frm-cbs-posting',
  templateUrl: './frm-cbs-posting.component.html',
  styleUrls: ['./frm-cbs-posting.component.scss']
})
export class FrmCbsPostingComponent implements OnInit {
  fileActions: any;
  constructor() { 

    this.fileActions = [
      { name: "Authorize", code: "A" },
      { name: "Reject All", code: "R" },
      { name: "Hold", code: "H" },
      { name: "Send to repair", code: "S" },
    ];
  }

  ngOnInit(): void {
  }

}
