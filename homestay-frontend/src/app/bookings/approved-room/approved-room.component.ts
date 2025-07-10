import { Component, HostListener, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { Room } from '../../model/room';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approved-room',
  templateUrl: './approved-room.component.html',
  styleUrl: './approved-room.component.scss'
})
export class ApprovedRoomComponent implements OnInit{
  city!:string;
  rooms:Room[] = [];
  amenities = []
  constructor(private bookingService: BookingService, private router: Router){}
  ngOnInit(): void {
    // this.city = localStorage.getItem("city") || '';
    // this.getRoomFromServer();
    // console.log('city: ',this.city);
    this.bookingService.city$.subscribe(city => {
    this.city = city;
    this.getRoomFromServer();
  });
    
  }

 

  private getRoomFromServer() {
    if (this.city?.length == 0) {
      this.bookingService.getApprovedRoom().subscribe(result => {
        console.log('approved room: ', result);
        this.rooms = result;
        // this.amenities = result.amenities
      });
    }
    else {
      this.bookingService.getRoomByCity(this.city).subscribe((result: any) => {
        console.log('room by city: ', result);
        this.rooms = result;
      });
    }
  }

  proceedToBookRoom(roomId:string){
    console.log(roomId);
    localStorage.setItem('roomId',roomId);
    console.log('clicked');
    this.router.navigateByUrl('/bookings/book-room');
  }

  goBackToHome(){
    this.router.navigateByUrl('/')
  }

}
