import { IEntitySchemaFactory } from "src/database/interface.entity-schema.factory";
import { Genres } from "../db/genres.entity";
import { GenreResponseDto } from "../dto/find-genre.dto";

export interface GenreInterfaceSchemaFactory extends IEntitySchemaFactory<Genres, GenreResponseDto> {
} 