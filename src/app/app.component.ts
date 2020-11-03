import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import SampleJson from 'appsetting_config.json';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  /**
   *
   */
  constructor(private title : Title ,private primengConfig: PrimeNGConfig) {

   // this.title.setTitle( SampleJson.AppSettings[0].Title);

  }
  ngOnInit() {
    this.primengConfig.ripple = true;
    
}



}
