import { TestBed, inject } from '@angular/core/testing';

import { CreatenewdatamappingService } from './createnewdatamapping.service';

describe('CreatenewdatamappingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreatenewdatamappingService]
    });
  });

  it('should be created', inject([CreatenewdatamappingService], (service: CreatenewdatamappingService) => {
    expect(service).toBeTruthy();
  }));
});
