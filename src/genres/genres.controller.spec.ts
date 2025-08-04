import { Test, TestingModule } from '@nestjs/testing';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';

describe('GenresController', () => {
  let controller: GenresController;
  let service: GenresService;

  const mockGenresService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenresController],
      providers: [GenresService],
    }).compile();

    controller = module.get<GenresController>(GenresController);
    service = module.get<GenresService>(GenresService);

  });




});
