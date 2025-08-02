import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookedRoomComponent } from './booked-room/booked-room.component';
import { RoomBookingsComponent } from './room-bookings/room-bookings.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    RoomListComponent,
    RoomDetailComponent,
    AddRoomComponent,
    BookedRoomComponent,
    RoomBookingsComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class RoomsModule { }
