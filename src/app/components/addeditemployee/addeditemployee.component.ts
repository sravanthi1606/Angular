import { Component, Output, ViewChild, EventEmitter, TemplateRef, inject, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDatepickerModule, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { LoginComponent } from '../login/login.component';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { Title } from '@angular/platform-browser';
import { RadioButtonModule } from 'primeng/radiobutton';

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
interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-addeditemployee',
  templateUrl: './addeditemployee.component.html',
  styleUrls: ['./addeditemployee.component.css'],
  standalone: true,
  imports: [FormsModule, NgbDatepickerModule, ReactiveFormsModule, CommonModule, MultiSelectModule, DropdownModule, TableModule, RadioButtonModule],
  providers: [NgbModalConfig, NgbModal],

})


export class AddeditemployeeComponent {

  constructor(public activeModal: NgbActiveModal, private empDetails: EmployeeServiceService) { }
  @Output() employeeAdded = new EventEmitter<any>();
  @Input() employee: any;
  @Input() technologName: string = ''
  @Input() technologies: string[] = [];
  techName: { name: string }[] = [];
  selectedtech: { name: string }[] = [];
  cities: City[] | undefined;
  addEditForm!: FormGroup
  projectDetails: any = []
  project: any = {
    title: '',
    description: ''

  }
  editMode: boolean = false;
  editProjectId: number | null = null;

  OnAddEditSubmit() {

    if (this.employee) {
      const editedEmp = {
        id: this.employee.id,
        employee: this.addEditForm.value.employee,
        mobileNumber: Number(this.addEditForm.value.mobileNumber),
        company: this.addEditForm.value.company,
        projectName: this.addEditForm.value.projectName,
        projectDescription: this.addEditForm.value.projectDescription,
        category: this.addEditForm.value.category,
        technology: this.addEditForm.value.technology.map((tech: any) => tech.name),
        experience: Number(this.addEditForm.value.experience),
        noticePeriod: Number(this.addEditForm.value.noticePeriod),
        verified: 'No',
      }
      console.log(editedEmp,'editedEmp');
      
      const updateEmp = { ...this.employee, ...editedEmp }
      this.empDetails.EditUpdateEmployee(updateEmp)
    }
    else {
      const newEmployee: any = {
        id: this.empDetails.getSingleEmpData().data.length + 1,
        employee: this.addEditForm.value.employee,
        mobileNumber: Number(this.addEditForm.value.mobileNumber),
        gender: this.addEditForm.value.gender,
        company: this.addEditForm.value.company,
        ProjectDetails: this.projectDetails,
        category: this.addEditForm.value.category,
        technology: this.addEditForm.value.technology.map((tech: any) => tech.name),
        experience: Number(this.addEditForm.value.experience),
        noticePeriod: Number(this.addEditForm.value.noticePeriod),
        verified: this.addEditForm.value.verified,
      }

      this.empDetails.addEmployee(newEmployee)

    }
    this.employeeAdded.emit(true);
    this.addEditForm.reset();

  }

  // ngOnInit() {
  //   this.addEditForm = new FormGroup({
  //     employee: new FormControl(this.employee ? this.employee.employee : null, [Validators.required, Validators.maxLength(10), Validators.minLength(4), Validators.pattern("^[a-zA-Z]+$")]),
  //     mobileNumber: new FormControl(this.employee ? this.employee.mobileNumber : null, [Validators.required, Validators.pattern("[0-9]{10}")]),
  //     gender : new FormControl(this.employee ? this.employee.gender : null, Validators.required),
  //     company: new FormControl(this.employee ? this.employee.company : null, Validators.required),
  //     projectName: new FormControl(this.employee ? this.employee.projectName : null, Validators.required),
  //     projectDescription: new FormControl(this.employee ? this.employee.projectDescription : null, Validators.required),
  //     category :new FormControl(this.employee ? this.employee.category : this.technologName),
  //     // technology: new FormControl(this.employee ? this.employee.technology : []),
  //     // technology: new FormControl(this.employee ? this.employee.technology : [], Validators.required),
  //     technology: new FormControl(this.employee ? this.employee.technology.map((tech : any) => ({ name: tech })) : []),
  //     experience: new FormControl(this.employee ? this.employee.experience : null, [Validators.required]),
  //     noticePeriod: new FormControl(this.employee ? this.employee.noticePeriod : null, Validators.required),
  //     verified: new FormControl(this.employee ? this.employee.verified : 'No',),

