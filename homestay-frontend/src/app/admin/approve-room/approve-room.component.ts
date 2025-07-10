import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { Room } from '../../model/room';

@Component({
  selector: 'app-approve-room',
  templateUrl: './approve-room.component.html',
  styleUrl: './approve-room.component.scss'
})
export class ApproveRoomComponent {
  rooms: Room[] = [];
  constructor(private adminService: AdminService){}
    ngOnInit(): void {
      this.getPendingRoomData();
    }

  private getPendingRoomData() {
    this.adminService.getPendingRooms().subscribe((result: Room[]) => {
      this.rooms = result;
      console.log('rooms: ', this.rooms);
    });
  }

    approveRoom(roomId:any){
      this.adminService.approveRoom(roomId).subscribe(result=>{
        alert("Room approved successfully");
        this.getPendingRoomData();
      })
    }
}
