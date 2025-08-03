import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './db/user.entity';
import { UsersRepository } from './db/user.repository';
import { UserSchemaFactory } from './db/user.schema.factory';
import { UsersProfile } from 'src/automapper-profile/users.profile';
import { USER_INTERFACE_REPOSITORY, USER_INTERFACE_SCHEMA_FACTORY } from './interface/users.tokens';
@Module({
  controllers: [UsersController],
  providers: [UsersService,
    { provide: USER_INTERFACE_REPOSITORY, useClass: UsersRepository },
    { provide: USER_INTERFACE_SCHEMA_FACTORY, useClass: UserSchemaFactory },
    UsersProfile
  ],
  imports: [
    TypeOrmModule.forFeature([Users]),
  ],
  exports: [UsersService],
})
export class UsersModule { }
