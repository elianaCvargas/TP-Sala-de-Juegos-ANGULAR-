import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiedraPapelTijeraComponent } from './piedra-papel-tijera.component';

describe('piedra-papel-tijera', () => {
  let component: PiedraPapelTijeraComponent;
  let fixture: ComponentFixture<PiedraPapelTijeraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiedraPapelTijeraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiedraPapelTijeraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
