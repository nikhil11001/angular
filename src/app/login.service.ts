import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  response: any;
  url: string = "";
  body: object = {}

  login(data) {
    this.url = "http://192.168.43.249:8080/manageemployeedetail/manager/login";
    this.body = {
      userName: data.userName,
      password: data.password
    }
   return this.http.post(this.url,this.body).toPromise().then((response) => {
      if (response != null) {
        console.log("res", response)
        return response;
      }
      else {
        console.log('Access Denied');
        return null;
      }
    });

    // return this.http.post(`http://192.168.43.249:8080/manageemployeedetail/manager/login`, {
    //   userName: data.userName, password: data.password
    // }).toPromise().then((response) => {
    //   if (response != null) {
    //     console.log("res", response)
    //     return response;
    //   }
    //   else {
    //     console.log('Access Denied');
    //     return null;
    //   }
    // });
  }
  constructor(private http: HttpClient) { }
}
