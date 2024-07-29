import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBdmComponent } from './create-bdm.component';

describe('CreateBdmComponent', () => {
  let component: CreateBdmComponent;
  let fixture: ComponentFixture<CreateBdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
