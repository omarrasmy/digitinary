import { BadRequestException } from '@nestjs/common';
import { registerDecorator, ValidationOptions, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, IsOptional } from 'class-validator';

@ValidatorConstraint({ name: 'isNotEmptyIfPropertyEquals', async: false })
export class IsNotEmptyIfPropertyEqualsConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedProperty, condition,propertyName,object] = args.constraints;
    const relatedValue = (args.object as any)[relatedProperty];
    // IsOptional()(object, propertyName); // Invoke the IsOptional decorator to set the property as optional

    if (relatedValue === condition) {
      return true;
    }
    
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedProperty] = args.constraints;
    return `${args.property} is optional when ${relatedProperty} is not equal.`;
  }
}

export function IsNotEmptyIfPropertyEquals(property: string, conditionValue: any, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNotEmptyIfPropertyEqualsCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property, conditionValue,propertyName,object],
      options: validationOptions,
      validator: IsNotEmptyIfPropertyEqualsConstraint,
      async: false,

    });
    // IsOptional()(object, propertyName); // Invoke the IsOptional decorator to set the property as optional

  };
}
