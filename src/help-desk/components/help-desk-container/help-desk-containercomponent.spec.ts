import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpDeskContainerComponent } from './help-desk-container.component';

describe('HelpDeskContainerComponent', () => {
  let component: HelpDeskContainerComponent;
  let fixture: ComponentFixture<HelpDeskContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpDeskContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpDeskContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
