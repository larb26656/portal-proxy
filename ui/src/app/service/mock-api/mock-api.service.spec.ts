/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockApiService } from './mock-api.service';

describe('Service: MockApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockApiService]
    });
  });

  it('should ...', inject([MockApiService], (service: MockApiService) => {
    expect(service).toBeTruthy();
  }));
});
