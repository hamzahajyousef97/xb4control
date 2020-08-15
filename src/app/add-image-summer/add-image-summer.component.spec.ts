import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImageSummerComponent } from './add-image-summer.component';

describe('AddImageSummerComponent', () => {
  let component: AddImageSummerComponent;
  let fixture: ComponentFixture<AddImageSummerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImageSummerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImageSummerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
