import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaPublicLayoutComponent } from './sala-public-layout.component';

describe('SalaPublicLayoutComponent', () => {
  let component: SalaPublicLayoutComponent;
  let fixture: ComponentFixture<SalaPublicLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaPublicLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaPublicLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
