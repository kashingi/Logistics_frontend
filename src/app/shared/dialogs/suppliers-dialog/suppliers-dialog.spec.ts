import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersDialog } from './suppliers-dialog';

describe('SuppliersDialog', () => {
  let component: SuppliersDialog;
  let fixture: ComponentFixture<SuppliersDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliersDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(SuppliersDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
