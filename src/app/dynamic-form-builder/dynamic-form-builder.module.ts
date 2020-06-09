import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// components
import { DynamicFormBuilderComponent } from './dynamic-form-builder.component';
import { FieldBuilderComponent } from './field-builder/field-builder.component';
import { TextBoxComponent } from './atoms/textbox';
import { DropDownComponent } from './atoms/dropdown';
import { FileComponent } from './atoms/file';
import { CheckBoxComponent } from './atoms/checkbox';
import { RadioComponent } from './atoms/radio';
import {FileUploadModule} from 'primeng/fileupload';
import {TextBoxComponentNum} from './atoms/textboxnum'
import {CalendarModule} from 'primeng/calendar';
import {DatePickerComponent} from './atoms/datapicker'
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FileUploadModule,
    CalendarModule,
    InputNumberModule,
    InputTextModule,
    TabViewModule
  ],
  declarations: [
    DynamicFormBuilderComponent,
    FieldBuilderComponent,
    TextBoxComponent,
    DropDownComponent,
    CheckBoxComponent,
    FileComponent,
    RadioComponent,
    TextBoxComponentNum,
    DatePickerComponent
  ],
  exports: [DynamicFormBuilderComponent],
  providers: []
})
export class DynamicFormBuilderModule { }
