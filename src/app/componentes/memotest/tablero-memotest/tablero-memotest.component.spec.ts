import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroMemotestComponent } from './tablero-memotest.component';

describe('TableroMemotestComponent', () => {
  let component: TableroMemotestComponent;
  let fixture: ComponentFixture<TableroMemotestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableroMemotestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroMemotestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
