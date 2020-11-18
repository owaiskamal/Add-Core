import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmInstrumentSetupComponent } from './frm-instrument-setup.component';

describe('FrmInstrumentSetupComponent', () => {
  let component: FrmInstrumentSetupComponent;
  let fixture: ComponentFixture<FrmInstrumentSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmInstrumentSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmInstrumentSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
