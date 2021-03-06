import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FrmCreateTransComponent } from './frm-create-trans.component';

describe('FrmCreateTransComponent', () => {
  let component: FrmCreateTransComponent;
  let fixture: ComponentFixture<FrmCreateTransComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmCreateTransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmCreateTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
