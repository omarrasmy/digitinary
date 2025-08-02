/* istanbul ignore file */
import {
  Mapper,
  MappingProfile,
  createMap
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Users } from 'src/users/db/user.entity';
import { UserResponseDto } from 'src/users/dto/find-user.dto';

@Injectable()
export class UsersProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, Users, UserResponseDto)
      createMap(mapper, UserResponseDto, Users);
    };
  }
}
