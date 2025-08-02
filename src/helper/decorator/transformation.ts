import { SetMetadata, Type } from '@nestjs/common';
import { FindOneResponse } from '../dto/find-one-request.dto';

export const TRANSFORM_DTO_KEY = 'transformDto';
export const TransformDto = <FromDto, ToDto extends FindOneResponse>(fromDto: Type<FromDto>, toDto: Type<ToDto>) =>
    SetMetadata(TRANSFORM_DTO_KEY, { fromDto, toDto });
