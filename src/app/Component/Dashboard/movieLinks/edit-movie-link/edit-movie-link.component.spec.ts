import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMovieLinkComponent } from './edit-movie-link.component';

describe('EditMovieLinkComponent', () => {
  let component: EditMovieLinkComponent;
  let fixture: ComponentFixture<EditMovieLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMovieLinkComponent]
    });
    fixture = TestBed.createComponent(EditMovieLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
