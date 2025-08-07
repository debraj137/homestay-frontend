import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  user = {
    id: '',
    name: '',
    email: '',
    mobile: ''
  };

  booking = {
    roomId: '',
    roomName: 'Deluxe Suite',
    checkIn: '',
    checkOut: '',
    // guestCount: 0,
    adultCount: 0,
    childCount: 0,
    totalNights: 0,
    totalPrice: 3200
  };

  paymentMethod = 'card';
  isLoading: boolean = false;
  constructor(private bookingService: BookingService, private router: Router, private snackBar: MatSnackBar) { }
  ngOnInit(): void {
    console.log('roomDetails:', JSON.parse(localStorage.getItem('roomDetails') || ''))
    this.user.id = JSON.parse(localStorage.getItem('user') || '')._id;
    this.user.name = JSON.parse(localStorage.getItem('user') || '').name;
    this.user.email = JSON.parse(localStorage.getItem('user') || '').email;
    this.user.mobile = JSON.parse(localStorage.getItem('user') || '').mobileNumber;
    this.booking.roomId = localStorage.getItem('roomId') || '';
    this.booking.roomName = JSON.parse(localStorage.getItem('roomDetails') || '').title;
    this.booking.checkIn = localStorage.getItem('checkInDate') || '';
    this.booking.checkOut = localStorage.getItem('checkOutDate') || '';
    // this.booking.guestCount = parseInt(localStorage.getItem('guestCount') || '');
    this.booking.adultCount = parseInt(localStorage.getItem('adultCount') || '0');
    this.booking.childCount = parseInt(localStorage.getItem('childCount') || '0');
    console.log('this.booking.adultCount: ',this.booking.adultCount);
    console.log('this.booking.childCount: ',this.booking.childCount);
    console.log('this.booking.checkIn: ', this.booking.checkIn)
    const checkInTimestamp = Number(this.booking.checkIn); // or parseInt()
    const checkOutTimestamp = Number(this.booking.checkOut);
    const checkIn = new Date(checkInTimestamp);
    const checkOut = new Date(checkOutTimestamp);
    checkIn.setHours(0, 0, 0, 0);
    checkOut.setHours(0, 0, 0, 0);

    const diffInMs = checkOut.getTime() - checkIn.getTime();
    const numberOfNights = diffInMs / (1000 * 60 * 60 * 24);
    console.log('Number of nights:', numberOfNights);
    this.booking.totalNights = numberOfNights;
    console.log('price', JSON.parse(localStorage.getItem('roomDetails') || '').price);
    console.log('ttotal price: ', JSON.parse(localStorage.getItem('roomDetails') || '').price * numberOfNights);
    this.booking.totalPrice = JSON.parse(localStorage.getItem('roomDetails') || '').price * numberOfNights;
  }




  confirmBooking() {
    this.isLoading = true;
    const payload = {
      userId: this.user.id,
      roomId: this.booking.roomId,
      // guestCount: this.booking.guestCount,
      numberOfAdults: this.booking.adultCount,
      numberOfChildren: this.booking.childCount,
      checkInDate: this.booking.checkIn,
      checkOutDate: this.booking.checkOut,
      totalPrice: this.booking.totalPrice,
      mobileNumber: this.user.mobile
    };
    console.log('payload: ', payload);
    this.bookingService.createBooking(
      payload.userId,
      payload.roomId,
      payload.checkInDate,
      payload.checkOutDate,
      payload.totalPrice,
      // payload.guestCount,
      payload.numberOfAdults,
      payload.numberOfChildren,
      payload.mobileNumber).subscribe(result => {
        this.isLoading = false;
        console.log(result);
        this.snackBar.open('Booking Confirmed!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.router.navigateByUrl('/bookings/my-booking')
      },
        (err) => {
          this.isLoading = false;
          console.error('Booking failed:', err);
          // if (!err.error.success) {
          //   this.bookingError = err.error;
          // }
        }
      )
  }
}
