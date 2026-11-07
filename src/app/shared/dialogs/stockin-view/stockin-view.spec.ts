import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockinView } from './stockin-view';

describe('StockinView', () => {
  let component: StockinView;
  let fixture: ComponentFixture<StockinView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockinView],
    }).compileComponents();

    fixture = TestBed.createComponent(StockinView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
