import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginSecuritiesPageComponent } from './login-securities-page.component';

describe('LoginSecuritiesPageComponent', () => {
  let component: LoginSecuritiesPageComponent;
  let fixture: ComponentFixture<LoginSecuritiesPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSecuritiesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSecuritiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
