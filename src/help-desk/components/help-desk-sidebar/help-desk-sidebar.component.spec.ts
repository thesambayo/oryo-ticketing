import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpDeskSidebarComponent } from './help-desk-sidebar.component';

describe('SidebarComponent', () => {
  let component: HelpDeskSidebarComponent;
  let fixture: ComponentFixture<HelpDeskSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpDeskSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpDeskSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
