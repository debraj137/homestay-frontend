import { Component } from '@angular/core';
import { RoomService } from '../../rooms/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.scss'
})
export class RoomDetailComponent {
  roomId: any;
  roomData: any;
  selectedImage: any;
  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit() {
    this.roomId = localStorage.getItem('roomId');
    this.roomService.getRoomById(this.roomId).subscribe({
      next: (data: any) => {
        this.roomData = data;
        if (data.images && data.images.length > 0) {
          this.selectedImage = data.images[0]; // default main image
        }
      },
      error: (err) => {
        console.error('Error fetching room:', err);
      }
    });
  }
  onImageClick(imageUrl: string) {
    this.selectedImage = imageUrl;
  }

    proceedToBookRoom(roomId:string){
    console.log(roomId);
    localStorage.setItem('roomId',roomId);
    console.log('clicked');
    this.router.navigateByUrl('/bookings/book-room');
  }
}
