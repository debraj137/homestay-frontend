import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../booking.service';
import { RoomService } from '../../rooms/room.service';
import { Room } from '../../model/room';
import { Router } from '@angular/router';

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
  roomMaxGuests: number = 2;
  room!: Room
  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private roomService: RoomService,
    private router: Router) { }

  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem('user') || '')._id);
    this.userId = JSON.parse(localStorage.getItem('user') || '')._id;
    this.roomId = localStorage.getItem('roomId');
    this.roomService.getRoomById(this.roomId).subscribe((room: any) => {
      this.room = room;
      this.roomMaxGuests = room.maximumAllowedGuest || 2;
    })

    this.bookingForm = this.fb.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestCount: [1, [Validators.required, Validators.min(1), this.guestLimitValidator()]]
    });


    this.getBookedDates();

  }

  guestLimitValidator() {
    return (control: any) => {
      return control.value > this.roomMaxGuests
        ? { maxGuestsExceeded: true }
        : null;
    };
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
      userId: this.userId,
      totalPrice: 1234
    };
    console.log('payload: ', payload);
    this.bookingService.createBooking(
      payload.userId,
      payload.roomId,
      payload.checkInDate,
      payload.checkOutDate,
      payload.totalPrice,
      payload.guestCount,).subscribe(result => {
        console.log(result);
        alert('Booking Confirmed');
        this.router.navigateByUrl('/bookings/my-booking')
      },
        (err) => {
          console.error('Booking failed:', err);
          const errorMessage = err?.error?.message || 'Something went wrong. Please try again.';
          alert('❌ Booking Failed: ' + errorMessage);
        }
      )
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
  // filterDates = (date: Date | null): boolean => {
  //   if (!date) return true;
  //   // return !this.disabledDates.has(new Date(d.setHours(0, 0, 0, 0)).getTime());
  //   const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

  //   return !this.disabledDates.has(normalized);
  // };

  filterDates = (date: Date | null): boolean => {
    if (!date) return false;

    const today = new Date();
    const current = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const todayStripped = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

    const isPastDate = current < todayStripped;
    const isBookedDate = this.disabledDates.has(current);

    return !isPastDate && !isBookedDate;
  };


  dateClass = (date: Date): string => {
    const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    return this.disabledDates.has(normalizedDate) ? 'booked-date-tooltip' : '';
  };


}
