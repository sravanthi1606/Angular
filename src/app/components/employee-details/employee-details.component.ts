import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
interface Employee {
	id: number;
	employee: string;
	technology: string[];
	experience: number;
	noticePeriod: number;
	verified: string;
}

interface EmployeeData {
	id: number;
	employee: string;
	mobileNumber: number;
	projectName: string;
	company: string;
	projectDescription: string;
	technology: string[];
	experience: number;
	noticePeriod: number;
	verified: string;
}


@Component({
	selector: 'app-employee-details',
	imports: [],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
  standalone:true,
	providers: [NgbModalConfig, NgbModal],
})
export class EmployeeDetailsComponent {
	@Input() employees!: EmployeeData;


	constructor(public activeModal: NgbActiveModal) { }

}