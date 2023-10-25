import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieLinkListComponent } from './movie-link-list.component';

describe('MovieLinkListComponent', () => {
  let component: MovieLinkListComponent;
  let fixture: ComponentFixture<MovieLinkListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieLinkListComponent]
    });
    fixture = TestBed.createComponent(MovieLinkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
