import { Users } from "./user.entity";
import { Repository } from "typeorm";
import { UserInterfaceRepository } from "./user.interface.repository";
import { UserInterfaceSchemaFactory } from "./user.interface.schema.factory";
import { UserResponseDto } from "../dto/find-user.dto";
import { EntityRepository } from "src/database/entity.repository";

export class UsersRepository extends EntityRepository<Users, UserResponseDto> implements UserInterfaceRepository {
    constructor(
        protected readonly repository: Repository<Users>,
        protected readonly entitySchemaFactory: UserInterfaceSchemaFactory,
    ) {
        super(repository, entitySchemaFactory);
    }
}