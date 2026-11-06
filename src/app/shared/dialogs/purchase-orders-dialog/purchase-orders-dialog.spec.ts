import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrdersDialog } from './purchase-orders-dialog';

describe('PurchaseOrdersDialog', () => {
  let component: PurchaseOrdersDialog;
  let fixture: ComponentFixture<PurchaseOrdersDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseOrdersDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseOrdersDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
