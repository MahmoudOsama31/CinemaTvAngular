import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMovieActorComponent } from './edit-movie-actor.component';

describe('EditMovieActorComponent', () => {
  let component: EditMovieActorComponent;
  let fixture: ComponentFixture<EditMovieActorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMovieActorComponent]
    });
    fixture = TestBed.createComponent(EditMovieActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
