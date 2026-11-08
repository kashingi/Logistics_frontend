import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Riders } from './riders';

describe('Riders', () => {
  let component: Riders;
  let fixture: ComponentFixture<Riders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Riders],
    }).compileComponents();

    fixture = TestBed.createComponent(Riders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
