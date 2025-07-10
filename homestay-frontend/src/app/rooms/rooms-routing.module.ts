import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomListComponent } from './room-list/room-list.component';
import { AddRoomComponent } from './add-room/add-room.component';

const routes: Routes = [
  {path:'', component: RoomListComponent},
  {path:'add-room', component: AddRoomComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
