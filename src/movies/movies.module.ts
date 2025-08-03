import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MOVIE_INTERFACE_REPOSITORY, MOVIE_INTERFACE_SCHEMA_FACTORY } from './interface/movies.tokens';
import { MoviesRepository } from './db/movie.repository';
import { MovieSchemaFactory } from './db/movie.schema.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from './db/movie.entity';
import { MoviesProfile } from 'src/automapper-profile/movies.profile';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService,
    {
      provide: MOVIE_INTERFACE_REPOSITORY,
      useClass: MoviesRepository // Assuming MovieInterfaceRepository is defined and imported
    },
    {
      provide: MOVIE_INTERFACE_SCHEMA_FACTORY,
      useClass: MovieSchemaFactory // Assuming MovieInterfaceSchemaFactory is defined and imported
    },
    MoviesProfile
  ],
  imports: [
    TypeOrmModule.forFeature([Movies]), // Assuming Movies is the entity class
  ]
})
export class MoviesModule { }
