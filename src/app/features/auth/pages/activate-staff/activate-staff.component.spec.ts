import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateStaffComponent } from './activate-staff.component';

describe('ActivateStaffComponent', () => {
  let component: ActivateStaffComponent;
  let fixture: ComponentFixture<ActivateStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivateStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivateStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
