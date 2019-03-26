import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackDialogueComponent } from './feedback-dialogue.component';

describe('FeedbackDialogueComponent', () => {
  let component: FeedbackDialogueComponent;
  let fixture: ComponentFixture<FeedbackDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
