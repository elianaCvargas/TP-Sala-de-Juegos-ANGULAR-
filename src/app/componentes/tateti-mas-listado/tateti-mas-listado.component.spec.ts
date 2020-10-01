import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TatetiMasListadoComponent } from './tateti-mas-listado.component';

describe('TatetiMasListadoComponent', () => {
  let component: TatetiMasListadoComponent;
  let fixture: ComponentFixture<TatetiMasListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TatetiMasListadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TatetiMasListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
