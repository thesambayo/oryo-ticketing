import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintInoviceComponent } from './print-inovice.component';

describe('PrintInoviceComponent', () => {
  let component: PrintInoviceComponent;
  let fixture: ComponentFixture<PrintInoviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintInoviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintInoviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
