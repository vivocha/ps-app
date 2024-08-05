import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateSystemComponent } from './template-system.component';

describe('SystemMessageComponent', () => {
  let component: TemplateSystemComponent;
  let fixture: ComponentFixture<TemplateSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
