import { Movie } from "./Movie";
import { MovieActor } from "./MovieActor";
import { MovieLinks } from "./MovieLinks";

export interface MovieModel {
    movie: Movie;
    actors: MovieActor[];
    links: MovieLinks[];
}