import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpDeskTopbarComponent } from './help-desk-topbar.component';

describe('TopbarComponent', () => {
  let component: HelpDeskTopbarComponent;
  let fixture: ComponentFixture<HelpDeskTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpDeskTopbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpDeskTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
