import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss'
})
export class BookingFormComponent {
  //  @Input() room: any; // Receive room object as input
  selectedDate: Date | null = null;
  roomId: any;
  userId: string = '';
  bookingForm!: FormGroup;
  totalPrice: number = 0;
  bookedDates: Date[] = [];
  bookings:any[] = [];
  constructor(private fb: FormBuilder, private bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required]
    });
    console.log(JSON.parse(localStorage.getItem('user') || '')._id);
    this.userId = JSON.parse(localStorage.getItem('user') || '')._id;
    this.roomId = localStorage.getItem('roomId');

     this.bookingService.getBookedDates(this.roomId).subscribe((bookings: any) => {
      console.log('booking: ', bookings);
    });
  }


  bookRoom() {
    const payload = {
      roomId: this.roomId,
      ...this.bookingForm.value,
      // userId: this.userId,
      totalPrice: 1234
    };
    console.log('payload: ', payload);
    this.bookingService.createBooking(
      payload.roomId,
      payload.checkInDate,
      payload.checkOutDate,
      payload.totalPrice).subscribe(result => {
        console.log(result);
      })
  }


}
