import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NocContainerComponent } from './noc-container.component';

describe('NocContainerComponent', () => {
  let component: NocContainerComponent;
  let fixture: ComponentFixture<NocContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NocContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NocContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
