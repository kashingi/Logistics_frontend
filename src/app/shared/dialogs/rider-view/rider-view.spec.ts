import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderView } from './rider-view';

describe('RiderView', () => {
  let component: RiderView;
  let fixture: ComponentFixture<RiderView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiderView],
    }).compileComponents();

    fixture = TestBed.createComponent(RiderView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
