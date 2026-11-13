import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReturnDialog } from './purchase-return-dialog';

describe('PurchaseReturnDialog', () => {
  let component: PurchaseReturnDialog;
  let fixture: ComponentFixture<PurchaseReturnDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseReturnDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseReturnDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
