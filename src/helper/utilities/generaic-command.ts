import { IValidationService } from "./validate_commands_request.interface";

export interface CommandAndQueryValidator<request, Validation extends IValidationService> {
    getValidator(): Validation;
}