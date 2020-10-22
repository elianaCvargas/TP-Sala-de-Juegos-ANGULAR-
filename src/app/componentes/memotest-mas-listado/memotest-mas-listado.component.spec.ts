import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemotestMasListadoComponent } from './memotest-mas-listado.component';

describe('MemotestMasListadoComponent', () => {
  let component: MemotestMasListadoComponent;
  let fixture: ComponentFixture<MemotestMasListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemotestMasListadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemotestMasListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
