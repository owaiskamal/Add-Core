import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmCbsPostingComponent } from './frm-cbs-posting.component';

describe('FrmCbsPostingComponent', () => {
  let component: FrmCbsPostingComponent;
  let fixture: ComponentFixture<FrmCbsPostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmCbsPostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmCbsPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
