import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeadsComponent } from './create-leads.component';

describe('CreateBdmComponent', () => {
  let component: CreateLeadsComponent;
  let fixture: ComponentFixture<CreateLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLeadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
