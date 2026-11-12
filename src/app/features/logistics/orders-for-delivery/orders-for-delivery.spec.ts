import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersForDelivery } from './orders-for-delivery';

describe('OrdersForDelivery', () => {
  let component: OrdersForDelivery;
  let fixture: ComponentFixture<OrdersForDelivery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersForDelivery],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersForDelivery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
