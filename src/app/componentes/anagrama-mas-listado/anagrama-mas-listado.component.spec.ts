import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnagramaMasListadoComponent } from './anagrama-mas-listado.component';

describe('AnagramaMasListadoComponent', () => {
  let component: AnagramaMasListadoComponent;
  let fixture: ComponentFixture<AnagramaMasListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnagramaMasListadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnagramaMasListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
