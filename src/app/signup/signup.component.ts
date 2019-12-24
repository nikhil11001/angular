import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import{SignupService} from "../signup.service";

@Component({
    selector:"app-signup",
    templateUrl:'signup.component.html',
    styleUrls:['signup.component.css'],
    providers:[SignupService]
})

export class SignupComponent implements OnInit{
     firstName="";
     lastName="";
     emailId="";
     password="";
     dateOfBirth="";
     company="";
     address="";

    //  constructor(private router:Router){}
    constructor(private signupService:SignupService,private router:Router){}
    userSignup(frm){
        alert("signup")
        console.log(frm.value);
        this.signupService.signup(frm.value).then(()=>{
            this.router.navigate(['/']);
        }).catch((error)=>{
            console.log(error)
        })
    }   

    ngOnInit(){

    }
}
