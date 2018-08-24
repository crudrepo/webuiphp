import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdatamappingComponent } from './viewdatamapping.component';

describe('ViewdatamappingComponent', () => {
  let component: ViewdatamappingComponent;
  let fixture: ComponentFixture<ViewdatamappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdatamappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdatamappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
