import { Component } from '@angular/core';
import { BookingService } from '../../bookings/booking.service';

@Component({
  selector: 'app-booked-room',
  templateUrl: './booked-room.component.html',
  styleUrl: './booked-room.component.scss'
})
export class BookedRoomComponent {
  ownerRooms: any[] = [];
  bookings: any[] = [];
  selectedRoomId: string | null = null;
  constructor(private bookingService: BookingService) { }
  ngOnInit() {
    this.bookingService.getOwnerBookings().subscribe(res => {
      this.bookings = res.bookings;
      this.ownerRooms = res.ownerRooms;
    });

  }
  getBookingsForRoom(roomId: string) {
    return this.bookings.filter(b => b.roomId?._id === roomId);
  }

  selectRoom(id: string): void {
    this.selectedRoomId = id;
  }

  getFilteredBookings(): any[] {
    return this.bookings.filter(b => b.roomId._id === this.selectedRoomId);
  }
}
