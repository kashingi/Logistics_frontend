import { TestBed } from '@angular/core/testing';

import { StockCheckService } from './stock-check-service';

describe('StockCheckService', () => {
  let service: StockCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
