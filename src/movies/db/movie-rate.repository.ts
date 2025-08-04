import { Movies } from "./movie.entity";
import { Between, FindManyOptions, FindOneOptions, FindOptionsWhere, ILike, In, LessThanOrEqual, Like, MoreThanOrEqual, Repository } from "typeorm";
import { EntityRepository } from "src/database/entity.repository";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MovieRatesInterfaceRepository } from "../interface/movie-rate.interface.repository";
import { MovieRatesInterfaceSchemaFactory } from "../interface/movie-rate.interface.schema.factory";
import { MovieRates } from "./movie-rate.entity";
import { MovieRateResponseDto } from "../dto/find-movie-rate.dto";
import { MOVIE_RATES_INTERFACE_SCHEMA_FACTORY } from "../interface/movies.tokens";

@Injectable()
export class MovieRatesRepository
    extends EntityRepository<MovieRates, MovieRateResponseDto> implements MovieRatesInterfaceRepository {
    constructor(
        @InjectRepository(MovieRates)
        protected readonly repository: Repository<MovieRates>,
        @Inject(MOVIE_RATES_INTERFACE_SCHEMA_FACTORY)
        protected readonly entitySchemaFactory: MovieRatesInterfaceSchemaFactory,
    ) {
        super(repository, entitySchemaFactory);
    }
    getAvarageRateByMovieId(movieId: number): Promise<{ avarageRate: number; count: number; }> {
        return this.repository
            .createQueryBuilder("movieRate")
            .select("AVG(movieRate.rate)", "avarageRate")
            .addSelect("COUNT(movieRate.id)", "count")
            .where("movieRate.moviesId = :movieId", { movieId })
            .getRawOne();
    }
}