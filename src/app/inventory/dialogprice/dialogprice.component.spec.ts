import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogpriceComponent } from './dialogprice.component';

describe('DialogpriceComponent', () => {
  let component: DialogpriceComponent;
  let fixture: ComponentFixture<DialogpriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogpriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogpriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
