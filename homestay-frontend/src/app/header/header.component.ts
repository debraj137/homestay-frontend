import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { BookingService } from '../bookings/booking.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMobileMenuOpen = false;
  constructor(
    public authService: AuthService,
    private router: Router,
    private bookingService: BookingService
  ){}
  logout(){
    this.authService.logout();
    this.router.navigateByUrl("/auth/login");
  }

  listProperty(){
    console.log('clicked')
    this.router.navigateByUrl('/auth/register');
    localStorage.setItem('ownerReg','true');
  }
  randomFunc(e:any){
  console.log(typeof e);
  // let city = localStorage.setItem('city',e);
  this.bookingService.citySubject.next(e);
  // debugger;
  console.log('clicked');
  this.router.navigateByUrl('/bookings')
}
}
