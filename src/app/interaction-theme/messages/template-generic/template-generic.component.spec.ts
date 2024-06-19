import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateGenericComponent } from './template-generic.component';

describe('TemplateGenericComponent', () => {
  let component: TemplateGenericComponent;
  let fixture: ComponentFixture<TemplateGenericComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateGenericComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
