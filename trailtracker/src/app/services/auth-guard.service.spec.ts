import { TestBed } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports: [ NgSelectModule,
      RouterTestingModule.withRoutes(
        [{path: '', component: AuthGuardService}]
        )
      ]
      });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
