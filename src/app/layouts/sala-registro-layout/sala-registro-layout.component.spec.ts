import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaRegistroLayoutComponent } from './sala-registro-layout.component';

describe('SalaRegistroLayoutComponent', () => {
  let component: SalaRegistroLayoutComponent;
  let fixture: ComponentFixture<SalaRegistroLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaRegistroLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaRegistroLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
