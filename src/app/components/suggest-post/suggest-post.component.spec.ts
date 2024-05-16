import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestPostComponent } from './suggest-post.component';

describe('SuggestPostComponent', () => {
  let component: SuggestPostComponent;
  let fixture: ComponentFixture<SuggestPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuggestPostComponent]
    });
    fixture = TestBed.createComponent(SuggestPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
