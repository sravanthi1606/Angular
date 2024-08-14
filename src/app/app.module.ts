import { NgModule, isStandalone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUPComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { AddeditemployeeComponent } from './components/addeditemployee/addeditemployee.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  // declarations: [
  //   AppComponent,
  //   SignUPComponent,
  //   HomeComponent,
  //   LoginComponent,
  //   EmployeeTableComponent,
  //   EmployeeDetailsComponent,
  //   AddeditemployeeComponent,
  //   NoPageFoundComponent,
  //   NavbarComponent
  // ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MultiSelectModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterOutlet,
    RouterLink,
    RouterModule
  ],
  providers: [NgModule],
  declarations: [
    ProfileComponent
  ],
  // bootstrap: [AppComponent]
})
export class AppModule { }
