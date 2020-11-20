import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FrmBulkTransComponent } from './frm-bulk-trans.component';

describe('FrmBulkTransComponent', () => {
  let component: FrmBulkTransComponent;
  let fixture: ComponentFixture<FrmBulkTransComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmBulkTransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmBulkTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
