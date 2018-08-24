import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionfooterbarComponent } from './actionfooterbar.component';

describe('ActionfooterbarComponent', () => {
  let component: ActionfooterbarComponent;
  let fixture: ComponentFixture<ActionfooterbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionfooterbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionfooterbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
