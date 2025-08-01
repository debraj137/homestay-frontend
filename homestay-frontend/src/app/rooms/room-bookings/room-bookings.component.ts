import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../bookings/booking.service';

@Component({
  selector: 'app-room-bookings',
  templateUrl: './room-bookings.component.html',
  styleUrl: './room-bookings.component.scss'
})
export class RoomBookingsComponent {
  roomId: string = '';
  bookings: any[] = [];
  constructor(private route: ActivatedRoute, private bookingService: BookingService) { }
  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('id') || '';
    this.bookingService.getOwnerBookings().subscribe((data) => {
      this.bookings = data.bookings.filter(
        (b: any) => b.roomId._id === this.roomId
      );
    });
  }
}
