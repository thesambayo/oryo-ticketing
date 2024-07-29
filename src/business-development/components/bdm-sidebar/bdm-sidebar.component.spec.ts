import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdmSidebarComponent } from './bdm-sidebar.component';

describe('BdmSidebarComponent', () => {
  let component: BdmSidebarComponent;
  let fixture: ComponentFixture<BdmSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BdmSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BdmSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
