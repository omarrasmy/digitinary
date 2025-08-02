import { IEntitySchemaFactory } from "src/database/interface.entity-schema.factory";
import { Users } from "./user.entity";
import { UserResponseDto } from "../dto/find-user.dto";

export interface UserInterfaceSchemaFactory extends IEntitySchemaFactory<Users, UserResponseDto> {

} 