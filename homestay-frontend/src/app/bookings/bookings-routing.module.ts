import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovedRoomComponent } from './approved-room/approved-room.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { authGuard } from '../shared/auth.guard';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';

const routes: Routes = [
  {path: '', component: ApprovedRoomComponent},
  {path: 'my-booking', component: MyBookingComponent, canActivate: [authGuard]},
  {path: 'book-room', component: BookingFormComponent, canActivate: [authGuard]},
  {path: 'room-detail', component: RoomDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsRoutingModule { }
