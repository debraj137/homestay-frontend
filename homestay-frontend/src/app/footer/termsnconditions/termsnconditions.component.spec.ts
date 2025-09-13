import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsnconditionsComponent } from './termsnconditions.component';

describe('TermsnconditionsComponent', () => {
  let component: TermsnconditionsComponent;
  let fixture: ComponentFixture<TermsnconditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TermsnconditionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsnconditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
