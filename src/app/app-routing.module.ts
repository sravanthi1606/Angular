import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUPComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signUp',
        component: SignUPComponent
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'profile',
        component: EmployeeDetailsComponent
    },
    {
        // path: 'employeeTable/:technology',
        path: 'home/:technologyName',
        component: EmployeeTableComponent
    },
    {
        path: '**',
        component: NoPageFoundComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
