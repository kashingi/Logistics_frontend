import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQuotationView } from './sales-quotation-view';

describe('SalesQuotationView', () => {
  let component: SalesQuotationView;
  let fixture: ComponentFixture<SalesQuotationView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesQuotationView],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesQuotationView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
