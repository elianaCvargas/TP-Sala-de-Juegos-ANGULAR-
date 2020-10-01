import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TatetiTableroComponent } from './tateti-tablero.component';

describe('TatetiTableroComponent', () => {
  let component: TatetiTableroComponent;
  let fixture: ComponentFixture<TatetiTableroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TatetiTableroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TatetiTableroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
