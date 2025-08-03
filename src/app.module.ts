import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guard/jwt-auth.guard';
import { QueryFailedExceptionFilter } from './database/exception.filter';
import { AccessTokenStrategy } from './auth/strategies/accessToken.strategy';
import { MoviesModule } from './movies/movies.module';
import { GenresModule } from './genres/genres.module';
import { RedisConfigModule } from './common/redis/redis.module';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    DatabaseModule,
    RedisConfigModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    MoviesModule,
    GenresModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: QueryFailedExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    // each route must have a parent or a child entity id
    // thier is no child entity after course
    AccessTokenStrategy,
  ],
})
export class AppModule { }
