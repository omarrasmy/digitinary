import { IEntitySchemaFactory } from "src/database/interface.entity-schema.factory";
import { Users } from "../db/user.entity";
import { InternalUserDto, UserResponseDto } from "../dto/find-user.dto";

export interface UserInterfaceSchemaFactory extends IEntitySchemaFactory<Users, UserResponseDto> {
    createFromSchemaInternal(entitySchema: Users): InternalUserDto;
} 