import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TemplateCreatorComponent } from './template-creator.component';

describe('TemplateCreatorComponent', () => {
  let component: TemplateCreatorComponent;
  let fixture: ComponentFixture<TemplateCreatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
