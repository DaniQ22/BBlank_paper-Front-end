import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBeetwenUserComponent } from './chat-beetwen-user.component';

describe('ChatBeetwenUserComponent', () => {
  let component: ChatBeetwenUserComponent;
  let fixture: ComponentFixture<ChatBeetwenUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatBeetwenUserComponent]
    });
    fixture = TestBed.createComponent(ChatBeetwenUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
