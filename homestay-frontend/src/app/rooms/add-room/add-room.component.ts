import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RoomService } from '../room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.scss'
})
export class AddRoomComponent implements OnInit {
  roomId: string | null = null;
  isEditMode = false;
  constructor(
    private roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute,
    // private toastr: ToastrService,
    private snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.roomId;

    if (this.isEditMode && this.roomId) {
      this.roomService.getRoomById(this.roomId).subscribe((room) => {
        this.populateForm(room);
      });
    }
  }
  fb = inject(FormBuilder)
  roomForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    location: this.fb.group({
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required]
    }),
    price: [0, [Validators.required, Validators.min(1)]],
    images: this.fb.array([this.fb.control('')]),
    amenities: this.fb.array([this.fb.control('')]),
    // maximumAllowedGuest: [1, [Validators.required, Validators.min(1)]],
    maximumAllowedAdult: [1, [Validators.required, Validators.min(1)]],
    maximumAllowedChild: [0, [Validators.required, Validators.min(1)]],
  });

  // get images(): FormArray {
  //   return this.roomForm.get('images') as FormArray;
  // }

  //   get images(): FormArray<FormControl<string>> {
  //   return this.roomForm.get('images') as FormArray<FormControl<string>>;
  // }

  // get images(): FormArray<FormControl<string>> {
  //   return this.roomForm.get('images') as FormArray<FormControl<string>>;
  // }

  get images(): FormArray<FormControl<string>> {
    return this.roomForm.get('images') as FormArray<FormControl<string>>;
  }

  get amenities(): FormArray<FormControl<string>> {
    return this.roomForm.get('amenities') as FormArray<FormControl<string>>;
  }

  // addImageField() {
  //   // this.images.push(this.fb.control(''));
  //   this.images.push(this.fb.control<string>(''));
  // }
  addImageField() {
    this.images.push(this.fb.control<string>('', { nonNullable: true }));
  }

  addAmenityField() {
    this.amenities.push(this.fb.control<string>('', { nonNullable: true }));
  }

  submitRoom() {
    if (this.roomForm.valid) {
      const value = this.roomForm.value;

      if (this.isEditMode && this.roomId) {
        const payload = { ...value, _id: this.roomId };
        this.roomService.updateRoom(payload).subscribe((res: any) => {
          // alert(res.message || 'Room updated successfully');
          // this.toastr.success(res.message || 'Room updated successfully', 'Success');
          this.snackBar.open('Room updated successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.router.navigateByUrl('/rooms');
        });
      } else {
        this.roomService.addRoom(value as any).subscribe((res) => {
          alert('Room added for approval');
          this.router.navigateByUrl('/rooms');
        });
      }
    }
  }


  //update room
  populateForm(room: any) {
    this.roomForm.patchValue({
      title: room.title,
      description: room.description,
      location: {
        addressLine1: room.location?.addressLine1,
        addressLine2: room.location?.addressLine2,
        city: room.location?.city,
        state: room.location?.state,
        pincode: room.location?.pincode
      },
      price: room.price,
      // maximumAllowedGuest: room.maximumAllowedGuest,
      maximumAllowedAdult: room.maximumAllowedAdult,
      maximumAllowedChild: room.maximumAllowedChild
    });

    // Set images
    this.images.clear();
    room.images?.forEach((img: string) =>
      this.images.push(this.fb.control<string>(img, { nonNullable: true }))
    );

    // Set amenities
    this.amenities.clear();
    room.amenities?.forEach((a: string) =>
      this.amenities.push(this.fb.control<string>(a, { nonNullable: true }))
    );
  }

}
