import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRoomComponent } from './approve-room.component';

describe('ApproveRoomComponent', () => {
  let component: ApproveRoomComponent;
  let fixture: ComponentFixture<ApproveRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApproveRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
