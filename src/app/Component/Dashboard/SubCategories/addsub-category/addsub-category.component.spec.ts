import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsubCategoryComponent } from './addsub-category.component';

describe('AddsubCategoryComponent', () => {
  let component: AddsubCategoryComponent;
  let fixture: ComponentFixture<AddsubCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddsubCategoryComponent]
    });
    fixture = TestBed.createComponent(AddsubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
