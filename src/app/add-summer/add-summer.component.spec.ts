import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSummerComponent } from './add-summer.component';

describe('AddSummerComponent', () => {
  let component: AddSummerComponent;
  let fixture: ComponentFixture<AddSummerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSummerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSummerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
