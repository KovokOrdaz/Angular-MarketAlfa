import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogrescueComponent } from './dialogrescue.component';

describe('DialogrescueComponent', () => {
  let component: DialogrescueComponent;
  let fixture: ComponentFixture<DialogrescueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogrescueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogrescueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
