import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

interface User {
  username: string;
  password: string;
}



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:true,
  styleUrls: ['./login.component.css'],
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
})
export class LoginComponent {

  constructor(private credentials: EmployeeServiceService,private router: Router) {}



  public imgUrl = "https://static.vecteezy.com/system/resources/previews/008/214/517/non_2x/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg";
  loginForm! : FormGroup
  public credentialData : User[] = [];
  public loginError: string | null = null;




  onSubmitLogin() {
    console.log(this.loginForm, 'submit');
    console.log(this.loginForm.value.username, 'userName');
    console.log(this.loginForm.value.password, 'password');
  
    const foundUser = this.credentialData.find((cre : any) => cre.username === this.loginForm.value.username);
    console.log(foundUser,'foundUser');
    
    
  
    if (!foundUser) {
      this.loginForm.get('username')?.setErrors({ userNotFound: true });
    } else if (foundUser.password  !== this.loginForm.value.password) {
      this.loginForm.get('password')?.setErrors({ passwordMismatch: true });
    }
    else {
      console.log(foundUser, 'foundUser');
      this.loginForm.reset();
      this.credentials.initalempData();
      this.router.navigate(['/home'])
      this.credentials.addcurrentUserCredentials(foundUser)

    }    
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username : new FormControl(null,[Validators.required]),
      password : new FormControl(null,[Validators.required]),
    })
    this.getLoginCredentials();

  }

  getLoginCredentials() {
    this.credentialData = this.credentials.getCredentials().data;
    console.log(this.credentialData, 'this.credentialData');
  }
}





