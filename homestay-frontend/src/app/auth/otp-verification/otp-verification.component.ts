import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.scss'
})
export class OtpVerificationComponent {
  constructor(private auth: AuthService, private router: Router) { }
  fb = inject(FormBuilder);
  otpForm = this.fb.group({
    emailOtp: ['', Validators.required],
    mobileOtp: ['', Validators.required],
  });

  verifyOtp() {
    const email = localStorage.getItem('verifyEmail')!;
    const mobile = localStorage.getItem('verifyMobile')!;
    const { emailOtp, mobileOtp } = this.otpForm.value;

    this.auth.verifyOtp(email, mobile, emailOtp!, mobileOtp!).subscribe((res: any) => {
      alert(res.message);
      if (res.success) {
        localStorage.removeItem('verifyEmail');
        localStorage.removeItem('verifyMobile');
        this.router.navigateByUrl("/auth/login");
      }
    });
  }
}
