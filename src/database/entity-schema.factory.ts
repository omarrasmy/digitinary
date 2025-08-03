// import { GenericFindAllDomainResponse } from "src/helper/dto/generic-domain-find-all-response.dto";
// import { IdentifiableEntitySchema } from "./identifiable-entity.schema";
// import { Constructor, Mapper, ModelIdentifier } from "@automapper/core";
// import { DeepPartial } from "typeorm";

// export abstract class entitySchemaFactory<
//     TSchema extends IdentifiableEntitySchema,
//     TEntity extends object
// > {
//     constructor(
//         private readonly mapper: Mapper,
//         private readonly entityClass: ModelIdentifier<TEntity>,   // Output DTO class
//         private readonly schemaClass: ModelIdentifier<TSchema>    // Entity class
//     ) { }
//     findAllToDto(data: TSchema[], dataLength: number, count: number, page: number, take: number): GenericFindAllDomainResponse<UserResponseDto> {
//         let entities = this.mapper.mapArray(data,, Constructor<TSchema>);
//         return new GenericFindAllDomainResponse<TEntity>(
//             entities,
//             page,
//             Math.ceil(count / take),
//             count,
//             dataLength
//         );
//     }
//     createFromSchema(entitySchema: TSchema): TEntity {
//         return this.mapper.map(entitySchema, this.entityClass, this.schemaClass);
//     }

//     create(data: object): DeepPartial<TSchema> {
//         return this.mapper.map(data, this.schemaClass, this.entityClass);
//     }
// }