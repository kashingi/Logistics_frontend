import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnDialog } from './grn-dialog';

describe('GrnDialog', () => {
  let component: GrnDialog;
  let fixture: ComponentFixture<GrnDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrnDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(GrnDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
