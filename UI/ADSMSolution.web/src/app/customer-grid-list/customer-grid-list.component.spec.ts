import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGridListComponent } from './customer-grid-list.component';

describe('CustomerGridListComponent', () => {
  let component: CustomerGridListComponent;
  let fixture: ComponentFixture<CustomerGridListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerGridListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerGridListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
