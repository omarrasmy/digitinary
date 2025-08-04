import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MOVIE_INTERFACE_REPOSITORY, MOVIE_INTERFACE_SCHEMA_FACTORY, MOVIE_RATES_INTERFACE_REPOSITORY, MOVIE_RATES_INTERFACE_SCHEMA_FACTORY } from './interface/movies.tokens';
import { MoviesRepository } from './db/movie.repository';
import { MovieSchemaFactory } from './db/movie.schema.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from './db/movie.entity';
import { MoviesProfile } from 'src/automapper-profile/movies.profile';
import { MovieRatesRepository } from './db/movie-rate.repository';
import { MovieRateSchemaFactory } from './db/movie-rate.schema.factory';
import { MovieRates } from './db/movie-rate.entity';

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
    MoviesProfile,
    {
      provide: MOVIE_RATES_INTERFACE_REPOSITORY,
      useClass: MovieRatesRepository // Assuming MovieRatesInterfaceRepository is defined and imported
    },
    {
      provide: MOVIE_RATES_INTERFACE_SCHEMA_FACTORY,
      useClass: MovieRateSchemaFactory // Assuming MovieRatesInterfaceSchemaFactory is defined and imported
    }
  ],
  imports: [
    TypeOrmModule.forFeature([Movies, MovieRates]), // Assuming Movies is the entity class
  ]
})
export class MoviesModule { }
