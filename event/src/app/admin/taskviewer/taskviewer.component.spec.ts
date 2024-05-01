import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskviewerComponent } from './taskviewer.component';

describe('TaskviewerComponent', () => {
  let component: TaskviewerComponent;
  let fixture: ComponentFixture<TaskviewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskviewerComponent]
    });
    fixture = TestBed.createComponent(TaskviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
