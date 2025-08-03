import { IEntitySchemaFactory } from "src/database/interface.entity-schema.factory";
import { Movies } from "../db/movie.entity";
import { MovieResponseDto, MoviesQueryParams } from "../dto/find-movie.dto";
import { FindOneOptions } from "typeorm";

export interface MovieInterfaceSchemaFactory extends IEntitySchemaFactory<Movies, MovieResponseDto> {
} 