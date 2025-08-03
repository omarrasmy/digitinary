import { createMap, forMember, mapFrom, Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { Genres } from "src/genres/db/genres.entity";
import { GenreResponseDto } from "src/genres/dto/find-genre.dto";
import { Movies } from "src/movies/db/movie.entity";
import { CreateMovieDto } from "src/movies/dto/create-movie.dto";
import { MovieResponseDto } from "src/movies/dto/find-movie.dto";

@Injectable()
export class MoviesProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, Movies, MovieResponseDto,
                forMember((des) => des.genres, mapFrom((src) => {
                    if (src.genres)
                        return mapper.mapArray(src.genres, Genres, GenreResponseDto);
                    return undefined
                }))
            );
            createMap(mapper, MovieResponseDto, Movies);
            createMap(mapper, CreateMovieDto, Movies)
        };
    }
}