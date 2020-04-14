import { FrmlistComponent } from './setup/frmlist/frmlist.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ChangePasswordPageComponent } from './change-password-page/change-password-page.component';

import { AdminPageComponent } from './admin-page/admin-page.component';

import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { LoginSecuritiesPageComponent } from './login-securities-page/login-securities-page.component';
import { AuthGuard } from './auth.guard';
import { ObjectFormComponent } from './object-form/object-form.component';
import { FormTemplateComponent } from './form-template/form-template.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { TemplateCreatorComponent } from './template-creator/template-creator.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
//import { SearchTableComponent } from './search-table/search-table.component';





const routes: Routes = [
  {path: 'changepassword',component:ChangePasswordPageComponent},
  {path: '', component:LoginPageComponent},
 
{path:'adminpage', component: AppLayoutComponent, canActivate : [AuthGuard],

  children:
  [
    {path:'formtemplate',component:FormTemplateComponent , data : {state : 'admimpage/formtemplate'}},
    {path : 'resetpassword' , component : ResetPasswordPageComponent ,data : {state : 'admimpage/resetpassword'}},
    {path:'templatecreator',component: TemplateCreatorComponent ,data : {state : 'admimpage/templatecreator'}},
    {path:'List',component:DragDropComponent,data : {state : 'admimpage/List'}},
    //{path: 'searchtable',component:SearchTableComponent,data : {state : 'admimpage/searchtable'}},
    //{path: 'searchtable/:id',component:SearchTableComponent,data : {state : 'admimpage/searchtable'}}
     {path:'List/:id',component:FrmlistComponent,data : {state : 'admimpage/setup/frmlist'}}
  ]
},
  {path: 'loginsettings' , component : LoginSecuritiesPageComponent,canActivate: [AuthGuard]},
 // {path: 'objectform' , component : ObjectFormComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
