
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EmployeeTableComponent } from '../employee-table/employee-table.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { AddeditemployeeComponent } from '../addeditemployee/addeditemployee.component';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule, EmployeeTableComponent, AddeditemployeeComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  public technologie: any = []
  public show: boolean = false
  public tech: string[] = [];
  public category:string =''

  showTable(x: any) {
    this.show = true;
    this.tech = x.technologies
    console.log(this.tech,'this.tech');

    this.category = x.technologyName
    // this.router.navigate(['/home', x.technologyName]);
  }
  onBack() {
    this.show = false;
  }

  constructor(private employeeService: EmployeeServiceService, private router: Router) {
  }

  ngOnInit() {
    this.getTechnologies()
    
  }

  getTechnologies() {
    this.technologie = this.employeeService.getData().data
    // console.log(this.technologie, 'techs');
  }

}
