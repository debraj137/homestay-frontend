import { Component } from '@angular/core';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.scss'
})
export class MyBookingComponent {
  bookings: any[] = [];
  constructor(private bookingService: BookingService){}
  ngOnInit(): void {
  this.bookingService.getUserBooking().subscribe({
    next: (res) => {
      this.bookings = res;
      console.log('Bookings:', this.bookings);
    },
    error: (err) => {
      console.error('Error fetching bookings:', err);
      alert('Failed to fetch bookings');
    }
  });
}
}
