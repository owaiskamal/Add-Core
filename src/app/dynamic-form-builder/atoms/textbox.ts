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
        style="font-weight:500;"
        [attr.maxLength]="field.MaxLeng"
        [formControlName]="field?.ColumnName"
        [placeholder]="field.ColumnLabel"
        pInputText
      />
    </div>
  `,
})
export class TextBoxComponent {
  @Input() field: any = {};
  @Input() form: FormGroup;
  get isValid() {
    return this.form.controls[this.field.ColumnName].valid;
  }
  get isDirty() {
    return this.form.controls[this.field.ColumnName].dirty;
  }

  constructor() {}
}
