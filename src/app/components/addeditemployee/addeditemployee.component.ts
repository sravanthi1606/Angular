import { Component, Output, EventEmitter, TemplateRef, inject, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDatepickerModule, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';


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
  imports: [FormsModule, NgbDatepickerModule, ReactiveFormsModule, CommonModule, MultiSelectModule, DropdownModule, TableModule, RadioButtonModule,ToastModule,TooltipModule],
  providers: [NgbModalConfig, NgbModal,MessageService],

})


export class AddeditemployeeComponent {

  constructor(public activeModal: NgbActiveModal, private empDetails: EmployeeServiceService,	private messageService: MessageService,) { }
  @Output() employeeAdded = new EventEmitter<any>();
  @Input() employee: any;
  @Input() technologName: string = ''
  @Input() technologies: string[] = [];
  techName: { name: string }[] = [];
  selectedtech: { name: string }[] = [];
  cities: City[] | undefined;
  addEditForm!: FormGroup;
  projectDet!:FormGroup;
  projectDetails: any = []
  project: any = {
    title: '',
    description: ''

  }
  editMode: boolean = false;
  editProjectId: number | null = null;
  Toastify:any;
  selectedProject: any; 
  input : boolean = true;

  // showToast(message: string) {
  //   this.Toastify({
  //     text: message,
  //     duration: 3000, // Duration in milliseconds
  //     gravity: "top", // `top` or `bottom`
  //     position: "right", // `left`, `center` or `right`
  //     backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", // Background color
  //     stopOnFocus: true, // Prevents dismissal on hover
  //   }).showToast();
  // }

  get isVerifiedDisabled(): boolean {
    // Return true if `verified` is true, otherwise false
    return this.employee ? this.employee.verified : false;
  }

  OnAddEditSubmit() {

    if (this.isVerifiedDisabled) {
      this.addEditForm.value.verified = true;
    }

    if (this.employee) {
      const editedEmp = {
        id: this.employee.id,
        employee: this.addEditForm.value.employee,
        mobileNumber: Number(this.addEditForm.value.mobileNumber),
        gender : this.addEditForm.value.gender,
        email:this.addEditForm.value.email,
        company: this.addEditForm.value.company,
        // projectName: this.addEditForm.value.projectName,
        // projectDescription: this.addEditForm.value.projectDescription,
        category: this.addEditForm.value.category,
        technology: this.addEditForm.value.technology.map((tech: any) => tech.name),
        experience: Number(this.addEditForm.value.experience),
        noticePeriod: Number(this.addEditForm.value.noticePeriod),
        verified: this.addEditForm.value.verified,
        // verified: this.employee.verified === true ? true : this.addEditForm.value.verified,
      }
      console.log(editedEmp,'editedEmp');
      
      
      const updateEmp = { ...this.employee, ...editedEmp }
      this.empDetails.EditUpdateEmployee(updateEmp)
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated Employee' });
      console.log(this.messageService,'messageService');
      console.log( 'noticePeriod', Number(this.addEditForm.value.noticePeriod));
      
      
    }
    else {
      const newEmployee: any = {
        id: this.empDetails.getSingleEmpData().data.length + 1,
        employee: this.addEditForm.value.employee,
        mobileNumber: Number(this.addEditForm.value.mobileNumber),
        gender: this.addEditForm.value.gender,
        email:this.addEditForm.value.email,
        company: this.addEditForm.value.company,
        ProjectDetails: this.projectDetails,
        // category: this.addEditForm.value.category,
        technology :this.selectedtech.map((tech: any) => tech.name),
        // technology: this.addEditForm.value.technology.map((tech: any) => tech.name),
        experience: Number(this.addEditForm.value.experience),
        noticePeriod: Number(this.addEditForm.value.noticePeriod),
        verified: this.addEditForm.value.verified,
        // verified : 'false'
      }

      this.empDetails.addEmployee(newEmployee)
      console.log(this.addEditForm.value,'addEditForm');
      

    }
    this.employeeAdded.emit(true);
    this.addEditForm.reset();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add Employee' });
    console.log('submit');
    

  }


  OnProjectDetail(){
      console.log(this.projectDet,'projectDet');
      
  }


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
      email: new FormControl(this.employee ? this.employee.email : null ,[Validators.required,Validators.email]),
      company: new FormControl(this.employee ? this.employee.company : null, Validators.required),   
      // category: new FormControl(this.technologName, Validators.required),
      category : new FormControl(this.technologName),
      technology: new FormControl(this.employee ? this.techName: [], Validators.required),
      // technology: new FormControl(this.employee ? this.employee.technology.map((tech: any) => ({ name: tech })) : [], Validators.required),
      experience: new FormControl(this.employee ? this.employee.experience : null, [Validators.required]),
      noticePeriod: new FormControl(this.employee ? this.employee.noticePeriod : null, Validators.required),
      verified: new FormControl(this.employee ? this.employee.verified : false),
      // verified: new FormControl({
      //   value: this.employee ? this.employee.verified  : false,
      //   disabled: !this.employee.verified  // Initialize as disabled
      // })
    });



    this.projectDet = new FormGroup({
      projectName: new FormControl(this.employee ? this.employee.ProjectDetails.projectName : null,),
      projectDescription: new FormControl(this.employee ? this.employee.ProjectDetails.projectDescription : null,),
    })

    
    console.log(this.addEditForm.invalid ,'invalid');

    this.techName = this.technologies.map(tech => ({ name: tech }));
    if (this.employee) {
      this.projectDetails = this.employee.ProjectDetails;
      // this.techName = this.selectedtech
      this.techName = this.employee.technology.map((tech: any) => ({ name: tech }))
      this.selectedtech = this.techName;
      
      console.log(this.employee.technology,'this.employee.technology',this.techName,'this.techName');
      console.log(this.employee.verified,'this.employee.verified');

      if (this.employee.verified) {
        this.addEditForm.get('verified')?.disable();
      }
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
  }


  deleteProject(id: number) {
    this.projectDetails = this.projectDetails.filter((project: any) => project.id !== id)
    console.log(this.projectDetails, 'data');
  }

  editProject(details: any) {
    this.editMode = true
    this.editProjectId = details.id;
    // this.project = { title: details.title, description: details.description };

    this.selectedProject = details;
    this.projectDet.patchValue({
      projectName: details.title,
      projectDescription: details.description
    });
  }
  disabledDelete(id:number){
    return this.editProjectId === id
  }

  resetProjectForm() {
    this.projectDet.reset();
    this.editMode = false;
    this.selectedProject = null;
    this.editProjectId = null
  }

}
