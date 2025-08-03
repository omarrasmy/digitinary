import { AutoMap } from "@automapper/classes";
import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { GenericFindAllDomainResponse } from "src/helper/dto/generic-domain-find-all-response.dto";

export class GenreResponseDto {
    @AutoMap()
    @ApiProperty({
        description: 'The unique identifier of the movie',
        example: 1,
    })
    id: number;
    @AutoMap()
    @ApiProperty({
        description: 'The title of the movie',
        example: 'Inception',
    })
    name: string;
}
export class GenreQueryParamsDto {
    @ApiProperty({
        description: 'The name of the genre to search for',
        example: 'Action',
        required: false,
    })
    @AutoMap()
    @IsOptional()
    name?: string;
    @ApiProperty({
        description: 'The page number for pagination',
        example: 1,
        required: false,
    })
    @AutoMap()
    @IsOptional()
    page?: number = 1;
    @ApiProperty({
        description: 'The number of items per page for pagination',
        example: 10,
        required: false,
    })
    @AutoMap()
    @IsOptional()
    limit?: number = 10;
}

@ApiExtraModels(GenreResponseDto)
export class GenreFindAllResponseForSwagger extends GenericFindAllDomainResponse<GenreResponseDto> {
    @ApiProperty({
        type: [GenreResponseDto],
    })
    data: GenreResponseDto[];
}