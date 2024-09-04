import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NocMainDashboardComponent } from './noc-main-dashboard.component';

describe('NocMainDashboardComponent', () => {
  let component: NocMainDashboardComponent;
  let fixture: ComponentFixture<NocMainDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NocMainDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NocMainDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
