import { ActorModel } from "./ActorModel";
import { Movie } from "./Movie";

export interface MovieActor {
    id: number;
    actorId: number;
    actor: ActorModel;
    movieId: number;
    movie: Movie;
}