import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWinterComponent } from './edit-winter.component';

describe('EditWinterComponent', () => {
  let component: EditWinterComponent;
  let fixture: ComponentFixture<EditWinterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWinterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
