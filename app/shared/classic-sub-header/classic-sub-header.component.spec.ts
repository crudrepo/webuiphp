import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicSubHeaderComponent } from './classic-sub-header.component';

describe('ClassicSubHeaderComponent', () => {
  let component: ClassicSubHeaderComponent;
  let fixture: ComponentFixture<ClassicSubHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassicSubHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassicSubHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
