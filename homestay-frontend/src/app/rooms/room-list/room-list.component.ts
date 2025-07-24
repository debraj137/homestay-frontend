import { Component, OnInit } from '@angular/core';
import { Room } from '../../model/room';
import { RoomService } from '../room.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss'
})
export class RoomListComponent implements OnInit {
  rooms!: Room[];
  constructor(private roomService: RoomService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.roomService.getRooms().subscribe((result: Room[]) => {
      this.rooms = result;
      console.log('rooms: ', this.rooms);
    })
  }


  updateRoom(roomId: string) {
    this.router.navigate(['/rooms/edit-room', roomId]);
  }

}
