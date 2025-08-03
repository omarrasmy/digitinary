import { GenericFindAllDomainResponse } from "src/helper/dto/generic-domain-find-all-response.dto";
import { InternalUserDto, UserResponseDto } from "../dto/find-user.dto";
import { Users } from "./user.entity";
import { UserInterfaceSchemaFactory } from "../interface/user.interface.schema.factory";
import { Mapper } from "@automapper/core";
import { CreateUserDto } from "../dto/create-user.dto";
import { DeepPartial } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";

@Injectable()
export class UserSchemaFactory implements UserInterfaceSchemaFactory {
    constructor(@InjectMapper() private readonly mapper: Mapper) { }

    createFromSchemaInternal(entitySchema: Users): InternalUserDto {
        return this.mapper.map(entitySchema, Users, InternalUserDto);
    }
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
        return this.mapper.map(entitySchema, Users, UserResponseDto);
    }

    create(data: CreateUserDto): DeepPartial<Users> {
        return this.mapper.map(data, CreateUserDto, Users);
    }
}