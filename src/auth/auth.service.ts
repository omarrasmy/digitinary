import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginRequest } from './dto/login-request.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtPayloadInterface } from './interface/jwtPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/common/redis/redis.service';
import { RedisKey } from 'src/common/redis/enums/redis-key.enums';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService, // Assuming you have a Redis service for caching
  ) { }
  async login(data: LoginRequest) {
    const user = await this.usersService.findOneInternal({
      where: {
        email: data.email
      }
    })
    this.comparePassword(user.password, data.password);
    let payload: JwtPayloadInterface = {
      email: user.email,
      id: user.id,
      name: user.name,
    }
    // delete user from cache
    await this.redisService.del(RedisKey.USER + user.id);
    return {
      accessToken: this.generateAccessToken(payload),
      email: user.email,
      name: user.name
    }
  }
  comparePassword(password, sentPassword): boolean {
    if (!bcrypt.compareSync(sentPassword, password))
      throw new NotFoundException('invalid creadential')
    return true
  }
  generateAccessToken(payload: JwtPayloadInterface): string {
    return this.jwtService.sign(payload);
  }
}
