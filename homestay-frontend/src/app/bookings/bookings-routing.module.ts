import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovedRoomComponent } from './approved-room/approved-room.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { authGuard } from '../shared/auth.guard';

const routes: Routes = [
  {path: '', component: ApprovedRoomComponent},
  {path: 'book-room', component: BookingFormComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsRoutingModule { }
