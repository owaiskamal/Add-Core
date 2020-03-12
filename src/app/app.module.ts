import { LoginPageComponent } from "./login-page/login-page.component";
import { ChangePasswordPageComponent } from "./change-password-page/change-password-page.component";

import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { CardModule } from "primeng/card";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PanelModule } from "primeng/panel";
import { DropdownModule } from "primeng/dropdown";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CheckboxModule } from "primeng/checkbox";
import { PasswordModule } from "primeng/password";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { ResetPasswordPageComponent } from "./reset-password-page/reset-password-page.component";
import { LoginSecuritiesPageComponent } from "./login-securities-page/login-securities-page.component";
import { NoopInterceptor } from "./httpconfig.interceptor";
import { ObjectFormComponent } from "./object-form/object-form.component";
import { FormTemplateComponent } from "./form-template/form-template.component";
import { DynamicFormBuilderModule } from "./dynamic-form-builder/dynamic-form-builder.module";
import { FileUploadModule } from "primeng/fileupload";
import { AppLayoutComponent } from "./app-layout/app-layout.component";
import { TemplateCreatorComponent } from "./template-creator/template-creator.component";
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import {PickListModule} from 'primeng/picklist';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MegaMenuModule} from 'primeng/megamenu';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ChangePasswordPageComponent,
    AdminPageComponent,
    ResetPasswordPageComponent,
    LoginSecuritiesPageComponent,
    ObjectFormComponent,
    FormTemplateComponent,
    AppLayoutComponent,
    TemplateCreatorComponent,
    DragDropComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    DialogModule,
    CardModule,
    FormsModule,
    PanelModule,
    DropdownModule,
    ToastModule,
    BrowserAnimationsModule,
    PasswordModule,
    DynamicFormBuilderModule,
    CheckboxModule,
    HttpClientModule,
    ReactiveFormsModule,
    FileUploadModule,
    MessageModule,
    MessagesModule,
    PickListModule,
    MegaMenuModule
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoopInterceptor,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
