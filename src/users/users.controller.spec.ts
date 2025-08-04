import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
    addMovieToWishlist: jest.fn(),
    deleteMovieToWishlist: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create on service', async () => {
    const dto: CreateUserDto = { email: 'test@test.com', password: '123456', name: 'Test User' };
    await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should get all users', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should get user by ID', async () => {
    await controller.findOne({ id: 1 });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update user', async () => {
    const dto: UpdateUserDto = { name: 'Ali' };
    await controller.update({ id: 1 }, dto);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('should delete user', async () => {
    await controller.remove({ id: 1 });
    expect(service.softDelete).toHaveBeenCalledWith(1);
  });

  it('should add movie to wishlist', async () => {
    await controller.addMovieToWishlist({ id: 1 }, { movieId: 2 });
    expect(service.addMovieToWishlist).toHaveBeenCalledWith(1, 2);
  });

  it('should remove movie from wishlist', async () => {
    await controller.removeMovieFromWishlist({ id: 1 }, { movieId: 2 });
    expect(service.deleteMovieToWishlist).toHaveBeenCalledWith(1, 2);
  });
});
