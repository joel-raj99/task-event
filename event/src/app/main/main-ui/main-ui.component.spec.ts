import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainUiComponent } from './main-ui.component';

describe('MainUiComponent', () => {
  let component: MainUiComponent;
  let fixture: ComponentFixture<MainUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainUiComponent]
    });
    fixture = TestBed.createComponent(MainUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
