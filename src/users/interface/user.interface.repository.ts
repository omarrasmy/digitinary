import { IEntityRepository } from "src/database/interface.entity.repository";
import { Users } from "../db/user.entity";
import { InternalUserDto, UserResponseDto } from "../dto/find-user.dto";
import { FindOneOptions } from "typeorm";

export interface UserInterfaceRepository extends IEntityRepository<Users, UserResponseDto> {
    findOneInternal(options: FindOneOptions<Users>): Promise<InternalUserDto>;
}