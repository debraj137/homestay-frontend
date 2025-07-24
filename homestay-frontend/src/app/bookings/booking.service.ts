import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../model/room';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  public citySubject = new BehaviorSubject<string>('');
  city$ = this.citySubject.asObservable();
  constructor(private http: HttpClient) { }

  getApprovedRoom() {
    return this.http.get<Room[]>(environment.apiUrl + '/rooms');
  }

  getRoomByCity(city: string) {
    return this.http.post(environment.apiUrl + '/rooms/search/city', {
      city: city
    })
  }

  createBooking(roomId: string, checkInDate: Date, checkOutDate: Date, totalPrice: number, guestCount: number) {
    return this.http.post(environment.apiUrl + '/bookings', {
      roomId, checkInDate, checkOutDate, totalPrice, guestCount
    })
  }

  getBookedDates(roomId: string) {
    return this.http.post(`${environment.apiUrl}/bookings/room-dates`, { roomId });
  }

  getOwnerBookings() {
    return this.http.get<any>(`${environment.apiUrl}/bookings/owner`);
  }

  getUserBooking() {
    return this.http.get<any>(`${environment.apiUrl}/bookings/my-bookings`);
  }

}
