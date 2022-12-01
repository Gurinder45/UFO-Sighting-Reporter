import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupHandlerComponent } from './popup-handler.component';

describe('PopupHandlerComponent', () => {
  let component: PopupHandlerComponent;
  let fixture: ComponentFixture<PopupHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupHandlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
