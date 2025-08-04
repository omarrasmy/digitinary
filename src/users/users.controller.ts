import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, CreateUserWishlistDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiAcceptedResponse, ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserFindAllForSwagger, UserResponseDto } from './dto/find-user.dto';
import { ApiDocs } from 'src/helper/decorator/swagger';
import { GenericFindAllDomainResponse } from 'src/helper/dto/generic-domain-find-all-response.dto';
import { ParamCheck } from 'src/helper/decorator/check-parameters';
import { EntitiesEnum } from 'src/helper/enums/entities.enum';
import { JwtPayload } from 'src/auth/decorator/jwtPayload.decorator';
import { JwtPayloadInterface } from 'src/auth/interface/jwtPayload.interface';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiDocs({
    summary: 'Create User',
    body: CreateUserDto,
    response: UserResponseDto,
    statusCode: HttpStatus.CREATED,
    isPublic: true,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiDocs({
    summary: 'Get All Users',
    response: UserFindAllForSwagger,
    statusCode: HttpStatus.OK,
    isPublic: false,
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  @ApiDocs({
    summary: 'Get User by ID',
    response: UserResponseDto,
    statusCode: HttpStatus.OK,
    isPublic: false,
  })
  findMe(
    @JwtPayload() jwtPayload: { id: number }
  ) {
    return this.usersService.findOne(jwtPayload.id);
  }
  @Get(':id')
  @ApiDocs({
    summary: 'Get User by ID',
    response: UserResponseDto,
    statusCode: HttpStatus.OK,
    isPublic: false,
  })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  findOne(@ParamCheck({ tableName: [EntitiesEnum.USERS], paramsToCheck: ['id'] }) param: { id: number }) {
    return this.usersService.findOne(param.id);
  }

  @Patch('me')
  @ApiDocs({
    summary: 'Update User',
    body: UpdateUserDto,
    response: UserResponseDto,
    statusCode: HttpStatus.OK,
    isPublic: false,
  })
  updateMe(@JwtPayload() JwtPayload: JwtPayloadInterface, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(JwtPayload.id, updateUserDto);
  }

  @Patch(':id')
  @ApiDocs({
    summary: 'Update User by ID',
    body: UpdateUserDto,
    response: UserResponseDto,
    statusCode: HttpStatus.OK,
    isPublic: false,
  })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  update(@ParamCheck({ tableName: [EntitiesEnum.USERS], paramsToCheck: ['id'] }) param: { id: number }, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(param.id, updateUserDto);
  }
  @Delete(':id')
  @ApiDocs({
    summary: 'Delete User',
    statusCode: HttpStatus.NO_CONTENT,
    isPublic: false,
  })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  remove(@ParamCheck({ tableName: [EntitiesEnum.USERS], paramsToCheck: ['id'] }) param: { id: number }) {
    return this.usersService.softDelete(param.id);
  }
  @Post('me/movies/:movieId/wishlist')
  @ApiDocs({
    summary: 'Add Movie to Wishlist',
    response: UserResponseDto,
    statusCode: HttpStatus.CREATED,
    isPublic: false,
  })
  @ApiParam({ name: 'movieId', type: Number, description: 'Movie ID' })
  addMovieToWishlist(
    @JwtPayload() jwtPayload: { id: number },
    @ParamCheck({ tableName: [EntitiesEnum.MOVIES], paramsToCheck: ['movieId'] }) param: { movieId: number }
  ) {
    return this.usersService.addMovieToWishlist(jwtPayload.id, param.movieId);
  }
  @Delete('me/movies/:movieId/wishlist')
  @ApiDocs({
    summary: 'Remove Movie from Wishlist',
    response: UserResponseDto,
    statusCode: HttpStatus.NO_CONTENT,
    isPublic: false,
  })
  @ApiParam({ name: 'movieId', type: Number, description: 'Movie ID' })
  removeMovieFromWishlist(
    @JwtPayload() jwtPayload: { id: number },
    @ParamCheck({ tableName: [EntitiesEnum.MOVIES], paramsToCheck: ['movieId'] }) param: { movieId: number }
  ) {
    return this.usersService.deleteMovieToWishlist(jwtPayload.id, param.movieId);
  }
}
