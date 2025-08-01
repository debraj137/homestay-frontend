import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  guest = {
    name: '',
    email: '',
    mobile: ''
  };

  booking = {
    roomName: 'Deluxe Suite',
    checkIn: new Date(),
    checkOut: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
    totalNights: 2,
    totalPrice: 3200
  };

  paymentMethod = 'card';

  confirmBooking() {
    console.log('Guest:', this.guest);
    console.log('Booking:', this.booking);
    console.log('Payment Method:', this.paymentMethod);
    alert('Booking Confirmed!');
  }
}
