import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkMessageComponent } from './link-message.component';

describe('LinkMessageComponent', () => {
  let component: LinkMessageComponent;
  let fixture: ComponentFixture<LinkMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
