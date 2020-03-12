import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'anchor',
    template: `
    <div *ngFor="let opt of field.options">
         <a [routerLink]="opt.link" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle collapsed">
       <i class="pi pi-id-card"></i>{{opt.name}}</a>
    </div>  
    `
})
export class TextBoxComponent {
    @Input() field:any = {};
    
  
    constructor() {

    }
  }