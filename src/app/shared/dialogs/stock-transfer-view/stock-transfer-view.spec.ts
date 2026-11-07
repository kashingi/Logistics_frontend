import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferView } from './stock-transfer-view';

describe('StockTransferView', () => {
  let component: StockTransferView;
  let fixture: ComponentFixture<StockTransferView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockTransferView],
    }).compileComponents();

    fixture = TestBed.createComponent(StockTransferView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
