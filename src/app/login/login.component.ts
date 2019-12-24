import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from '../login.service';

@Component({
  selector: "app-login",
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [LoginService]
})

export class LoginComponent implements OnInit {
  userName: string = "";
  password: string = "";
  response: object = {};
  emailRegex: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showAlert:boolean=false;
  alertMsg:String="";
  checkEmailValdation() {
    return this.emailRegex.test(this.userName.toLowerCase());
  }

  userLogin(data) {
          this.showAlert=false  
      this.response = this.loginService.login(data.value)
      console.log("Response==>", this.response)
      this.loginService.login(data.value).then((data) => {
        sessionStorage.setItem("user", JSON.stringify(data));
        console.log("login response", data);
        this.response = data;
        this.router.navigate(['/home']);
      }).catch((error) => {
        console.error(error);
      })
    }
  



  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {

  }
}