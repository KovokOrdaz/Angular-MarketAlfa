import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientinactiveComponent } from './clientinactive.component';

describe('ClientinactiveComponent', () => {
  let component: ClientinactiveComponent;
  let fixture: ComponentFixture<ClientinactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientinactiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientinactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
