import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingTablaComponent } from './ranking-tabla.component';

describe('RankingTablaComponent', () => {
  let component: RankingTablaComponent;
  let fixture: ComponentFixture<RankingTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingTablaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
