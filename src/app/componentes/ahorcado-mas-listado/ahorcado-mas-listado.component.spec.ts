import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorcadoMasListadoComponent } from './ahorcado-mas-listado.component';

describe('AdivinaMasListadoComponent', () => {
  let component: AhorcadoMasListadoComponent;
  let fixture: ComponentFixture<AhorcadoMasListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AhorcadoMasListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AhorcadoMasListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
