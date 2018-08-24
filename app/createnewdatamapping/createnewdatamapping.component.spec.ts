import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewdatamappingComponent } from './createnewdatamapping.component';

describe('CreatenewdatamappingComponent', () => {
  let component: CreatenewdatamappingComponent;
  let fixture: ComponentFixture<CreatenewdatamappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatenewdatamappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatenewdatamappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
