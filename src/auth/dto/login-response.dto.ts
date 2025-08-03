import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseLoginResponse } from "./login-base-response.dto";

export class LoginResponse extends BaseLoginResponse {
  @ApiProperty({ example: 1 })
  @AutoMap()
  id: number;
  @ApiProperty({ example: "omar" })
  @AutoMap()
  name: string
  @ApiProperty({ example: "omarrasmy@gmail.com" })
  @AutoMap()
  email: string
}
