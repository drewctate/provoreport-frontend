import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDatePickerDialogComponent } from './custom-date-picker-dialog.component';

describe('CustomDatePickerDialogComponent', () => {
  let component: CustomDatePickerDialogComponent;
  let fixture: ComponentFixture<CustomDatePickerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomDatePickerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDatePickerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
