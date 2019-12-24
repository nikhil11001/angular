import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../employee.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [EmployeeService]
})

export class HomeComponent implements OnInit {
  empolyeeData: any;
  showModalFlag: boolean = false;
  isAllDataEntered: boolean = false;
  firstName: string = "";
  lastName: string = "";
  address: string = "";
  dateOfBirth: string = "";
  phoneNumber: string = "";
  city: string = "";
  emailId:string=""
  employeeId:any;

  user:any;
  id:any;
  disabledEmail:boolean=false;

  toogleModal() {
    this.showModalFlag = !this.showModalFlag;
    console.log(this.showModalFlag)
  }

  updateEmployeeData(obj) {
    console.log("obj-->", obj)
     this.disabledEmail=true; 
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.address = obj.address;
    this.dateOfBirth = obj.dateOfBirth;
    this.phoneNumber = obj.phoneNumber;
    this.city = obj.city;
    this.emailId=obj.emailId
    this.employeeId=obj.employeeId
    this.toogleModal()
  }


  deleteEmployeeData(obj) {
    this.employeeService.deleteEmployee(obj.employeeId).then(()=>{
      this.getAllEmployeeData();
    }).catch((error)=>{
      console.log(error)
    })
  }

  logout(){
    this.router.navigate(['/']);
    sessionStorage.clear();
  }

  addEmployee(form) {
    if (form.invalid) {
      this.isAllDataEntered =true ;
      console.log("isaAll 1",this.isAllDataEntered);
      return;
    } else {
      this.isAllDataEntered =false;
      console.log("isaAll 2",this.isAllDataEntered)
      form.value.userId=this.id

      if(this.employeeId!=null|| this.employeeId!=undefined){
        form.value.employeeId=this.employeeId;
        delete form.value["emailId"]
      }
      this.employeeService.addEmployeeData(form.value).then(() => {
        this.getAllEmployeeData();
      }).catch((error) => {
        console.log(error)
      })
      this.toogleModal();
    }
    console.log(form.value)
  }

  getAllEmployeeData() {
   this.user= JSON.parse(sessionStorage.getItem("user"));
   this.id=this.user.userId
    this.employeeService.getAllEmployeeData(this.id).then((data) => {
      this.empolyeeData = data;
    }).catch((error) => {
      console.error(error);
    })
  }

  constructor(private employeeService: EmployeeService,private router: Router) { }
  ngOnInit() {
    this.getAllEmployeeData();
  }

}
