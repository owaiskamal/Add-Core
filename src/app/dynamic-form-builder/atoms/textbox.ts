import { style } from '@angular/animations';
import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

// text,email,tel,textarea,password,
@Component({
  selector: "textbox",
  template: `
    <div [formGroup]="form">
      <!-- input class="form-control"  [id]="field?.name" [name]="field?.ColumnName" [formControlName]="field?.ColumnName" [placeholder]= "field.ColumnLabel"> -->
      <!-- <textarea *ngIf="field.multiline"  [class.is-invalid]="isDirty && !isValid" [formControlName]="field.name" [id]="field.name"
         class="form-control" [placeholder]="field.placeholder"></textarea> -->

      <input
        type="text"
        class="form-control"
        *ngIf="field.IsLookup == 'N'"
        style="font-weight:500;"
        [attr.maxLength]="field.MaxLeng"
        [formControlName]="field?.ColumnName"
        [placeholder]="field.ColumnLabel"
        pInputText
      />
      <!-- <select
      *ngIf="field.IsLookup == 'Y'"
        class="form-control"
        [id]="field?.ColumnName"
        [formControlName]="field?.ColumnName"
      >
        <option class="option_style" *ngFor="let opt of field.LookupVal.split('|')" [value]="opt">{{
          opt
        }}</option>
      </select>
       -->

      <p-dropdown *ngIf="field.IsLookup == 'Y'" [options]="array" [optionLabel]="array['value']"
        [id]="field?.ColumnName"
        [formControlName]="field?.ColumnName"
        [placeholder]="field.ColumnLabel"
      [showClear]="true">
    </p-dropdown>

    </div>
  `,
})
export class TextBoxComponent  {
  @Input() field: any = {};

  @Input() form: FormGroup;
  get isValid() {
    return this.form.controls[this.field.ColumnName].valid;
  }
  get isDirty() {
    return this.form.controls[this.field.ColumnName].dirty;
  }
  array :any  = {};
  testArray :any[] = []
  testObj : any = {};
  constructor() {

    setTimeout(() => {
      console.log(this.field , "ASdasdasdasdsdsdasdasdasdsvcxvxcv");
        if(this.field.IsLookup == 'Y'){
        var subMenu = this.field.LookupVal;
        console.log(this.field.LookupVal , "drop");

        //var array = [];
      //  this.array = subMenu.split('|');
      //   console.log(this.array , "dropdowns");

      const table =
      this.field.LookupVal.split('|') //["key:value","key:value"]
  .map(pair => pair.split("-"));

          console.log(table , "asdasdskda");


this.array = table.map((o) => ({
label : o[1],
value : o[0]
}))
      //console.log(results , "askjdaskhdakhweg");

        // this.array = this.field.LookupVal.split('|').map((o ) => ({
        //   label: o,
        //   value: o,
        // }))
         console.log(this.array, "arrat");

        }


    }, 1000);



  }
}
