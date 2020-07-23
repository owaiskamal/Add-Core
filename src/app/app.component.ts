import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import SampleJson from 'appsetting_config.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   *
   */
  constructor(private title : Title) {

   // this.title.setTitle( SampleJson.AppSettings[0].Title);

  }


}
