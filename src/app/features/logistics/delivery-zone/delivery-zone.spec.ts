import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryZone } from './delivery-zone';

describe('DeliveryZone', () => {
  let component: DeliveryZone;
  let fixture: ComponentFixture<DeliveryZone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryZone],
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryZone);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
