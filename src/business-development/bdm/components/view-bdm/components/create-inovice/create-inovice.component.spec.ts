import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInoviceComponent } from './create-inovice.component';

describe('CreateInoviceComponent', () => {
  let component: CreateInoviceComponent;
  let fixture: ComponentFixture<CreateInoviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInoviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInoviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
