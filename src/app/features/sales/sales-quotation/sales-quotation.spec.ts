import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQuotation } from './sales-quotation';

describe('SalesQuotation', () => {
  let component: SalesQuotation;
  let fixture: ComponentFixture<SalesQuotation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesQuotation],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesQuotation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
