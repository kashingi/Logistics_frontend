import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrdersView } from './purchase-orders-view';

describe('PurchaseOrdersView', () => {
  let component: PurchaseOrdersView;
  let fixture: ComponentFixture<PurchaseOrdersView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseOrdersView],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseOrdersView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
