import { Genres } from "src/genres/db/genres.entity";
import { RequestsWithoutBodyEnum } from "src/helper/enums/requests.enum";
import { requests } from "src/helper/utilities/requests";
import { Movies } from "src/movies/db/movie.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export default class GenresSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<void> {
        const genresReporitory = dataSource.getRepository(Genres);
        console.log('Running Genres...');
        let result = await requests(process.env.GENRES_API, undefined, {
            headers: {
                Authorization: `Bearer ${process.env.THE_MOVIE_DB_API_KEY}`
            }
        }, RequestsWithoutBodyEnum.GET,
        );
        for (const genre of result.genres) {
            const existingGenre = await genresReporitory.findOne({
                where: { id: genre.id }
            });
            if (existingGenre) {
                continue; // Skip if genre already exists
            }
            const genreEntity = genresReporitory.create({
                id: genre.id,
                name: genre.name
            });
            await genresReporitory.save(genreEntity);
        }
    }
}