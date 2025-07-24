import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-all-booking',
  templateUrl: './all-booking.component.html',
  styleUrl: './all-booking.component.scss'
})
export class AllBookingComponent {
  bookings: any[] = [];
  constructor(private adminService: AdminService){}

  ngOnInit() {
     this.adminService.getAllBooking().subscribe(
      (res) => this.bookings = res,
      (err) => console.error('Failed to load bookings', err)
    );
  }
  
}
