import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { LoginComponent } from './login.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule],});
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],       
      providers: [FormBuilder],
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ NgSelectModule, FormsModule,
        RouterTestingModule.withRoutes(
          [{path: '', component: LoginComponent}]
        )
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
