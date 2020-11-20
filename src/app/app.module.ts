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
import { AdminPageComponent } from "./menu-page/menu-page.component";
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
import {ConfirmDialogModule} from 'primeng/confirmdialog';
//import { SearchTableComponent } from './search-table/search-table.component';
import { FrmlistComponent } from './setup/frmlist/frmlist.component';
import { FrmCreateTransComponent } from './frm-create-trans/frm-create-trans.component';
import {CalendarModule} from 'primeng/calendar';
import {TabViewModule} from 'primeng/tabview';
import {InputNumberModule} from 'primeng/inputnumber';
import { FrmTransStageComponent } from './frm-trans-stage/frm-trans-stage.component';
import {FieldsetModule} from 'primeng/fieldset';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {SidebarModule} from 'primeng/sidebar';
import {ListboxModule} from 'primeng/listbox';
import {RippleModule} from 'primeng/ripple';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {PaginatorModule} from 'primeng/paginator';
import {TooltipModule} from 'primeng/tooltip';
import {ToolbarModule} from 'primeng/toolbar';
import { FrmBulkTransComponent } from './frm-bulk-trans/frm-bulk-trans.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { FrmCbsPostingComponent } from './frm-cbs-posting/frm-cbs-posting.component';
import { FrmAccountStatementComponent } from './frm-account-statement/frm-account-statement.component';
import { FrmTransStatusComponent } from './frm-trans-status/frm-trans-status.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {GalleriaModule} from 'primeng/galleria';
import {InputSwitchModule} from 'primeng/inputswitch';
import { NgxCkeditorModule } from "ngx-ckeditor4";
import { FrmInstrumentSetupComponent } from './frm-instrument-setup/frm-instrument-setup.component';
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
    SidenavComponent,

    //SearchTableComponent,
    FrmlistComponent,
    FrmCreateTransComponent,
    FrmTransStageComponent,
    FrmBulkTransComponent,
    PageNotFoundComponent,
    FrmCbsPostingComponent,
    FrmAccountStatementComponent,
    FrmTransStatusComponent,
    DashboardComponent,
    FrmInstrumentSetupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    DialogModule,
    FieldsetModule,
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
    MegaMenuModule,
    ConfirmDialogModule,
    CalendarModule,
    TabViewModule,
    InputNumberModule,
    SidebarModule,
    OverlayPanelModule,
    ListboxModule,
    RippleModule,
    RadioButtonModule,
    InputTextareaModule,
    PaginatorModule,
    TooltipModule,
    ToolbarModule,
    ProgressSpinnerModule,
    GalleriaModule,
    InputSwitchModule,
    NgxCkeditorModule.forRoot({
      url: 'https://cdn.bootcss.com/ckeditor/4.11.3/ckeditor.js',
      config: {
        filebrowserUploadMethod: 'xhr',
        filebrowserUploadUrl: 'http://127.0.0.1:8000/index/index/uploads',
      },
    }),
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
