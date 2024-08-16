
import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';


interface User  {
  username: string,
  email:string,
  mobileNumber: number,
  password: string,
  gender:string
};

@Component({
  selector: 'app-sign-up',
  standalone:true,
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [RouterLink, FormsModule, CommonModule,ReactiveFormsModule],

})




export class SignUPComponent {
  signUpForm! : FormGroup
  signUpFormvalues = {
    password : '',
    confirmPassword : ''
  }
  
  passwordMismatch:boolean = false;
  public credentialData = [];
  // @Input() confirmPasswordInput : string;

  constructor(private credentials: EmployeeServiceService,private router: Router, private location: Location) {}



  onSubmitSignUP() {
    
    if (this.signUpForm.valid && this.isPasswordMatching) {
      const newUser : any= {
        username: this.signUpForm.value.username,
        email:this.signUpForm.value.email,
        mobileNumber: Number(this.signUpForm.value.mobilenumber),
        password: this.signUpForm.value.password,
        gender:this.signUpForm.value.gender
      };
      this.credentials.addCredentials(newUser)
       this.signUpForm.reset();

       this.router.navigate(['/login'])

      // this.router.navigate(['/login'],{replaceUrl:true});
      // this.location.replaceState('/login');
    }
  }



  duplicateUserNameValidator(control : FormControl): { [key: string]: boolean } | null {
    if(this.credentialData.some((cred : any) => cred.username === control.value)){
      return {'duplicateUserName' : true}
    }
    return null
  }


  duplicateEmailValidator(control: FormControl): { [key: string]: boolean } | null {
    if (this.credentialData.some((cred : any) => cred.email === control.value)) {
      return { 'duplicateEmail': true };
    }
    return null;
  }
  
  duplicateMobileValidator(control: FormControl): { [key: string]: boolean } | null {
    const isDuplicate = this.credentialData.some((cred : any) => cred.mobileNumber === control.value)
    
    if (isDuplicate) {
      return { 'duplicateMobile': true };
    }
    return null;
  }




  ngOnInit() {

    this.getLoginCredentials();
    
    this.signUpForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(4), Validators.pattern("^[a-zA-Z]+$"),this.duplicateUserNameValidator.bind(this)]),
      email: new FormControl(null, [Validators.required, Validators.email, this.duplicateEmailValidator.bind(this)]),
      mobilenumber: new FormControl(null, [Validators.required, Validators.pattern("[0-9]{10}"), this.duplicateMobileValidator.bind(this)]),
      gender : new FormControl(null),
      password: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-=[\\]{};:\'",.<>/?]).*$')]),
      confirmPassword: new FormControl(null, [Validators.required]),
    },
    );
  }
  

  getLoginCredentials() {
    this.credentialData = this.credentials.getCredentials().data;

  }
  isPasswordMatching:boolean = true
  passwordMatch(signUpForm:any){
    if(signUpForm.password == signUpForm.confirmPassword){
      this.isPasswordMatching = true
    }else {
      this.isPasswordMatching = false
    }
  }

  navigateLogin(){
    this.router.navigate(['login'])
  }


}

