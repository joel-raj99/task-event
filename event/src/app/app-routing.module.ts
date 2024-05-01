import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainUiComponent } from './main/main-ui/main-ui.component';
import { LoginpagesComponent } from './admin/loginpages/loginpages.component';
import { SignupComponent } from './admin/signup/signup.component';
import { AdminDashbaordComponent } from './admin/admin-dashbaord/admin-dashbaord.component';
import { CalenderComponent } from './admin/calender/calender.component';
import { CreateUserComponent } from './admin/create-user/create-user.component';
import { CreateTaskComponent } from './admin/create-task/create-task.component';
import { TaskviewerComponent } from './admin/taskviewer/taskviewer.component';
import { LoginComponent } from './employee/login/login.component';
import { TaskDashboardComponent } from './employee/task-dashboard/task-dashboard.component';

const routes: Routes = [
  {
    path: '', component: MainUiComponent
  },
  //router for admin in angular 16
  {
    path:"signup1",component:SignupComponent
  },
  {
    path:"login1",component:LoginpagesComponent
  },
  {
    path:"admin",component:AdminDashbaordComponent
  },

  {
    path:"calendar",component:CalenderComponent
  },
  {
    path:"create-user",component:CreateUserComponent
  },
  {
    path:"create-task",component:CreateTaskComponent
  },

  {
    path:"taskviewer",component:TaskviewerComponent
  },
  //router for user in angular 16
  {
    path:"login",component:LoginComponent
  },
  {
    path:"task1",component:TaskDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
