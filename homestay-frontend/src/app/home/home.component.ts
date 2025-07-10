import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../bookings/booking.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router, private bookingService: BookingService){

  }
randomFunc(e:any){
  console.log(typeof e);
  // localStorage.setItem('city',e);
  this.bookingService.citySubject.next(e);
  debugger;
  console.log('clicked');
  this.router.navigateByUrl('/bookings')
}
}
