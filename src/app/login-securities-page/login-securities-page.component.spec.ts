import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSecuritiesPageComponent } from './login-securities-page.component';

describe('LoginSecuritiesPageComponent', () => {
  let component: LoginSecuritiesPageComponent;
  let fixture: ComponentFixture<LoginSecuritiesPageComponent>;

  beforeEach(async(() => {
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
