import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MybusinnessComponent } from './mybusinness.component';

describe('MybusinnessComponent', () => {
  let component: MybusinnessComponent;
  let fixture: ComponentFixture<MybusinnessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MybusinnessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MybusinnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
