import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdmContainerComponent } from './bdm-container.component';

describe('BdmContainerComponent', () => {
  let component: BdmContainerComponent;
  let fixture: ComponentFixture<BdmContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BdmContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BdmContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
