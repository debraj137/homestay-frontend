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

@NgModule({
  declarations: [
    ApproveRoomComponent,
    ApprovedRoomComponent,
    OwnerListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatExpansionModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule
  ]
})
export class AdminModule { }
