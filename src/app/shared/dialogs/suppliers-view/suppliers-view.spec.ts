import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersView } from './suppliers-view';

describe('SuppliersView', () => {
  let component: SuppliersView;
  let fixture: ComponentFixture<SuppliersView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliersView],
    }).compileComponents();

    fixture = TestBed.createComponent(SuppliersView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
