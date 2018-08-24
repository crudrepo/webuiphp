import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicHeaderComponent } from './classic-header.component';

describe('ClassicHeaderComponent', () => {
  let component: ClassicHeaderComponent;
  let fixture: ComponentFixture<ClassicHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassicHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassicHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
