import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseDialog } from './warehouse-dialog';

describe('WarehouseDialog', () => {
  let component: WarehouseDialog;
  let fixture: ComponentFixture<WarehouseDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(WarehouseDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
