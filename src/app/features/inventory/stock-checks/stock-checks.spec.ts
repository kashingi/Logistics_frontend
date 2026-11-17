import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockChecks } from './stock-checks';

describe('StockChecks', () => {
  let component: StockChecks;
  let fixture: ComponentFixture<StockChecks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockChecks],
    }).compileComponents();

    fixture = TestBed.createComponent(StockChecks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
