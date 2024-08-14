import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @Input() currentUser:any;
 
  constructor(public modalRef: NgbActiveModal) {}
  ngOnInit(){
    console.log(this.currentUser,'user');
    
  }
}
