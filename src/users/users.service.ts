import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInterfaceRepository } from './interface/user.interface.repository';
import { UserInterfaceSchemaFactory } from './interface/user.interface.schema.factory';
import { FindOneOptions } from 'typeorm';
import { Users } from './db/user.entity';
import { InternalUserDto, UserResponseDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_INTERFACE_REPOSITORY, USER_INTERFACE_SCHEMA_FACTORY } from './interface/users.tokens';
import { RedisKey } from 'src/common/redis/enums/redis-key.enums';
import { RedisService } from 'src/common/redis/redis.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_INTERFACE_REPOSITORY)
    private readonly userInterfaceRepository: UserInterfaceRepository,
    private readonly redisService: RedisService // Assuming you have a Redis service for caching
  ) { }

  create(createUserDto: CreateUserDto) {
    return this.userInterfaceRepository.create(createUserDto);
  }
  findAll() {
    return this.userInterfaceRepository.findAll({});
  }
  async findOne(id: number): Promise<UserResponseDto> {
    // Check Redis cache first
    const cachedUser = await this.redisService.get<UserResponseDto>(RedisKey.USER + id);
    if (cachedUser) {
      return cachedUser;
    }
    // If not found in cache, fetch from database
    const user = await this.userInterfaceRepository.findOne({ where: { id }, relations: { wishlist: true } });
    // Store the fetched user in Redis cache
    await this.redisService.set(RedisKey.USER + id, user);
    return user;
  }
  findOneInternal(options: FindOneOptions<Users>): Promise<InternalUserDto> {
    return this.userInterfaceRepository.findOneInternal(options);
  }
  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    // Update the user in the database

    let user = await this.userInterfaceRepository.update(id, updateUserDto);
    // delete the cache after updating the user
    await this.redisService.del(RedisKey.USER + id);
    return user;
  }
  async softDelete(id: number): Promise<Users> {
    // Remove the user from Redis cache
    await this.redisService.del(RedisKey.USER + id);
    return this.userInterfaceRepository.softDelete({ where: { id } });
  }
  async addMovieToWishlist(id: number, movieId: number) {
    let user = await this.userInterfaceRepository.addMovieToWishlist(id, movieId);
    await this.redisService.del(RedisKey.USER + id);
    return user;
  }
  async deleteMovieToWishlist(id: number, movieId: number) {
    let user = await this.userInterfaceRepository.deleteMovieToWishlist(id, movieId);
    // Update the cache after deleting the movie from wishlist
    await this.redisService.del(RedisKey.USER + id);
    return user;
  }

}

