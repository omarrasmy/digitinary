import { BadRequestException } from '@nestjs/common';
import { registerDecorator, ValidationOptions, ValidationArguments, IsUUID, isDefined } from 'class-validator';
import validator from 'validator';

export function IsNotEmptyIfPropertySent(property: string, validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: 'isNotEmptyIfPropertySent',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedProperty] = args.constraints;
          const relatedValue = (args.object as any)[relatedProperty];
          // If the related property is equal to the specified condition value,
          // perform the IsNotEmpty validation on the current property
            if ((relatedValue && !value)) {
              throw new BadRequestException(`The ${propertyName} field is required.`);
          }
        return true;
        },
      },
    });
  };
}