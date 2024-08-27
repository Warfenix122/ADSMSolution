import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFieldInputComponent } from './customer-field-input.component';

describe('CustomerFieldInputComponent', () => {
  let component: CustomerFieldInputComponent;
  let fixture: ComponentFixture<CustomerFieldInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFieldInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFieldInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
