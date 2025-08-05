import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Room } from '../../model/room';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-approved-room',
  templateUrl: './approved-room.component.html',
  styleUrl: './approved-room.component.scss'
})
export class ApprovedRoomComponent implements OnInit{
  rooms: Room[] = [];
  constructor(private adminService: AdminService, private snackBar: MatSnackBar){}
  ngOnInit(): void {
    this.adminService.approvedRoom().subscribe((result: any) => {
      this.rooms = result;
      console.log('rooms: ', this.rooms);
    });
  }

  updateCategory(roomId: string, newCategory: string) {
  this.adminService.updateCategory(roomId, newCategory).subscribe({
    next: (res) => {
      this.snackBar.open('Category updated successfully', 'Close', { duration: 3000 });
    },
    error: (err) => {
      this.snackBar.open('Failed to update category', 'Close', { duration: 3000 });
    }
  });
}

}
