import { TestBed } from '@angular/core/testing';

import { RegisterFirebaseService } from './register-firebase.service';

describe('RegisterFirebaseService', () => {
  let service: RegisterFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
