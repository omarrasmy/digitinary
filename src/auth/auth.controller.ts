import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { ApiAcceptedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginRequest } from './dto/login-request.dto';
import { LoginResponse } from './dto/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @Public()
  @ApiOperation({ summary: "Login" })
  @ApiBody({
    type: LoginRequest,
  })
  @ApiAcceptedResponse({ type: LoginResponse, description: 'Login successful' })
  @HttpCode(HttpStatus.ACCEPTED)
  async create(
    @Body() data: LoginRequest,
  ) {
    return this.authService.login(data);
  }

}
