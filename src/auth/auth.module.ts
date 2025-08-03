import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService,

  ],
  imports: [
    // add jwt key and secret here if needed
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN_SECONDS },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule
  ],
})
export class AuthModule { }
