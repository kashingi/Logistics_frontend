import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryView } from './delivery-view';

describe('DeliveryView', () => {
  let component: DeliveryView;
  let fixture: ComponentFixture<DeliveryView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryView],
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
