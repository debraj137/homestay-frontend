import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  user = {
    name: '',
    email: '',
    mobile: ''
  };

  booking = {
    roomName: 'Deluxe Suite',
    checkIn: '',
    checkOut: '',
    guestCount: 0,
    totalNights: 2,
    totalPrice: 3200
  };

  paymentMethod = 'card';
  constructor() { }
  ngOnInit(): void {
    console.log('roomDetails:', JSON.parse(localStorage.getItem('roomDetails') || ''))
    this.user.name = JSON.parse(localStorage.getItem('user') || '').name;
    this.user.email = JSON.parse(localStorage.getItem('user') || '').email;
    this.user.mobile = JSON.parse(localStorage.getItem('user') || '').mobileNumber;
    this.booking.roomName = JSON.parse(localStorage.getItem('roomDetails') || '').title;
    this.booking.checkIn = localStorage.getItem('checkInDate') || '';
    this.booking.checkOut = localStorage.getItem('checkOutDate') || '';
    this.booking.guestCount = parseInt(localStorage.getItem('guestCount') || '');
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
    console.log('price',JSON.parse(localStorage.getItem('roomDetails') || '').price);
    console.log('ttotal price: ',JSON.parse(localStorage.getItem('roomDetails') || '').price * numberOfNights);
    this.booking.totalPrice = JSON.parse(localStorage.getItem('roomDetails') || '').price * numberOfNights;
  }




  confirmBooking() {
    console.log('User:', this.user);
    console.log('Booking:', this.booking);
    console.log('Payment Method:', this.paymentMethod);
    alert('Booking Confirmed!');
  }
}
