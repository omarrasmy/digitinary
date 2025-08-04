import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { InternalUserDto } from 'src/users/dto/find-user.dto';
import { NotFoundException } from '@nestjs/common';
import { RedisService } from 'src/common/redis/redis.service';
import { RedisKey } from 'src/common/redis/enums/redis-key.enums';

describe('AuthService', () => {
  let service: AuthService;
  let mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };
  let mockUserService = {
    findOneInternal: jest.fn(),
  };
  let mockRedisService = {
    del: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks(); // ⬅️ important
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: UsersService, useValue: mockUserService } // Adjust this to match your actual user service token
        , { provide: RedisService, useValue: mockRedisService } // Adjust this to match your actual Redis service token
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return a token on successful login', async () => {
    const user: InternalUserDto = {
      id: 1,
      email: 'omar@gmail.com',
      name: 'Omar',
      password: '$2a$13$T2MAxzeF2XS19WCzFTifV.zV0PRmfINEiuzpOY6JnCNxxH/qn0WPC',
      wishlist: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const token = 'token123';
    mockUserService.findOneInternal.mockResolvedValue(user);
    mockJwtService.sign.mockReturnValue(token);
    mockRedisService.del.mockResolvedValue(undefined);
    jest.spyOn(service, 'generateAccessToken').mockReturnValue(token);
    jest.spyOn(service, 'comparePassword').mockReturnValue(true);
    const loginDto = { email: user.email, password: 'password123' };
    const result = await service.login(loginDto);

    expect(result).toEqual({
      accessToken: token,
      email: user.email,
      name: user.name,
    });

    expect(mockUserService.findOneInternal).toHaveBeenCalledWith({
      where: { email: loginDto.email },
    });
    expect(service.generateAccessToken).toHaveBeenCalledWith({
      id: user.id,
      email: user.email,
      name: user.name,
    });
    expect(service.comparePassword).toHaveBeenCalledWith(user.password, loginDto.password);
    expect(mockRedisService.del).toHaveBeenCalledWith(RedisKey.USER + user.id);
  });

  it('should throw an error if user not found', async () => {
    mockUserService.findOneInternal.mockRejectedValue(new NotFoundException('entity not found'));
    const loginDto = { email: 'omar@gmail.com', password: 'password123' };

    // Optional: spy if you want
    const spyCompare = jest.spyOn(service, 'comparePassword');
    const spyGenerate = jest.spyOn(service, 'generateAccessToken');

    await expect(service.login(loginDto)).rejects.toThrowError(new NotFoundException('entity not found'));

    expect(mockUserService.findOneInternal).toHaveBeenCalledWith({
      where: { email: loginDto.email },
    });

    expect(spyCompare).not.toHaveBeenCalled();
    expect(spyGenerate).not.toHaveBeenCalled();
    expect(mockJwtService.sign).not.toHaveBeenCalled();
  });
  it('should throw an error if password does not match', async () => {
    const user: InternalUserDto = {
      id: 1,
      email: 'omar@gmail.com',
      name: 'Omar',
      password: '$2a$13$T2MAxzeF2XS19WCzFTifV.zV0PRmfINEiuzpOY6JnCNxxH/qn0WPC',
      wishlist: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockUserService.findOneInternal.mockResolvedValue(user);
    jest.spyOn(service, 'comparePassword').mockImplementation(() => {
      throw new NotFoundException('invalid creadential');
    });
    const loginDto = { email: user.email, password: 'wrongpassword' };
    await expect(service.login(loginDto)).rejects.toThrowError(new NotFoundException('invalid creadential'));
    expect(mockUserService.findOneInternal).toHaveBeenCalledWith({
      where: { email: loginDto.email },
    });
    expect(service.comparePassword).toHaveBeenCalledWith(user.password, loginDto.password);
    expect(mockJwtService.sign).not.toHaveBeenCalled();
  }
  );
});
