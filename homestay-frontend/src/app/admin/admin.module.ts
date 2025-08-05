import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ApproveRoomComponent } from './approve-room/approve-room.component';
import { ApprovedRoomComponent } from './approved-room/approved-room.component';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AllBookingComponent } from './all-booking/all-booking.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ApproveRoomComponent,
    ApprovedRoomComponent,
    OwnerListComponent,
    AllBookingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    MatExpansionModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule
  ]
})
export class AdminModule { }
