import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ObjectFormComponent } from './object-form.component';

describe('ObjectFormComponent', () => {
  let component: ObjectFormComponent;
  let fixture: ComponentFixture<ObjectFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
