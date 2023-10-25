import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieActorListComponent } from './movie-actor-list.component';

describe('MovieActorListComponent', () => {
  let component: MovieActorListComponent;
  let fixture: ComponentFixture<MovieActorListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieActorListComponent]
    });
    fixture = TestBed.createComponent(MovieActorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
