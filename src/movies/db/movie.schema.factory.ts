import { GenericFindAllDomainResponse } from "src/helper/dto/generic-domain-find-all-response.dto";
import { MovieInterfaceSchemaFactory } from "../interface/movie.interface.schema.factory";
import { Mapper } from "@automapper/core";
import { DeepPartial, FindOneOptions } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";
import { Movies } from "./movie.entity";
import { MovieResponseDto, MoviesQueryParams } from "../dto/find-movie.dto";
import { CreateMovieDto } from "../dto/create-movie.dto";

@Injectable()
export class MovieSchemaFactory implements MovieInterfaceSchemaFactory {
    constructor(@InjectMapper() private readonly mapper: Mapper) { }
    findAllToDto(data: Movies[], dataLength: number, count: number, page: number, take: number): GenericFindAllDomainResponse<MovieResponseDto> {
        let entities = this.mapper.mapArray(data, Movies, MovieResponseDto);
        return new GenericFindAllDomainResponse<MovieResponseDto>(
            entities,
            page,
            count > (page * take) ? page + 1 : null,
            count,
            dataLength
        );
    }
    createFromSchema(entitySchema: Movies): MovieResponseDto {
        return this.mapper.map(entitySchema, Movies, MovieResponseDto);
    }

    create(data: CreateMovieDto): DeepPartial<Movies> {
        return this.mapper.map(data, CreateMovieDto, Movies);
    }
}