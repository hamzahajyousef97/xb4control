import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImageWinterComponent } from './add-image-winter.component';

describe('AddImageWinterComponent', () => {
  let component: AddImageWinterComponent;
  let fixture: ComponentFixture<AddImageWinterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImageWinterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImageWinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