  //   })
  //   console.log(this.technologies, 'this.technologies in modal');
  //   console.log(this.technologName, 'this.technologName in modal');

  //   this.techName = this.technologies.map(tech => ({ name: tech }));

  //   if (this.employee) {
  //     console.log(this.techName);

  //     this.selectedtech = this.techName.filter(city => this.employee.technology.includes(city.name));
  //     console.log(this.selectedtech ,'this.selectedtech ');

  //     this.addEditForm.get('technology')?.setValue(this.selectedtech);
  //   }

  // }



  selectedCity: City | undefined;


  genderCategory: any[] = [
    { name: 'female', key: 'F' },
    { name: 'male', key: 'M' },
  ];

  ngOnInit() {

    this.addEditForm = new FormGroup({
      employee: new FormControl(this.employee ? this.employee.employee : null, [Validators.required, Validators.maxLength(10), Validators.minLength(4), Validators.pattern("^[a-zA-Z]+$")]),
      mobileNumber: new FormControl(this.employee ? this.employee.mobileNumber : null, [Validators.required, Validators.pattern("[0-9]{10}")]),
      gender: new FormControl(this.employee ? this.employee.gender : null, Validators.required),
      company: new FormControl(this.employee ? this.employee.company : null, Validators.required),
      projectName: new FormControl(this.employee ? this.employee.ProjectDetails.projectName : null, Validators.required),
      projectDescription: new FormControl(this.employee ? this.employee.ProjectDetails.projectDescription : null, Validators.required),
      category: new FormControl(this.employee ? this.employee.category : this.technologName, Validators.required),
      technology: new FormControl(this.employee ? []: [], Validators.required),
      // technology: new FormControl(this.employee ? this.employee.technology.map((tech: any) => ({ name: tech })) : [], Validators.required),
      experience: new FormControl(this.employee ? this.employee.experience : null, [Validators.required]),
      noticePeriod: new FormControl(this.employee ? this.employee.noticePeriod : null, Validators.required),
      verified: new FormControl(this.employee ? this.employee.verified : 'No'),
    });


    console.log(this.addEditForm.invalid ,'invalid');


    this.techName = this.technologies.map(tech => ({ name: tech }));

    if (this.employee) {
      this.projectDetails = this.employee.ProjectDetails;
      // this.techName = this.technologies.map(tech => ({ name: tech }));
      // // this.selectedtech = this.techName.filter(tech => this.employee.technology.includes(tech.name));
      // // this.addEditForm.get('technology')?.setValue(this.selectedtech);

      // this.selectedtech = this.employee.technologies; // Assuming technologies is an array of selected technology objects
      // this.addEditForm.patchValue({
      //   technology: this.selectedtech
      // });
    }

    

  }



  addProject() {
    if (this.editMode) {

      const index = this.projectDetails.findIndex((project: any) => project.id === this.editProjectId);
      if (index !== -1) {
        this.projectDetails[index] = { id: this.editProjectId, ...this.project };
      }
      console.log(this.projectDetails);

      this.editMode = false;
      this.editProjectId = null;
    }
    else {
      this.projectDetails.push({
        id: this.projectDetails.length + 1,
        ...this.project,

      });
      console.log(this.projectDetails, 'projetDetails length');
      console.log(this.addEditForm.invalid ,'invalid');
      


    }

    this.project = { title: '', description: '' };
    this.addEditForm.get('projectName')?.reset();
    this.addEditForm.get('projectDescription')?.reset();
    // this.addEditForm.get('projectName')?.invalid

    

   
  }




  deleteProject(id: number) {
    this.projectDetails = this.projectDetails.filter((project: any) => project.id !== id)
    console.log(this.projectDetails, 'data');
  }

  editProject(details: any) {
    this.editMode = true
    this.editProjectId = details.id;
    this.project = { title: details.title, description: details.description };
  }

}
