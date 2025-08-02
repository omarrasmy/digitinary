import { GenericFindAllDomainResponse } from "src/helper/dto/generic-domain-find-all-response.dto";
import { UserResponseDto } from "../dto/find-user.dto";
import { Users } from "./user.entity";
import { UserInterfaceSchemaFactory } from "./user.interface.schema.factory";
import { Mapper } from "@automapper/core";
import { CreateUserDto } from "../dto/create-user.dto";
import { DeepPartial } from "typeorm";

export class UserSchemaFactory implements UserInterfaceSchemaFactory {
    constructor(private readonly mapper: Mapper) { }
    findAllToDto(data: Users[], dataLength: number, count: number, page: number, take: number): GenericFindAllDomainResponse<UserResponseDto> {
        let entities = this.mapper.mapArray(data, UserResponseDto, Users);
        return new GenericFindAllDomainResponse<UserResponseDto>(
            entities,
            page,
            Math.ceil(count / take),
            count,
            dataLength
        );
    }
    createFromSchema(entitySchema: Users): UserResponseDto {
        return this.mapper.map(entitySchema, UserResponseDto, Users);
    }

    create(data: CreateUserDto): DeepPartial<Users> {
        return this.mapper.map(data, Users, CreateUserDto);
    }
}