import { Movies } from "./movie.entity";
import { Between, FindManyOptions, FindOneOptions, FindOptionsWhere, ILike, In, LessThanOrEqual, Like, MoreThanOrEqual, Repository } from "typeorm";
import { EntityRepository } from "src/database/entity.repository";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MovieResponseDto, MoviesQueryParams } from "../dto/find-movie.dto";
import { MovieInterfaceRepository } from "../interface/movie.interface.repository";
import { MOVIE_INTERFACE_SCHEMA_FACTORY } from "../interface/movies.tokens";
import { MovieInterfaceSchemaFactory } from "../interface/movie.interface.schema.factory";

@Injectable()
export class MoviesRepository extends EntityRepository<Movies, MovieResponseDto> implements MovieInterfaceRepository {
    constructor(
        @InjectRepository(Movies)
        protected readonly repository: Repository<Movies>,
        @Inject(MOVIE_INTERFACE_SCHEMA_FACTORY)
        protected readonly entitySchemaFactory: MovieInterfaceSchemaFactory,
    ) {
        super(repository, entitySchemaFactory);
    }
    createFromQueryParamToFindOptions(query: MoviesQueryParams): FindOneOptions<Movies> {
        let whereOR: FindOptionsWhere<Movies>[] = [];
        let where: FindOptionsWhere<Movies> = {};
        let order = {};
        if (query.adult)
            where.adult = query.adult;


        if (query.search) {
            whereOR.push({ title: ILike(`%${query.search}%`) });
            whereOR.push({ overview: ILike(`%${query.search}%`) });
            whereOR.push({ original_title: ILike(`%${query.search}%`) });
        }
        if (query.genreId) {
            where.genres = {
                id: In(query.genreId)
            }
        }
        // if (query.releaseDate) {
        //     where.release_date = query.releaseDate;
        // }
        if (query.startReleaseDate && query.endReleaseDate) {
            where.release_date = Between(query.startReleaseDate, query.endReleaseDate);
        }
        else if (query.startReleaseDate && !query.endReleaseDate) {
            where.release_date = MoreThanOrEqual(query.startReleaseDate);
        }
        else if (!query.startReleaseDate && query.endReleaseDate) {
            where.release_date = LessThanOrEqual(query.endReleaseDate);
        }
        if (query.language) {
            where.original_language = query.language;
        }
        if (query.maxRating && query.minRating) {
            where.vote_average = Between(query.minRating, query.maxRating);
        }
        else if (query.maxRating && !query.minRating) {
            where.vote_average = LessThanOrEqual(query.maxRating);
        }
        else if (!query.maxRating && query.minRating) {
            where.vote_average = MoreThanOrEqual(query.minRating);
        }
        if (query.sort) {
            order = {
                [query.sort.split('.')[0]]: query.sort.split('.')[1] === 'asc' ? 'ASC' : 'DESC'
            }
        }
        whereOR.push(where);
        const options: FindManyOptions<Movies> = {
            where: whereOR,
            order
        };

        return options;
    }
}