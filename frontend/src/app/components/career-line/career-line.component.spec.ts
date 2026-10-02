import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerLineComponent } from './career-line.component';

describe('CareerLineComponent', () => {
  let component: CareerLineComponent;
  let fixture: ComponentFixture<CareerLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CareerLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
