import { Users } from "./user.entity";
import { FindOneOptions, In, Repository } from "typeorm";
import { UserInterfaceRepository } from "../interface/user.interface.repository";
import { UserInterfaceSchemaFactory } from "../interface/user.interface.schema.factory";
import { InternalUserDto, UserResponseDto } from "../dto/find-user.dto";
import { EntityRepository } from "src/database/entity.repository";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { USER_INTERFACE_SCHEMA_FACTORY } from "../interface/users.tokens";

@Injectable()
export class UsersRepository extends EntityRepository<Users, UserResponseDto> implements UserInterfaceRepository {
    constructor(
        @InjectRepository(Users)
        protected readonly repository: Repository<Users>,
        @Inject(USER_INTERFACE_SCHEMA_FACTORY)
        protected readonly entitySchemaFactory: UserInterfaceSchemaFactory,
    ) {
        super(repository, entitySchemaFactory);
    }
    deleteMovieToWishlist(id: number, movieId: number): Promise<UserResponseDto> {
        return this.repository.createQueryBuilder()
            .relation(Users, "wishlist")
            .of(id)
            .remove(movieId)
            .then(() => this.findOne({ where: { id }, relations: ["wishlist"] }));
    }
    addMovieToWishlist(id: number, movieId: number): Promise<UserResponseDto> {
        return this.repository.createQueryBuilder()
            .relation(Users, "wishlist")
            .of(id)
            .add(movieId)
            .then(() => this.findOne({ where: { id }, relations: ["wishlist"] }));
    }
    async findOneInternal(options: FindOneOptions<Users>): Promise<InternalUserDto> {
        const entity = await this.repository.findOne(options);
        if (!entity) {
            throw new NotFoundException('User not found');
        }
        return this.entitySchemaFactory.createFromSchemaInternal(entity);
    }
}