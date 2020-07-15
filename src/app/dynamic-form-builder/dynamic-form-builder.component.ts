import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  ControlContainer,
  FormGroupDirective,
} from "@angular/forms";
import { Subject } from "rxjs";
import { formatNumber, DatePipe } from '@angular/common';

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
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class DynamicFormBuilderComponent implements OnInit, OnChanges {
  @Output() onSubmit = new EventEmitter();
  @Output() savedata = new EventEmitter();
  @Input() fields: any[] = [];
  transFormData : any[]=[];
  valueDate : any = {};
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
      //  if (f.IsLookup != 'Y') {
        if(f.Mandatory === 'Y')
        {
      fieldsCtrls[f.ColumnName] = new FormControl(
        f.DefaultValue || "",
        Validators.required
      );
        }
        else{
          fieldsCtrls[f.ColumnName] = new FormControl(
            f.DefaultValue || ""
          );

        }
      console.log("data F ", f);

      // } else {
      //  var subMenu = f.LookupVal;
      //   console.log(f.LookupVal , "dadad");
        
      //   var array = [];
      //   array = subMenu.split('|');
      //   console.log(array , "this is splitted");
        
      //    let opts = {};
      //   for (let opt of array) {
      //     opts[opt.key] = new FormControl(opt.value);
      //   }
      //   fieldsCtrls[f.ColumnName] = new FormGroup(opts)
      // }
    }
    this.form = new FormGroup(fieldsCtrls);
  }
  saveData() {
    this.transFormData = [];
    this.transFormData.push(this.form.getRawValue());

    this.fields.forEach((user)=>{
      if(user.DataType == "D")
      {
        const name = user.ColumnName;
          console.log(name , "name");
          
        this.transFormData.forEach((t)=>{
          var formkey =Object.keys(t)
          var formValues = Object.values(t);
          formkey.forEach(element => {
            if(element == name)
            {
             var index =formkey.indexOf(name)
                console.log(index);

                var nDate= formValues[index];
                const pipe = new DatePipe("en-US");
                const fDate = pipe.transform(nDate, "dd/MM/yyyy");
                console.log(fDate , "date is ");
               
                this.valueDate = {
                  [name]: fDate
                };
                        

                
            }
          });
        
          
        })
        if (this.valueDate != null) {
          for (
            let i = 0;
            i < this.transFormData.length;
            i++
          ) {
            // console.log(merge(this.invoiceData[i] , this.valueDate));
            let foo = Object.assign(this.transFormData[i], this.valueDate);
            console.log(foo, "updated data");
          }
        }
        console.log(this.transFormData  , "UDatate Dadsd");

        
        
       }
     
    })
    this.savedata.emit(this.transFormData[0]);
    
    this.form.reset();
    
    //this.savedata.emit(this.form.getRawValue());

    //console.log("loggg" , this.form.getRawValue());
   
  }
}
