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




const routes: Routes = [
  {path: 'changepassword',component:ChangePasswordPageComponent},
  {path: '', component:LoginPageComponent},

{path:'adminpage', component: AppLayoutComponent,
  children:
  [
    {path:'formtemplate',component:FormTemplateComponent},
    {path : 'resetpassword' , component : ResetPasswordPageComponent},
    {path:'templatecreator',component: TemplateCreatorComponent},
    {path:'dragdrop',component:DragDropComponent}
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
