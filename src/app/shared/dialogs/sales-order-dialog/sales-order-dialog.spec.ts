import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderDialog } from './sales-order-dialog';

describe('SalesOrderDialog', () => {
  let component: SalesOrderDialog;
  let fixture: ComponentFixture<SalesOrderDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesOrderDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesOrderDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
