/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DiscoveryService } from './discovery.service';

describe('Service: Discovery', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscoveryService]
    });
  });

  it('should ...', inject([DiscoveryService], (service: DiscoveryService) => {
    expect(service).toBeTruthy();
  }));
});
