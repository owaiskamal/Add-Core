import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectFormComponent } from './object-form.component';

describe('ObjectFormComponent', () => {
  let component: ObjectFormComponent;
  let fixture: ComponentFixture<ObjectFormComponent>;

  beforeEach(async(() => {
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
