import { Genres } from "src/genres/db/genres.entity";
import { MovieRates } from "src/movies/db/movie-rate.entity";
import { Movies } from "src/movies/db/movie.entity";
import { Users } from "src/users/db/user.entity";

const entities = {
  users: Users,
  genres: Genres,
  movies: Movies,
  movie_rates: MovieRates
};
export default entities;
