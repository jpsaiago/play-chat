import { IsEmail, IsString } from "class-validator";

export class SignupDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  displayName: string;

  @IsString()
  password: string;
}
