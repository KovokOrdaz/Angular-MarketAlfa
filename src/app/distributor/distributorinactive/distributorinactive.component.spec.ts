import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorinactiveComponent } from './distributorinactive.component';

describe('DistributorinactiveComponent', () => {
  let component: DistributorinactiveComponent;
  let fixture: ComponentFixture<DistributorinactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorinactiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorinactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
