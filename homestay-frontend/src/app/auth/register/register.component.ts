import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    // private authService: AuthService,
    // private formbuilder: FormBuilder,
    private router: Router
  ) { }
  authService = inject(AuthService)
  // role = this.authService.role
  formbuilder = inject(FormBuilder);
  registrationForm = this.formbuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(5)]]
  })

  register() {
    console.log(localStorage.getItem('ownerreg'))
    let value = this.registrationForm.value;
    if (localStorage.getItem('ownerReg') == 'true') {
      this.authService.role = 'owner'
    }
    else {
      this.authService.role = 'user'
    }
    this.authService.register(value.name!, value.email!, value.password!,this.authService.role).subscribe((result: any) => {
        console.log('res in reg: ', result)
        alert(result.message);
        localStorage.removeItem('ownerReg');
        this.router.navigateByUrl("/auth/login");
      })

  }
}
