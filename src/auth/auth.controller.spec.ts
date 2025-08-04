import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/login-request.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService = {
    login: jest.fn()
  }
  beforeEach(async () => {
    jest.clearAllMocks(); // ⬅️ important
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [

        { provide: AuthService, useValue: mockAuthService }
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the token on login', async () => {
    const result = {
      accessToken: 'token123sasdasdsadasdasd',
      email: 'omar@gmail.com',
      name: 'Omar',
    }
    mockAuthService.login.mockResolvedValue(result);
    const loginDto: LoginRequest = { email: 'omar@gmail.com', password: 'password123' };
    const response = await controller.create(loginDto);
    expect(response).toEqual(result);
    expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
  });
  it('should throw an error if login fails', async () => {
    mockAuthService.login.mockRejectedValue(new NotFoundException('invalid creadential'));
    const loginDto: LoginRequest = { email: 'omar@gmail.com', password: 'wrongpassword' };
    await expect(controller.create(loginDto)).rejects.toThrow(new NotFoundException('invalid creadential'));
    expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
  });
  // dto validation tests can be added here
  // it('should throw an error if email is not provided', async () => {
  //   const loginDto = { password: 'password123' };
  //   await expect(controller.create(loginDto as any)).rejects.toThrow(new BadRequestException('email is required'));
  //   expect(mockAuthService.login).not.toHaveBeenCalled();
  // });
  // it('should throw an error if password is not provided', async () => {
  //   const loginDto = { email: 'omar@gmail.com' };
  //   await expect(controller.create(loginDto as any)).rejects.toThrow(new BadRequestException('password is required'));
  //   expect(mockAuthService.login).not.toHaveBeenCalled();
  // });
});
