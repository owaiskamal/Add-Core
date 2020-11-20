import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FrmTransStatusComponent } from './frm-trans-status.component';

describe('FrmTransStatusComponent', () => {
  let component: FrmTransStatusComponent;
  let fixture: ComponentFixture<FrmTransStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmTransStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmTransStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
