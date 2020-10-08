import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmBulkTransComponent } from './frm-bulk-trans.component';

describe('FrmBulkTransComponent', () => {
  let component: FrmBulkTransComponent;
  let fixture: ComponentFixture<FrmBulkTransComponent>;

  beforeEach(async(() => {
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
