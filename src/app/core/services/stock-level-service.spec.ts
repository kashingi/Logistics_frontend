import { TestBed } from '@angular/core/testing';

import { StockLevelService } from './stock-level-service';

describe('StockLevelService', () => {
  let service: StockLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
