import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ste2ListingComponent } from './ste2-listing.component';

describe('Ste2ListingComponent', () => {
  let component: Ste2ListingComponent;
  let fixture: ComponentFixture<Ste2ListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ste2ListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ste2ListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
