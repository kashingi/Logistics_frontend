import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferDialog } from './stock-transfer-dialog';

describe('StockTransferDialog', () => {
  let component: StockTransferDialog;
  let fixture: ComponentFixture<StockTransferDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockTransferDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(StockTransferDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
