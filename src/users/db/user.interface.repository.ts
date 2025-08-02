import { IEntityRepository } from "src/database/interface.entity.repository";
import { Users } from "./user.entity";
import { UserResponseDto } from "../dto/find-user.dto";

export interface UserInterfaceRepository extends IEntityRepository<Users, UserResponseDto> {
}