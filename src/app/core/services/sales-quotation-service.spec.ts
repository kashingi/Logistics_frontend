import { TestBed } from '@angular/core/testing';

import { SalesQuotationService } from './sales-quotation-service';

describe('SalesQuotationService', () => {
  let service: SalesQuotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesQuotationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
