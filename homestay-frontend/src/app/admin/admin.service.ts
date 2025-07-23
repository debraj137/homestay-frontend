import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../model/room';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getPendingRooms() {
    return this.http.get<Room[]>(environment.apiUrl + '/admin/pending-rooms');
  }

 // http://localhost:3000/admin/approve-room/6862d2525352c88cf83d86c5 patch

  approveRoom(roomId:any){
    return this.http.patch(environment.apiUrl + '/admin/approve-room/' + roomId,{})
  }

  approvedRoom(){
    return this.http.get(environment.apiUrl + '/rooms')
  }

  getOwnersWithRooms(){
  return this.http.get<any[]>(environment.apiUrl + '/admin/owners-with-rooms');
}

}
