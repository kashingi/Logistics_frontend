import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCheckView } from './stock-check-view';

describe('StockCheckView', () => {
  let component: StockCheckView;
  let fixture: ComponentFixture<StockCheckView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockCheckView],
    }).compileComponents();

    fixture = TestBed.createComponent(StockCheckView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
