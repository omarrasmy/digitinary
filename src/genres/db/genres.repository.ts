import { FindOneOptions, In, Repository } from "typeorm";
import { EntityRepository } from "src/database/entity.repository";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Genres } from "./genres.entity";
import { GenreResponseDto } from "../dto/find-genre.dto";
import { GenreInterfaceRepository } from "../interface/genre.interface.repository";
import { GENRE_INTERFACE_SCHEMA_FACTORY } from "../interface/genres.tokens";
import { GenreInterfaceSchemaFactory } from "../interface/genre.interface.schema.factory";

@Injectable()
export class GenresRepository extends EntityRepository<Genres, GenreResponseDto> implements GenreInterfaceRepository {
    constructor(
        @InjectRepository(Genres)
        protected readonly repository: Repository<Genres>,
        @Inject(GENRE_INTERFACE_SCHEMA_FACTORY)
        protected readonly entitySchemaFactory: GenreInterfaceSchemaFactory,
    ) {
        super(repository, entitySchemaFactory);
    }
}