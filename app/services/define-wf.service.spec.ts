import { TestBed, inject } from '@angular/core/testing';

import { DefineWfService } from './define-wf.service';

describe('DefineWfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefineWfService]
    });
  });

  it('should be created', inject([DefineWfService], (service: DefineWfService) => {
    expect(service).toBeTruthy();
  }));
});
