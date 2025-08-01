import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomListComponent } from './room-list/room-list.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { BookedRoomComponent } from './booked-room/booked-room.component';
import { RoomBookingsComponent } from './room-bookings/room-bookings.component';

const routes: Routes = [
  { path: '', component: RoomListComponent },
  { path: 'add-room', component: AddRoomComponent },
  { path: 'edit-room/:id', component: AddRoomComponent },
  { path: 'booked-room', component: BookedRoomComponent },
  { path: 'view-booking/:id', component: RoomBookingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
