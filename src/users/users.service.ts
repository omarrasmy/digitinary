import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInterfaceRepository } from './interface/user.interface.repository';
import { UserInterfaceSchemaFactory } from './interface/user.interface.schema.factory';
import { FindOneOptions } from 'typeorm';
import { Users } from './db/user.entity';
import { InternalUserDto, UserResponseDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_INTERFACE_REPOSITORY, USER_INTERFACE_SCHEMA_FACTORY } from './interface/users.tokens';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_INTERFACE_REPOSITORY)
    private readonly userInterfaceRepository: UserInterfaceRepository,
    @Inject(USER_INTERFACE_SCHEMA_FACTORY)
    private readonly userInterfaceSchemaFactory: UserInterfaceSchemaFactory
  ) { }

  create(createUserDto: CreateUserDto) {
    return this.userInterfaceRepository.create(createUserDto);
  }
  findAll() {
    return this.userInterfaceRepository.findAll({});
  }
  findOne(options: FindOneOptions<Users>): Promise<UserResponseDto> {
    return this.userInterfaceRepository.findOne(options);
  }
  findOneInternal(options: FindOneOptions<Users>): Promise<InternalUserDto> {
    return this.userInterfaceRepository.findOneInternal(options);
  }
  update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    return this.userInterfaceRepository.update(id, updateUserDto);
  }
  softDelete(findOption: FindOneOptions<Users>): Promise<Users> {
    return this.userInterfaceRepository.softDelete(findOption);
  }
}

