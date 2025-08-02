import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Type,
    BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Reflector } from '@nestjs/core/services';
import { TRANSFORM_DTO_KEY } from '../decorator/transformation';
import { RedisService } from 'src/common/redis/redis.service';
@Injectable()
export class TransformInterceptor implements NestInterceptor {
    constructor(
        private readonly reflector: Reflector,
        @InjectMapper() private readonly mapper: Mapper,
        private readonly redisService: RedisService,
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const handler = context.getHandler();
        const request = context.switchToHttp().getRequest();
        let userPermissions = await this.redisService.get(`permission:${request.user.user.id}`)
        let transformation = this.reflector.get(TRANSFORM_DTO_KEY, handler);
        if (!transformation || !transformation.fromDto || !transformation.toDto)
            throw new BadRequestException("You Must Use TransformDto");
        else if (!request.authHierarchy || !Array.isArray(request.authHierarchy) || !userPermissions)
            return next.handle();

        return next.handle().pipe(
            map((data) => this.mapItem(data, transformation, userPermissions, request)),
        );
    }
    mapItem(data, transformation, userPermissions, request) {
        {
            if (!data)
                return
            let allowedPermissions = [];
            for (const auth of request.authHierarchy) {
                if (userPermissions[auth]) {
                    allowedPermissions = allowedPermissions.concat(userPermissions[auth]);
                }
            }
            // const symKey = crypto.randomBytes(32).toString('hex'); // Generate symmetric key
            // const encryptedSymKey = encryptSymmetricKey(symKey);
            // let encryptedPermissions = encryptPlainText(JSON.stringify(allowedPermissions), symKey);
            // encryptedPermissions.type = VariableTypeEnum.Array
            // encryptedPermissions.title = encryptedSymKey
            // Perform the transformation
            return this.mapper.map(data, transformation.fromDto, transformation.toDto, {
                extraArgs: () => ({ allowedPermissions })
            });
            // Log transformed data for debugging purposes

        }
    }
}
