import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TatetiCuadradoComponent } from './tateti-cuadrado.component';

describe('TatetiCuadradoComponent', () => {
  let component: TatetiCuadradoComponent;
  let fixture: ComponentFixture<TatetiCuadradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TatetiCuadradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TatetiCuadradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
