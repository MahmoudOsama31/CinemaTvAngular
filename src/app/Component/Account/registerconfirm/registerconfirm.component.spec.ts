import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterconfirmComponent } from './registerconfirm.component';

describe('RegisterconfirmComponent', () => {
  let component: RegisterconfirmComponent;
  let fixture: ComponentFixture<RegisterconfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterconfirmComponent]
    });
    fixture = TestBed.createComponent(RegisterconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
