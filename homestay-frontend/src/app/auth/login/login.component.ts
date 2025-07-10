import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {

  }
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router)
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  login() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!).subscribe((result: any) => {
      console.log(result);
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      let userData = localStorage.getItem("user");
      console.log('userData in login comp: ', userData);
      console.log('role: ',JSON.parse(userData || '').role)
      let role = JSON.parse(userData || '').role;
      // if(role == 'user'){
      //   this.router.navigateByUrl("/bookings")
      // }
      // else{
        this.router.navigateByUrl("/")
      // }
      
    })

  }
}
