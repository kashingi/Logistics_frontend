import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderDialog } from './rider-dialog';

describe('RiderDialog', () => {
  let component: RiderDialog;
  let fixture: ComponentFixture<RiderDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiderDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(RiderDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
