import { Component, OnInit } from '@angular/core';
import { type } from './object-form.model';

@Component({
  selector: 'app-object-form',
  templateUrl: './object-form.component.html',
  styleUrls: ['./object-form.component.scss']
})
export class ObjectFormComponent implements OnInit {


  types : type [];
  selectedType: type;
  constructor() { 
    this.types = [
      { obj_type: 'varchar(40)'},
      { obj_type: 'number'}
     
  ];
  }

  ngOnInit() {
  }
 
}
