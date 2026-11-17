import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCheckDialog } from './stock-check-dialog';

describe('StockCheckDialog', () => {
  let component: StockCheckDialog;
  let fixture: ComponentFixture<StockCheckDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockCheckDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(StockCheckDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
