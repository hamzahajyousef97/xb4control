import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSummerComponent } from './edit-summer.component';

describe('EditSummerComponent', () => {
  let component: EditSummerComponent;
  let fixture: ComponentFixture<EditSummerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSummerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSummerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
