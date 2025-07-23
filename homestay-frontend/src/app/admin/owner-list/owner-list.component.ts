import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrl: './owner-list.component.scss'
})
export class OwnerListComponent {
  owners!: any
  constructor(private adminService: AdminService) {}
  ngOnInit(): void {
    this.adminService.getOwnersWithRooms().subscribe((res) => {
      this.owners = res;
    });
  }
}
