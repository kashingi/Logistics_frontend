import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRiderDialog } from './assign-rider-dialog';

describe('AssignRiderDialog', () => {
  let component: AssignRiderDialog;
  let fixture: ComponentFixture<AssignRiderDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignRiderDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignRiderDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
