import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveRoomComponent } from './approve-room/approve-room.component';

const routes: Routes = [
  {path: '', component: ApproveRoomComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
