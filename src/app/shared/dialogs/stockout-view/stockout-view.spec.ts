import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockoutView } from './stockout-view';

describe('StockoutView', () => {
  let component: StockoutView;
  let fixture: ComponentFixture<StockoutView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockoutView],
    }).compileComponents();

    fixture = TestBed.createComponent(StockoutView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
