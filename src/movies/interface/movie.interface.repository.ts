import { IEntityRepository } from "src/database/interface.entity.repository";
import { FindOneOptions } from "typeorm";
import { Movies } from "../db/movie.entity";
import { MovieResponseDto, MoviesQueryParams } from "../dto/find-movie.dto";

export interface MovieInterfaceRepository extends IEntityRepository<Movies, MovieResponseDto> {
    createFromQueryParamToFindOptions(query: MoviesQueryParams): FindOneOptions<Movies>
}