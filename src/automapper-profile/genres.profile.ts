import { createMap, Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { Genres } from "src/genres/db/genres.entity";
import { GenreResponseDto } from "src/genres/dto/find-genre.dto";


@Injectable()
export class GenresProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }


    override get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, Genres, GenreResponseDto);
            createMap(mapper, GenreResponseDto, Genres);
        };
    }
}
