import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWinterComponent } from './add-winter.component';

describe('AddWinterComponent', () => {
  let component: AddWinterComponent;
  let fixture: ComponentFixture<AddWinterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWinterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
