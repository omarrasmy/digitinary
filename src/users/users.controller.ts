import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiAcceptedResponse, ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/find-user.dto';
import { ApiDocs } from 'src/helper/decorator/swagger';
import { GenericFindAllDomainResponse } from 'src/helper/dto/generic-domain-find-all-response.dto';
import { ParamCheck } from 'src/helper/decorator/check-parameters';
import { EntitiesEnum } from 'src/helper/enums/entities.enum';

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
    response: GenericFindAllDomainResponse<UserResponseDto>,
    statusCode: HttpStatus.OK,
    isPublic: false,
  })
  findAll() {
    return this.usersService.findAll();
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
    return this.usersService.findOne({ where: { id: param.id } });
  }

  @Patch(':id')
  @ApiDocs({
    summary: 'Update User',
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
    return this.usersService.softDelete({ where: { id: param.id } });
  }
}
