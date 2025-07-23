import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../model/room';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  getRooms() {
    return this.http.get<Room[]>(environment.apiUrl + '/rooms/owner');
  }

  addRoom(room: Room) {
    return this.http.post(environment.apiUrl + '/rooms', room)
  }

  getRoomById(roomId: string){
    return this.http.post(environment.apiUrl + '/rooms/getById', { roomId });
  }
}
