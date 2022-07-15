import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogorderdetailComponent } from './dialogorderdetail.component';

describe('DialogorderdetailComponent', () => {
  let component: DialogorderdetailComponent;
  let fixture: ComponentFixture<DialogorderdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogorderdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogorderdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
