import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ApproveRoomComponent } from './approve-room/approve-room.component';
import { ApprovedRoomComponent } from './approved-room/approved-room.component';


@NgModule({
  declarations: [
    ApproveRoomComponent,
    ApprovedRoomComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
