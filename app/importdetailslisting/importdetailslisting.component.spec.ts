import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportdetailslistingComponent } from './importdetailslisting.component';

describe('ImportdetailslistingComponent', () => {
  let component: ImportdetailslistingComponent;
  let fixture: ComponentFixture<ImportdetailslistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportdetailslistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportdetailslistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
