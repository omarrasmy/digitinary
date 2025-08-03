import { Movies } from "./movie.entity";
import { FindOneOptions, In, Repository } from "typeorm";
import { EntityRepository } from "src/database/entity.repository";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MovieResponseDto } from "../dto/find-movie.dto";
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
}