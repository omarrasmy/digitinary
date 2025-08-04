import { Test, TestingModule } from '@nestjs/testing';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';

describe('GenresController', () => {
  let controller: GenresController;

  const mockGenresService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenresController],
      providers: [GenresService,
        { provide: GenresService, useValue: mockGenresService }
      ],
    }).compile();

    controller = module.get<GenresController>(GenresController);
  });

  it('should return all genres', async () => {
    const genres = [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Comedy' },
    ];
    mockGenresService.findAll.mockResolvedValue(genres);

    const result = await controller.findAll({});

    expect(mockGenresService.findAll).toHaveBeenCalled();
    expect(result).toEqual(genres);
  });




});
