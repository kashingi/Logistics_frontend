import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockinDialog } from './stockin-dialog';

describe('StockinDialog', () => {
  let component: StockinDialog;
  let fixture: ComponentFixture<StockinDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockinDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(StockinDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
