import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-frm-trans-stage',
  templateUrl: './frm-trans-stage.component.html',
  styleUrls: ['./frm-trans-stage.component.scss']
})
export class FrmTransStageComponent implements OnInit {
  @ViewChild('op', { static: true }) opt: ElementRef;
  constructor(
    private _route: ActivatedRoute,
    private title: Title
  ) {
    this.cities = [
      {name: 'IFT_txtFile19.txt', code: 'NY'},
      {name: 'PAK-SUZUKI-10000-xlsx', code: 'RM'},
      {name: 'PSM09098097961.txt', code: 'LDN'},
      {name: 'PSM06098097961.txt', code: 'IST'},
      {name: 'PSM07898097961.txt', code: 'PRS'}
  ];
  }
  cities:any[] = []
  selectedCity: any;
  cities1: string
  visibleSidebar1;
  selectedCity1: any;
  ngOnInit(): void {
    var title1 =this._route.snapshot.paramMap.get('title')
      this.title.setTitle("CR-PL - " +title1);
  }
  selectedFile(event,element){
   element.hide();
    console.log("Selected file",event.value.name);
  }
}
