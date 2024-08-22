import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface Technology {
  id: number;
  technologyName: string;
  imgSrc: string;
  technologies: string[];
}
interface ProjectDetail {
  title: string;
  description: string;
}

interface Employee {
  id: number;
  employee: string;
  mobileNumber: number;
  gender:string,
  email:string,
  company: string;
  ProjectDetails:ProjectDetail[],
  technology: string[];
  experience: number;
  noticePeriod: number;
  verified: string;
}


@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  
  
  
    private LoginKey = 'SignUpCredentials'
    private employeesKey = 'employeesData';
    private currentUserKey: any = 'currentUser';
  
  
  
    constructor(private router : Router) {}
  
    initialSignUpData(){
  
      if (!localStorage.getItem(this.LoginKey)) {
        this.initializeSignUpcredentials();
      }
    }
    
    initalempData(){
      if (!localStorage.getItem(this.employeesKey)) {
        this.initializeEmployeeData();
      }
    }
  
    private initializeSignUpcredentials() {
      const credentials = [
        { username: 'rani', email: 'ranireddy@gmail.com', mobileNumber: 9876543210, password: '123@Sf',gender:'female' },
        { username: 'honey', email: 'honey@gmail.com', mobileNumber: 9826553513, password: '1@Honeys',gender:'female' },
      ];
      localStorage.setItem(this.LoginKey, JSON.stringify(credentials))
    }
  
    getCredentials() {
      const data = localStorage.getItem(this.LoginKey);
      if (data) {
        return { data: JSON.parse(data) };
      }
      return { data: [] };
    }
  
  
    addCredentials(credential: any) {
      const currentCredentials = this.getCredentials().data;
      console.log(currentCredentials, 'currentCredentials');
  
      currentCredentials.push(credential);
      localStorage.setItem(this.LoginKey, JSON.stringify(currentCredentials));
      console.log(' credential:', credential);
      console.log('Updated credential list:', currentCredentials);
    }
  
    private initializeCurrentUsercredentials() {
      const credentials : any = [];
      localStorage.setItem(this.currentUserKey, JSON.stringify(credentials))
    }
    getCurrentUser() {
      const data = localStorage.getItem(this.currentUserKey);
      if (data) {
        return { data: JSON.parse(data) };
      }
      return { data: [] };
    }
  
    private initializeEmployeeData() {
      const initialData: Employee[] = [
        // {
        //   id: 1,
        //   employee: 'Rani',
        //   mobileNumber: 8976543216,
        //   gender:'female',
        //   company: 'abc',
        //   ProjectDetails :[
        //     { title: 'xyz',description: 'guqhrjh',}
        //   ],
         
        //   technology: ['Angular'],
        //   experience: 2,
        //   noticePeriod: 30,
        //   verified: 'No'
        // },
        // {
        //   id: 2,
        //   employee: 'Priya',
        //   mobileNumber: 8976543216,
        //   gender:'female',
        //   company: 'abc',
        //   ProjectDetails :[
        //     { title: 'xys',description: 'adada',}
        //   ],
        //   technology: ['React'],
        //   experience: 2,
        //   noticePeriod: 30,
        //   verified: 'No'
        // },
        // {
        //   id: 3,
        //   employee: 'Honey',
        //   mobileNumber: 8976543216,
        //   gender:'female',
        //   company: 'abc',
        //   ProjectDetails :[
        //     { title: 'Ayz',description: 'vcbb',}
        //   ],
        //   technology: ['Java'],
        //   experience: 2,
        //   noticePeriod: 30,
        //   verified: 'No'
        // }
      ];
      localStorage.setItem(this.employeesKey, JSON.stringify(initialData));
    }
  
    getData() {
      return {
        data: [
          {
            id: 1,
            technologyName: 'Frontend',
            category: 'Frontend',
            imgSrc: 'assets/frontened.jpeg',
            technologies: ['Angular', 'React', 'UI']
          },
          {
            id: 2,
            technologyName: 'Mern Stack',
            category: 'Mern Stack',
            imgSrc: 'assets/mernstack.png',
            technologies: ['React']
          },
          {
            id: 3,
            technologyName: 'Backend',
            category: 'Backend',
            imgSrc: 'assets/backened.jpeg',
            technologies: ['Dotnet']
          },
          {
            id: 4,
            technologyName: 'Full Stack',
            category: 'Full Stack',
            imgSrc: 'assets/fullstack.png',
            technologies: ['Java', 'Python']
          },
          {
            id: 5,
            technologyName: 'Angular',
            category: 'Frontend',
            imgSrc: 'assets/angular.jpeg',
            technologies: ['Angular']
          },
          {
            id: 6,
            technologyName: 'React',
            category: 'Frontend',
            imgSrc: 'assets/React.png',
            technologies: ['React']
          },
          {
            id: 7,
            technologyName: 'UI/UX',
            category: 'Frontend',
            imgSrc: 'assets/ui.jpeg',
            technologies: ['UI']
          },
          {
            id: 8,
            technologyName: 'Java',
            category: 'Full Stack',
            imgSrc: 'assets/java.jpeg',
            technologies: ['Java']
          }
        ]
      };
    }
  
    getSingleEmpData(): { data: Employee[] } {
      const data = localStorage.getItem(this.employeesKey);
      if (data) {
        return { data: JSON.parse(data) };
      }
      return { data: [] };
    }
  
    addEmployee(employee: Employee) {
      const currentData = this.getSingleEmpData().data;
      currentData.push(employee);
      localStorage.setItem(this.employeesKey, JSON.stringify(currentData));
      console.log('Employee added:', employee);
      console.log('Updated employee list:', currentData);
    }
  
    deleteEmployee(id: number) {
      const currentData = this.getSingleEmpData().data;
      const updatedData = currentData.filter(employee => employee.id !== id);
      localStorage.setItem(this.employeesKey, JSON.stringify(updatedData));
      console.log('Updated employee list:', updatedData);
    }
  
    EditUpdateEmployee(employee : any){
      console.log(employee)
      const currentData = this.getSingleEmpData().data;
      const Index = currentData.findIndex(employees => employees.id == employee.id);
      console.log(Index)
      currentData[Index] = employee;
      localStorage.setItem(this.employeesKey, JSON.stringify(currentData));
      console.log('Updated employee list:', currentData);
    }
  
  
    addcurrentUserCredentials(credential: any) {
      let curretUser = this.getCurrentUser().data;
      console.log(curretUser, 'currentCredentials');
  
      if (!Array.isArray(curretUser)) {
        curretUser = [];
      }
  
      curretUser.push(credential);
      localStorage.setItem(this.currentUserKey, JSON.stringify(curretUser));
      console.log(' credential:', credential);
      console.log('Updated credential list:', curretUser);
    }
  
    handleLogout() {
      localStorage.removeItem(this.currentUserKey)
      this.router.navigate(['/login']);
      // localStorage.removeItem(this.employeesKey)
  
    }
  
  
    
  
}
  
  



