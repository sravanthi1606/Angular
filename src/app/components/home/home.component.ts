
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EmployeeTableComponent } from '../employee-table/employee-table.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { AddeditemployeeComponent } from '../addeditemployee/addeditemployee.component';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule, EmployeeTableComponent, AddeditemployeeComponent,ConfirmDialogModule,ToastModule,CardModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ConfirmationService, MessageService]
})

export class HomeComponent {
  public technologie: any = []
  public show: boolean = false
  public tech: string[] = [];
  public category:string =''

  showTable(x: any) {
    this.show = true;
    this.tech = x.technologies
    this.category = x.technologyName
    // this.router.navigate(['/home', x.technologyName]);
  }
  onBack() {
    this.show = false;
  }

  constructor(private employeeService: EmployeeServiceService, private router: Router,private confirmationService: ConfirmationService, private messageService: MessageService) {
  }

  

  ngOnInit() {
    this.getTechnologies()
    
  }

  getTechnologies() {
    this.technologie = this.employeeService.getData().data
  }

//   confirm1() {
//     this.confirmationService.confirm({
//         message: 'Are you sure that you want to proceed?',
//         header: 'Confirmation',
//         icon: 'pi pi-exclamation-triangle',
//         accept: () => {
//             this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
//         },
//     });
// }


// confirm2() {
//   this.confirmationService.confirm({
//       message: 'Do you want to delete this record?',
//       header: 'Delete Confirmation',
//       icon: 'pi pi-info-circle',
//       accept: () => {
//           this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
//       },

//   });
// }

}
