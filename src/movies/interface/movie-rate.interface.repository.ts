import { IEntityRepository } from "src/database/interface.entity.repository";
import { FindOneOptions } from "typeorm";
import { MovieRates } from "../db/movie-rate.entity";
import { MovieRateResponseDto } from "../dto/find-movie-rate.dto";

export interface MovieRatesInterfaceRepository extends IEntityRepository<MovieRates, MovieRateResponseDto> {
    getAvarageRateByMovieId(movieId: number): Promise<{ avarageRate: number, count: number }>;
}