import { TestBed } from '@angular/core/testing';

import { ResourceItemResolverService } from './resource-item-resolver.service';

describe('ResourceItemResolverService', () => {
  let service: ResourceItemResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceItemResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
