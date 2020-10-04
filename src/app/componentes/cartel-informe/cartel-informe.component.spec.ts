import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartelInformeComponent } from './cartel-informe.component';

describe('CartelInformeComponent', () => {
  let component: CartelInformeComponent;
  let fixture: ComponentFixture<CartelInformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartelInformeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartelInformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
