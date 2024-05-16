import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicatePostComponent } from './publicate-post.component';

describe('PublicatePostComponent', () => {
  let component: PublicatePostComponent;
  let fixture: ComponentFixture<PublicatePostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicatePostComponent]
    });
    fixture = TestBed.createComponent(PublicatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
