import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Room } from '../../model/room';

@Component({
  selector: 'app-approved-room',
  templateUrl: './approved-room.component.html',
  styleUrl: './approved-room.component.scss'
})
export class ApprovedRoomComponent implements OnInit{
  rooms: Room[] = [];
  constructor(private adminService: AdminService){}
  ngOnInit(): void {
    this.adminService.approvedRoom().subscribe((result: any) => {
      this.rooms = result;
      console.log('rooms: ', this.rooms);
    });
  }
}
