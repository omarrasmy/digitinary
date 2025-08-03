import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadInterface as jwt } from '../interface/jwtPayload.interface';
export const JwtPayload = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user as jwt;
    },
);