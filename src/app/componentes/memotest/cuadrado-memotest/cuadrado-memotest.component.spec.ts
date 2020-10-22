import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadradoMemotestComponent } from './cuadrado-memotest.component';

describe('CuadradoMemotestComponent', () => {
  let component: CuadradoMemotestComponent;
  let fixture: ComponentFixture<CuadradoMemotestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuadradoMemotestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuadradoMemotestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
