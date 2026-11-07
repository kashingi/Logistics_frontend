import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReceivedNotes } from './goods-received-notes';

describe('GoodsReceivedNotes', () => {
  let component: GoodsReceivedNotes;
  let fixture: ComponentFixture<GoodsReceivedNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodsReceivedNotes],
    }).compileComponents();

    fixture = TestBed.createComponent(GoodsReceivedNotes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
