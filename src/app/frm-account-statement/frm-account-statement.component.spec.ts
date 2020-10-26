import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmAccountStatementComponent } from './frm-account-statement.component';

describe('FrmAccountStatementComponent', () => {
  let component: FrmAccountStatementComponent;
  let fixture: ComponentFixture<FrmAccountStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmAccountStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmAccountStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
