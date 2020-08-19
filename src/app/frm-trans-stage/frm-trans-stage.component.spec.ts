import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmTransStageComponent } from './frm-trans-stage.component';

describe('FrmTransStageComponent', () => {
  let component: FrmTransStageComponent;
  let fixture: ComponentFixture<FrmTransStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmTransStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmTransStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
