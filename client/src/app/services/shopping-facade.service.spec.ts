import { TestBed } from '@angular/core/testing';

import { ShoppingFacadeService } from './shopping-facade.service';

describe('ShoppingFacadeService', () => {
  let service: ShoppingFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
