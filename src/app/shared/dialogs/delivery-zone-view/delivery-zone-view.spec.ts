import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryZoneView } from './delivery-zone-view';

describe('DeliveryZoneView', () => {
  let component: DeliveryZoneView;
  let fixture: ComponentFixture<DeliveryZoneView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryZoneView],
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryZoneView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
