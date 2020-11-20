import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FrmlistComponent } from './frmlist.component';

describe('FrmlistComponent', () => {
  let component: FrmlistComponent;
  let fixture: ComponentFixture<FrmlistComponent>;

  beforeEach(waitForAsync(() => {
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
