import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryZoneDialog } from './delivery-zone-dialog';

describe('DeliveryZoneDialog', () => {
  let component: DeliveryZoneDialog;
  let fixture: ComponentFixture<DeliveryZoneDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryZoneDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryZoneDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
