import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMessageComponent } from './system-message.component';

describe('SystemMessageComponent', () => {
  let component: SystemMessageComponent;
  let fixture: ComponentFixture<SystemMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
