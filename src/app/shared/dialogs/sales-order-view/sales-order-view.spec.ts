import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderView } from './sales-order-view';

describe('SalesOrderView', () => {
  let component: SalesOrderView;
  let fixture: ComponentFixture<SalesOrderView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesOrderView],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesOrderView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
