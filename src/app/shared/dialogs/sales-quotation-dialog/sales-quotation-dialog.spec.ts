import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQuotationDialog } from './sales-quotation-dialog';

describe('SalesQuotationDialog', () => {
  let component: SalesQuotationDialog;
  let fixture: ComponentFixture<SalesQuotationDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesQuotationDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesQuotationDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
