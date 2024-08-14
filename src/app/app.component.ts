import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeServiceService } from './services/employee-service.service';
import { SignUPComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { AddeditemployeeComponent } from './components/addeditemployee/addeditemployee.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone:true,
  styleUrls: ['./app.component.css'],
  providers: [EmployeeServiceService, NgbActiveModal],
  imports:[RouterModule]
  // imports:[
  //   SignUPComponent,
  //   HomeComponent,
  //   LoginComponent,
  //   EmployeeTableComponent,
  //   EmployeeDetailsComponent,
  //   AddeditemployeeComponent,
  //   NoPageFoundComponent,
  //   NavbarComponent
  // ]
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  public imgUrl = "https://static.vecteezy.com/system/resources/previews/008/214/517/non_2x/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg";

  constructor(private employeeService: EmployeeServiceService, private router: Router) { }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    this.handleLogout();
  }

  ngOnInit() {
    this.employeeService.initialSignUpData();
  }

  handleLogout() {
    this.employeeService.handleLogout();
    this.router.navigate(['/login'], { replaceUrl: true });
    history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      history.pushState(null, '', window.location.href);
    };
  }

}
