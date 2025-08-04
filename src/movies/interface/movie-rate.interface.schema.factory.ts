import { IEntitySchemaFactory } from "src/database/interface.entity-schema.factory";
import { Movies } from "../db/movie.entity";
import { MovieRates } from "../db/movie-rate.entity";
import { MovieRateResponseDto } from "../dto/find-movie-rate.dto";

export interface MovieRatesInterfaceSchemaFactory extends IEntitySchemaFactory<MovieRates, MovieRateResponseDto> {
} 