import { GenericFindAllDomainResponse } from "src/helper/dto/generic-domain-find-all-response.dto";
import { Mapper } from "@automapper/core";
import { DeepPartial } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";
import { Genres } from "./genres.entity";
import { GenreInterfaceSchemaFactory } from "../interface/genre.interface.schema.factory";
import { GenreResponseDto } from "../dto/find-genre.dto";

@Injectable()
export class GenreSchemaFactory implements GenreInterfaceSchemaFactory {
    constructor(@InjectMapper() private readonly mapper: Mapper) { }
    findAllToDto(data: Genres[], dataLength: number, count: number, page: number, take: number): GenericFindAllDomainResponse<GenreResponseDto> {
        let entities = this.mapper.mapArray(data, Genres, GenreResponseDto);
        return new GenericFindAllDomainResponse<GenreResponseDto>(
            entities,
            page,
            Math.ceil(count / take),
            count,
            dataLength
        );
    }
    createFromSchema(entitySchema: Genres): GenreResponseDto {
        return this.mapper.map(entitySchema, Genres, GenreResponseDto);
    }

    create(data: any): DeepPartial<Genres> {
        return;
        // return this.mapper.map(data, CreateGenreDto, Genres);
    }
}