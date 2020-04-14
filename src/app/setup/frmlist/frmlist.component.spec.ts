import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmlistComponent } from './frmlist.component';

describe('FrmlistComponent', () => {
  let component: FrmlistComponent;
  let fixture: ComponentFixture<FrmlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
