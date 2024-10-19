import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NocClientDetailsComponent } from './noc-client-details.component';

describe('NocClientDetailsComponent', () => {
  let component: NocClientDetailsComponent;
  let fixture: ComponentFixture<NocClientDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NocClientDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NocClientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
