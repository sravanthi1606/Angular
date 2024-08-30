import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, Input, Pipe } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { pipe } from 'rxjs';

@Component({
  standalone:true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports:[UpperCasePipe,CurrencyPipe]
})
export class ProfileComponent {
  @Input() currentUser:any;
 
  constructor(public modalRef: NgbActiveModal) {}
  ngOnInit(){
    console.log(this.currentUser,'user');
    
  }
}
