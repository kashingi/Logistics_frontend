import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseView } from './warehouse-view';

describe('WarehouseView', () => {
  let component: WarehouseView;
  let fixture: ComponentFixture<WarehouseView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseView],
    }).compileComponents();

    fixture = TestBed.createComponent(WarehouseView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
