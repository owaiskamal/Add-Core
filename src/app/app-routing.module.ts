import { FrmlistComponent } from './setup/frmlist/frmlist.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ChangePasswordPageComponent } from './change-password-page/change-password-page.component';

import { AdminPageComponent } from './menu-page/menu-page.component';

import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { LoginSecuritiesPageComponent } from './login-securities-page/login-securities-page.component';
import { AuthGuard } from './auth.guard';
import { ObjectFormComponent } from './object-form/object-form.component';
import { FormTemplateComponent } from './form-template/form-template.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { TemplateCreatorComponent } from './template-creator/template-creator.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { FrmCreateTransComponent } from './frm-create-trans/frm-create-trans.component';
import { FrmTransStageComponent } from './frm-trans-stage/frm-trans-stage.component';
import { FrmBulkTransComponent } from './frm-bulk-trans/frm-bulk-trans.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FrmCbsPostingComponent } from './frm-cbs-posting/frm-cbs-posting.component';
import { FrmAccountStatementComponent } from './frm-account-statement/frm-account-statement.component';
import { FrmTransStatusComponent } from './frm-trans-status/frm-trans-status.component';
//import { SearchTableComponent } from './search-table/search-table.component';





const routes: Routes = [
  {path: 'changepassword',component:ChangePasswordPageComponent},
  {path: '', component:LoginPageComponent},


{path:'menu', component: AppLayoutComponent, canActivate : [AuthGuard],

  children:
  [
    {path:'formtemplate',component:FormTemplateComponent , data : {state : 'menu/formtemplate'}},
    {path : 'resetpassword' , component : ResetPasswordPageComponent ,data : {state : 'menu/resetpassword'}},
    {path:'templatecreator',component: TemplateCreatorComponent ,data : {state : 'menu/templatecreator'}},
    {path:'List',component:DragDropComponent,data : {state : 'menu/List'}},
    //{path: 'searchtable',component:SearchTableComponent,data : {state : 'admimpage/searchtable'}},
    //{path: 'searchtable/:id',component:SearchTableComponent,data : {state : 'admimpage/searchtable'}}
     {path:'List/:id',component:FrmlistComponent,data : {state : 'menu/setup/frmlist'}},
     {path:'frmCreateTrans/:id' , component: FrmCreateTransComponent , data :{state : 'menu/frmCreateTrans'}},
     {path:'frmTransStage/:id' , component: FrmTransStageComponent , data :{state : 'menu/frmTransStage'}},
     {path:'frmUploadTrans/:id' , component: FrmBulkTransComponent , data :{state : 'menu/frmUploadTrans'}},
     {path:'frmBkofficPub/:id' , component: FrmCbsPostingComponent , data :{state : 'menu/frmBkofficPub'}},
     {path:'frmAccStatement/:id' , component: FrmAccountStatementComponent , data :{state : 'menu/frmAccStatement'}},
     {path:'frmTransStatus/:id' , component: FrmTransStatusComponent , data :{state : 'menu/frmTransStatus'}},
  ]

},
  {path: 'loginsettings' , component : LoginSecuritiesPageComponent,canActivate: [AuthGuard]},
 // {path: 'objectform' , component : ObjectFormComponent},
 { path: '**', component: PageNotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
