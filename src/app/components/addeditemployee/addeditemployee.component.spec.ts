import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditemployeeComponent } from './addeditemployee.component';

describe('AddeditemployeeComponent', () => {
  let component: AddeditemployeeComponent;
  let fixture: ComponentFixture<AddeditemployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddeditemployeeComponent]
    });
    fixture = TestBed.createComponent(AddeditemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
