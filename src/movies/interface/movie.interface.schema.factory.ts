import { IEntitySchemaFactory } from "src/database/interface.entity-schema.factory";
import { Movies } from "../db/movie.entity";
import { MovieResponseDto } from "../dto/find-movie.dto";

export interface MovieInterfaceSchemaFactory extends IEntitySchemaFactory<Movies, MovieResponseDto> {
} 