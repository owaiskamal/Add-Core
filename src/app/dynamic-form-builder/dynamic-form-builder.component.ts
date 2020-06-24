import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";
import { FormGroup, FormControl, Validators, ControlContainer, FormGroupDirective } from "@angular/forms";
import { Subject } from "rxjs";

@Component({
  selector: "dynamic-form-builder",
  template: `
    <form [formGroup]="form">
      <div class="ui-g ui-fluid">
        <div *ngFor="let field of fields" class="ui-md-6 ui-sm-12">
          <field-builder [field]="field" [form]="form"></field-builder>
        </div>
      </div>
      <!-- <div class="ui-md-2">
   <button type="submit" (click)= "saveData()" pButton  label="Save"></button>
   </div> -->
    </form>
  `,
  viewProviders: [ { provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class DynamicFormBuilderComponent implements OnInit, OnChanges {
  @Output() onSubmit = new EventEmitter();
  @Output() savedata = new EventEmitter();
  @Input() fields: any[] = [];
  resetFormSubject: Subject<boolean> = new Subject<boolean>();
  form: FormGroup;
  constructor() {}

  ngOnInit() {
    // let fieldsCtrls = {};
    // for (let f of this.fields) {
    //   if (f.type != 'checkbox') {
    //     fieldsCtrls[f.name] = new FormControl(f.value || '', Validators.required)
    //   } else {
    //     let opts = {};
    //     for (let opt of f.options) {
    //       opts[opt.key] = new FormControl(opt.value);
    //     }
    //     fieldsCtrls[f.name] = new FormGroup(opts)
    //   }
    // }
    // this.form = new FormGroup(fieldsCtrls);
    // this.resetFormSubject.subscribe(res => {
    //   if(res){
    //   this.form.reset();
    //   console.log(res);
    //    // Or do whatever operations you need.
    //  }
    // })
  }
  resetChildForm() {
    this.resetFormSubject.next(true);
  }
  ngOnChanges() {
    let fieldsCtrls = {};
    for (let f of this.fields) {
      // if (f.IsLookup == 'checkbox') {
      fieldsCtrls[f.ColumnName] = new FormControl(
        f.DefaultValue || "",
        Validators.required
      );
      console.log("data F ", f);

      // } else {
      //   let opts = {};
      //   for (let opt of f.options) {
      //     opts[opt.key] = new FormControl(opt.value);
      //   }
      //   fieldsCtrls[f.ColumnName] = new FormGroup(opts)
      // }
    }
    this.form = new FormGroup(fieldsCtrls);
  }
  saveData() {
    this.savedata.emit(this.form.getRawValue());
    //console.log("loggg" , this.form.getRawValue());
    this.form.reset();
  }
}
