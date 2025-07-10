import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RoomService } from '../room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.scss'
})
export class AddRoomComponent {
  constructor(private roomService: RoomService, private router: Router) {}
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
    amenities: this.fb.array([this.fb.control('')])
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
      console.log(this.roomForm.value);
      let value = this.roomForm.value;
      this.roomService.addRoom(value as any).subscribe(result=>{
        alert("Room added for approval");
        this.router.navigateByUrl("/rooms");
      })
    }
  }
}
