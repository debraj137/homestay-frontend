import { Component, HostListener, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { Room } from '../../model/room';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approved-room',
  templateUrl: './approved-room.component.html',
  styleUrl: './approved-room.component.scss'
})
export class ApprovedRoomComponent implements OnInit {
  city!: string;
  rooms: Room[] = [];
  amenities = [];
  loading: boolean = true;
  constructor(private bookingService: BookingService, private router: Router) { }
  ngOnInit(): void {
    // this.city = localStorage.getItem("city") || '';
    // this.getRoomFromServer();
    // console.log('city: ',this.city);
    this.bookingService.city$.subscribe(city => {
      this.city = city;
      this.getRoomFromServer();
    });

    this.bookingService.getAmenities().subscribe(
    (data:any) => this.allAmenities = data,
    (error:any) => console.error('Failed to fetch amenities:', error)
  );
  }



  private getRoomFromServer() {
    if (this.city?.length == 0) {
      this.bookingService.getApprovedRoom().subscribe(result => {
        console.log('approved room: ', result);
        this.rooms = result;
        // this.amenities = result.amenities
        this.loading = false;
      });
    }
    else {
      this.bookingService.getRoomByCity(this.city).subscribe((result: any) => {
        console.log('room by city: ', result);
        this.rooms = result;
        this.loading = false;
      });
    }
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

  goBackToHome() {
    this.router.navigateByUrl('/')
  }

  //filter search
  filter = {
    maxPrice: 2500,
    selectedAmenities: [] as string[],
  };

  allAmenities = [];

  onAmenityToggle(amenity: string, event: any) {
    if (event.target.checked) {
      this.filter.selectedAmenities.push(amenity);
    } else {
      this.filter.selectedAmenities = this.filter.selectedAmenities.filter(a => a !== amenity);
    }
  }

  applyFilters() {
    const payload = {
      city: this.city,
      maxPrice: this.filter.maxPrice,
      amenities: this.filter.selectedAmenities,
    };
    console.log('payload in applyFilter: ',payload)
    this.bookingService.filterRooms(payload).subscribe((result: any) => {
      console.log('res in applyFilter: ',result)
      this.rooms = result.rooms;
    });
  }

}
