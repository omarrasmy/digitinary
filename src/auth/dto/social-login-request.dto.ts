import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";

export class SocialLoginRequest {
    @ApiProperty({ example: "ya29.a0AWY7CkmsPTQUevyBYRM8438CGS8FqbsfLZgEQOxDziEwigZ_9QQBwgQvrm1rKLpLxIRJIcGlBhrgOv_PTPN-eRoONwGig0JtZhdWCCKd9GNg3X681FEWlRnyy2IpUuJdatoFtByhmEDYoM2xGYaXVfhKTG1GaCgYKAfQSARASFQG1tDrpGNzr1FnCT1DRB8SC_jDrKg0163" })
    access_token: string;
    // @ApiProperty({example:"google"})
    // @IsEnum(SocialLoginTypes)
    // token_type: string;
    @ApiProperty()
    @IsOptional()
    expires_in: number;
}