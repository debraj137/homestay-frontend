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
  bookings: any[] = [];
  disabledDates = new Set<number>();
  constructor(private fb: FormBuilder, private bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required]
    });
    console.log(JSON.parse(localStorage.getItem('user') || '')._id);
    this.userId = JSON.parse(localStorage.getItem('user') || '')._id;
    this.roomId = localStorage.getItem('roomId');

    this.getBookedDates();

  }


  private getBookedDates() {
    this.bookingService.getBookedDates(this.roomId).subscribe((bookings: any) => {
      console.log('booking: ', bookings);
      this.bookings = bookings;
      this.populateDisabledDates();
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
        alert('Booking Confirmed')
      })
  }

  //  populateDisabledDates() {
  //   this.disabledDates.clear(); // Reset previous data

  //   for (const booking of this.bookings) {
  //     const start = new Date(booking.checkInDate);
  //     const end = new Date(booking.checkOutDate);

  //     let current = new Date(start);

  //     while (current <= end) {
  //       const strippedDate = new Date(current.getFullYear(), current.getMonth(), current.getDate()).getTime();
  //       this.disabledDates.add(strippedDate);
  //       current.setDate(current.getDate() + 1);
  //     }
  //   }

  //   console.log('📛 Disabled Dates:', Array.from(this.disabledDates).map(t => new Date(t).toDateString()));
  // }

  populateDisabledDates() {
    this.disabledDates.clear(); // Reset previous data

    for (const booking of this.bookings) {
      const start = new Date(booking.checkInDate);
      const end = new Date(booking.checkOutDate);

      for (
        let d = new Date(start);
        d <= end;
        d.setDate(d.getDate() + 1)
      ) {
        const strippedDate = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
        this.disabledDates.add(strippedDate);
      }
    }

    console.log(
      '📛 Disabled Dates:',
      Array.from(this.disabledDates).map(t => new Date(t).toDateString())
    );
  }



  // __define-ocg__ Disable specific booked dates
  filterDates = (date: Date | null): boolean => {
    if (!date) return true;
    // return !this.disabledDates.has(new Date(d.setHours(0, 0, 0, 0)).getTime());
    const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

    return !this.disabledDates.has(normalized);
  };


}
