import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimizedComponent } from './minimized.component';

describe('MinimizedComponent', () => {
  let component: MinimizedComponent;
  let fixture: ComponentFixture<MinimizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinimizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinimizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
