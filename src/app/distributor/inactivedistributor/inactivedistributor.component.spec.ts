import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivedistributorComponent } from './inactivedistributor.component';

describe('InactivedistributorComponent', () => {
  let component: InactivedistributorComponent;
  let fixture: ComponentFixture<InactivedistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactivedistributorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InactivedistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
