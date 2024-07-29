import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBdmComponent } from './view-bdm.component';

describe('ViewBdmComponent', () => {
  let component: ViewBdmComponent;
  let fixture: ComponentFixture<ViewBdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
