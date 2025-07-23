import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedRoomComponent } from './approved-room.component';

describe('ApprovedRoomComponent', () => {
  let component: ApprovedRoomComponent;
  let fixture: ComponentFixture<ApprovedRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovedRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
