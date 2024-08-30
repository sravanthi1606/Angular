import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router} from '@angular/router';
import {  NgClass } from '@angular/common';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbDropdownModule, NgClass],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public imgUrl = "https://static.vecteezy.com/system/resources/previews/008/214/517/non_2x/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg";

  currentUser: any;
  isOpen = false;

  constructor(private employeeService: EmployeeServiceService, private router: Router,
    private modalService: NgbModal,private elementRef: ElementRef) { }

  
  ngOnInit() {
    this.currentUser = this.employeeService.getCurrentUser().data
  }
  


  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  handleLogout() {
    this.employeeService.handleLogout()
    this.isOpen = false;
  }

  naviagteProfile(){
    const modalRef = this.modalService.open(ProfileComponent);
    modalRef.componentInstance.currentUser = this.currentUser;
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  
}

