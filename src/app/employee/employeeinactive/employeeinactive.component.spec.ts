import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeinactiveComponent } from './employeeinactive.component';

describe('EmployeeinactiveComponent', () => {
  let component: EmployeeinactiveComponent;
  let fixture: ComponentFixture<EmployeeinactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeinactiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeinactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
