import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpagesComponent } from './admin/loginpages/loginpages.component';
import { CreateUserComponent } from './admin/create-user/create-user.component';
import { AdminDashbaordComponent } from './admin/admin-dashbaord/admin-dashbaord.component';
import { CalenderComponent } from './admin/calender/calender.component';
import { TaskviewerComponent } from './admin/taskviewer/taskviewer.component';
import { MainUiComponent } from './main/main-ui/main-ui.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './admin/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { CreateTaskComponent } from './admin/create-task/create-task.component';
import { LoginComponent } from './employee/login/login.component';
import { TaskDashboardComponent } from './employee/task-dashboard/task-dashboard.component';
import { DatePipe } from '@angular/common';
import { NavabarComponent } from './main/main-ui/navabar/navabar.component';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    AppComponent,
    LoginpagesComponent,
    CreateUserComponent,
    AdminDashbaordComponent,
    CalenderComponent,
    TaskviewerComponent,
    MainUiComponent,
    SignupComponent,
    NavbarComponent,
    CreateTaskComponent,
    LoginComponent,
    TaskDashboardComponent,
    NavabarComponent,
 
   
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule 
   
   
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
