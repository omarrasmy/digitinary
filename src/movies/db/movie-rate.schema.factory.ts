import { GenericFindAllDomainResponse } from "src/helper/dto/generic-domain-find-all-response.dto";
import { MovieInterfaceSchemaFactory } from "../interface/movie.interface.schema.factory";
import { Mapper } from "@automapper/core";
import { DeepPartial, FindOneOptions } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";
import { CreateMovieDto, CreateMovieRateDto } from "../dto/create-movie.dto";
import { MovieRatesInterfaceSchemaFactory } from "../interface/movie-rate.interface.schema.factory";
import { MovieRates } from "./movie-rate.entity";
import { MovieRateResponseDto } from "../dto/find-movie-rate.dto";

@Injectable()
export class MovieRateSchemaFactory implements MovieRatesInterfaceSchemaFactory {
    constructor(@InjectMapper() private readonly mapper: Mapper) { }
    findAllToDto(data: MovieRates[], dataLength: number, count: number, page: number, take: number): GenericFindAllDomainResponse<MovieRateResponseDto> {
        let entities = this.mapper.mapArray(data, MovieRates, MovieRateResponseDto);
        return new GenericFindAllDomainResponse<MovieRateResponseDto>(
            entities,
            page,
            count > (page * take) ? page + 1 : null,
            count,
            dataLength
        );
    }
    createFromSchema(entitySchema: MovieRates): MovieRateResponseDto {
        return this.mapper.map(entitySchema, MovieRates, MovieRateResponseDto);
    }

    create(data: CreateMovieRateDto): DeepPartial<MovieRates> {
        return this.mapper.map(data, CreateMovieRateDto, MovieRates);
    }
}