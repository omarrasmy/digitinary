import { extend } from "@automapper/core";
import { IValidationService } from "../utilities/validate_commands_request.interface";
import { CommandAndQueryValidator } from "../utilities/generaic-command";
export function ValidateRequest<Validation extends IValidationService>() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    let ValidationService: Validation;
    descriptor.value = async function (...args: any[]) {
      // Assuming the first argument is your command
      const command = args[0] as CommandAndQueryValidator<any, Validation>;
      ValidationService = command.getValidator();
      await ValidationService.validateRequest(command);
      // Proceed with the original method if validation passes
      return await originalMethod.apply(this, args);
    };
    return descriptor;
  };
}


