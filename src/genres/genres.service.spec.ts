import { Test, TestingModule } from '@nestjs/testing';
import { GenresService } from './genres.service';
import { GENRE_INTERFACE_REPOSITORY } from './interface/genres.tokens';
import { GenericFindAllDomainResponse } from 'src/helper/dto/generic-domain-find-all-response.dto';
import { GenreResponseDto } from './dto/find-genre.dto';

describe('GenresService', () => {
  let service: GenresService;
  let mockGenreRepository = {
    findAll: jest.fn(),
    createFromQueryParamToFindOptions: jest.fn().mockReturnValue({}),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenresService,
        { provide: GENRE_INTERFACE_REPOSITORY, useValue: mockGenreRepository }
      ],
    }).compile();

    service = module.get<GenresService>(GenresService);
  });

  it('should be defined', async () => {
    let result: GenericFindAllDomainResponse<GenreResponseDto> = {
      data: [
        {
          id: 1,
          name: 'Action',
        },
        {
          id: 2,
          name: 'Comedy',
        }
      ],
      totalCount: 0,
      count: 0,
      currentPage: 1,
      nextPage: null,
    };
    mockGenreRepository.findAll.mockResolvedValue(result);
    let user = await service.findAll({});
    expect(user).toEqual(result);
  });
});
