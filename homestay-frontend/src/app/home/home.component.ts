import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../bookings/booking.service';
import { Room } from '../model/room';
import { RoomService } from '../rooms/room.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  city: string = '';
  goldrooms: Room[] = [];
  silverrooms: Room[] = [];
  diamondrooms: Room[] = [];
  errorMessage: string = '';
  constructor(private router: Router, private bookingService: BookingService, private roomService: RoomService) {

  }
  ngOnInit(): void {
    this.getGoldRooms();
    this.getSilverRooms();
    this.getDiamondRooms();
  }

  isDisabled: boolean = true;

  // onInput(value: string) {
  //   console.log('value in onInput',value)
  //   if(value.trim().length === 0){
  //     this.isDisabled = true;
  //   }
  //   this.isDisabled = false;
  // }
  randomFunc(e: any) {
    console.log(typeof e);
    // localStorage.setItem('city',e);
    if (!e || e.trim().length === 0) {   // 👈 check if empty
      this.errorMessage = "Please enter a city name";
      return;
    }
    this.errorMessage = '';
    this.bookingService.citySubject.next(e);
    // debugger;
    console.log('clicked');
    this.router.navigateByUrl('/bookings')
  }

  clearError() {
    if (this.errorMessage) {
      this.errorMessage = '';
    }
  }

  getGoldRooms() {
    this.roomService.getGoldRoom().subscribe((res: any) => {
      console.log('res in gold room: ', res);
      this.goldrooms = res
    })
  }

  getSilverRooms() {
    this.roomService.getSilverRoom().subscribe((res: any) => {
      console.log('res in gold room: ', res);
      this.silverrooms = res
    })
  }

  getDiamondRooms() {
    this.roomService.getDiamondRoom().subscribe((res: any) => {
      console.log('res in gold room: ', res);
      this.diamondrooms = res
    })
  }

  room = {
    id: '444',
    images: ['https://images.oyoroomscdn.com/uploads/hotel_image/137/medium/5ca53ef34c55e884.jpg'],
    title: 'Deluxe Golden Suite',
    location: {
      city: 'Noida',
      state: 'Uttar Pradesh'
    },
    price: 2500,
    amenities: ['Wi-Fi', 'AC', 'TV', 'Breakfast']
  };

  bookRoom(roomId: string) {
    // Implement booking logic here
  }

  viewDetails(roomId: string) {
    // Navigate or show modal with room details
  }
  proceedToBookRoom(roomId: string) {
    console.log(roomId);
    localStorage.setItem('roomId', roomId);
    console.log('clicked');
    this.router.navigateByUrl('/bookings/book-room');
  }

  roomDetails(roomId: string) {
    localStorage.setItem('roomId', roomId);
    this.router.navigateByUrl('/bookings/room-detail');
  }
}
