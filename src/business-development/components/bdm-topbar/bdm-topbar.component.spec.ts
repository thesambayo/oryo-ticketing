import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdmTopbarComponent } from './bdm-topbar.component';

describe('BdmTopbarComponent', () => {
  let component: BdmTopbarComponent;
  let fixture: ComponentFixture<BdmTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BdmTopbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BdmTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
