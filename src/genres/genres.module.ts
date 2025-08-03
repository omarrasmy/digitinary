import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { GENRE_INTERFACE_REPOSITORY, GENRE_INTERFACE_SCHEMA_FACTORY } from './interface/genres.tokens';
import { GenresRepository } from './db/genres.repository';
import { GenreSchemaFactory } from './db/genre.schema.factory';
import { GenresProfile } from 'src/automapper-profile/genres.profile';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genres } from './db/genres.entity';

@Module({
  controllers: [GenresController],
  providers: [
    GenresService,
    {
      provide: GENRE_INTERFACE_REPOSITORY,
      useClass: GenresRepository
    },
    {
      provide: GENRE_INTERFACE_SCHEMA_FACTORY,
      useClass: GenreSchemaFactory // Assuming GenresRepository implements the schema factory interface
    },
    GenresProfile
  ],
  imports: [
    TypeOrmModule.forFeature([Genres])
  ]
})
export class GenresModule { }
