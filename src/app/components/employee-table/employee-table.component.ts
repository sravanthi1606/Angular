import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { AddeditemployeeComponent } from '../addeditemployee/addeditemployee.component';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule, RouterLink, EmployeeDetailsComponent, AddeditemployeeComponent],
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent {
  @Input() public shows: any
  @Output() back = new EventEmitter()

  @Input() public techs: string[] = [];

  @Input() public postTechnology: any = []

  @Input() public technologyName: string = ''

  public employeedata: any = []

  public mergedData: any = [];
  selectedEmployee: any


  constructor(private empData: EmployeeServiceService, private modalService: NgbModal, private route: ActivatedRoute) { }


  onBack() {
    this.back.emit();
  }



  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    const data = this.empData.getSingleEmpData();
    this.mergedData = data.data.filter((userObj: any) =>
      userObj.technology.find((item: any) => this.techs.includes(item)))

  }
  openAddEmpModal() {
    const modalRef = this.modalService.open(AddeditemployeeComponent, { size: 'lg', scrollable: false });
    modalRef.componentInstance.technologies = this.techs
    modalRef.componentInstance.technologName = this.technologyName
    modalRef.componentInstance.employeeAdded.subscribe(() => {
      this.getEmployees();
    });
  }
  employeeAdded(event: any) {
    this.getEmployees()
  }


  openEditEmpModal(employee: any) {
    const modalRef = this.modalService.open(AddeditemployeeComponent, { size: 'lg', scrollable: false });
    modalRef.componentInstance.employee = employee;
    modalRef.componentInstance.employeeAdded.subscribe(() => this.getEmployees());
  }


  openModal(employee: any) {
    const modalRef = this.modalService.open(EmployeeDetailsComponent);
    modalRef.componentInstance.employees = employee;
    console.log(employee.ProjectDetails,'table employee');
    
  }


  onDelete(id: number) {
    this.empData.deleteEmployee(id)
    this.getEmployees();
  }

}

