import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickRepliesComponent } from './quick-replies.component';

describe('QuickRepliesComponent', () => {
  let component: QuickRepliesComponent;
  let fixture: ComponentFixture<QuickRepliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickRepliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickRepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
