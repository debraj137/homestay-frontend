import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveRoomComponent } from './approve-room/approve-room.component';
import { ApprovedRoomComponent } from './approved-room/approved-room.component';

const routes: Routes = [
  {path: '', component: ApproveRoomComponent},
  {path: 'approved-room', component: ApprovedRoomComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
