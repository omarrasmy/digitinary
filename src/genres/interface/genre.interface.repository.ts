import { IEntityRepository } from "src/database/interface.entity.repository";
import { FindOneOptions } from "typeorm";
import { Genres } from "../db/genres.entity";
import { GenreResponseDto } from "../dto/find-genre.dto";

export interface GenreInterfaceRepository extends IEntityRepository<Genres, GenreResponseDto> {
}