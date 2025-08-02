import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing.module';
import { ApprovedRoomComponent } from './approved-room/approved-room.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CheckoutComponent } from './checkout/checkout.component';
@NgModule({
  declarations: [
    ApprovedRoomComponent,
    BookingFormComponent,
    MyBookingComponent,
    RoomDetailComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatTooltipModule,
    DatePipe
  ]
})
export class BookingsModule { }
