import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaTablaComponent } from './estadistica-tabla.component';

describe('EstadisticaTablaComponent', () => {
  let component: EstadisticaTablaComponent;
  let fixture: ComponentFixture<EstadisticaTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticaTablaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
