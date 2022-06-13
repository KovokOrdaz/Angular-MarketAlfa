import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactemergencyComponent } from './contactemergency.component';

describe('ContactemergencyComponent', () => {
  let component: ContactemergencyComponent;
  let fixture: ComponentFixture<ContactemergencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactemergencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactemergencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
