import { RequestsWithoutBodyEnum } from "src/helper/enums/requests.enum";
import { requests } from "src/helper/utilities/requests";
import { Movies } from "src/movies/db/movie.entity";
import { DataSource, In } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export default class MoviesSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const moviesRepository = dataSource.getRepository(Movies);
        //make it scheduled but it's only limited to 500 movies
        //and it will not update the existing movies
        console.log('Running Movie Seeder...');
        for (let i = 1; i <= 500; i++) {
            console.log(`Fetching movies from page ${i}...`);
            try {
                const result = await requests(
                    `${process.env.MOVIES_API}?page=${i}`,
                    undefined,
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.THE_MOVIE_DB_API_KEY}`,
                        },
                    },
                    RequestsWithoutBodyEnum.GET,
                );

                const movieIds = result.results.map((m: any) => m.id);
                const existingMovies = await moviesRepository.find({
                    where: { id: In(movieIds) },
                    select: ['id'],
                });
                const existingMovieIds = new Set(existingMovies.map(m => m.id));

                const newMovies = result.results
                    .filter((movie: any) => !existingMovieIds.has(movie.id))
                    .map((movie: any) =>
                        moviesRepository.create({
                            id: movie.id,
                            adult: movie.adult,
                            backdrop_path: movie.backdrop_path,
                            original_language: movie.original_language,
                            original_title: movie.original_title,
                            overview: movie.overview,
                            popularity: movie.popularity,
                            poster_path: movie.poster_path,
                            release_date: new Date(movie.release_date),
                            title: movie.title,
                            video: movie.video,
                            genres: movie.genre_ids.map((genreId: number) => {
                                return { id: genreId }
                            }),
                        }),
                    );

                if (newMovies.length > 0) {
                    await moviesRepository.save(newMovies);
                    console.log(`Inserted ${newMovies.length} new movies.`);
                }
            } catch (e) {
                console.error(`Error fetching movies from page ${i}:`, e);
                continue;
            }
        }
    }
}
