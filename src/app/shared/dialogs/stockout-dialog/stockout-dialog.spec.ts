import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockoutDialog } from './stockout-dialog';

describe('StockoutDialog', () => {
  let component: StockoutDialog;
  let fixture: ComponentFixture<StockoutDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockoutDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(StockoutDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
