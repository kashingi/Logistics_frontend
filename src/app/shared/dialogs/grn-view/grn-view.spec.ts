import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnView } from './grn-view';

describe('GrnView', () => {
  let component: GrnView;
  let fixture: ComponentFixture<GrnView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrnView],
    }).compileComponents();

    fixture = TestBed.createComponent(GrnView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
