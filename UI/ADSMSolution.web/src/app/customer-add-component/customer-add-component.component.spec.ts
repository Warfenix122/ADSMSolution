import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddComponentComponent } from './customer-add-component.component';

describe('CustomerAddComponentComponent', () => {
  let component: CustomerAddComponentComponent;
  let fixture: ComponentFixture<CustomerAddComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerAddComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAddComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
