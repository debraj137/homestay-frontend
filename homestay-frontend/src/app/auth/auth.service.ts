import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role = 'user'
  constructor(
    private http: HttpClient
  ) { }
  // http = inject(HttpClient)
  register(name:string,email:string,password:string, role: string){
    return this.http.post(environment.apiUrl + '/auth/register',{
      name, email, password, role
    })
  }

  login(email:string,password:string){
    return this.http.post(environment.apiUrl + '/auth/login',{
      email, password
    })
  }

  get isLoggedIn(){
    let token = localStorage.getItem("token");
    if(token){
      return true;
    }
    else{
      return false;
    }
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

   get isAdmin(){
    let userData = localStorage.getItem("user");
    // console.log('userData in authService: ',userData);
    if(userData){
      return JSON.parse(userData).role == 'admin';
    }
    return false;
  }

  get isOwner(){
    let userData = localStorage.getItem("user");
    console.log('userData in authService: ',userData);
    if(userData){
      return JSON.parse(userData).role == 'owner';
    }
    return false;
  }
}
