import { Genres } from "src/genres/db/genres.entity";
import { Movies } from "src/movies/db/movie.entity";
import { Users } from "src/users/db/user.entity";

const entities = {
  users: Users,
  genres: Genres,
  movies: Movies
};
export default entities;
