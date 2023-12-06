import {
  Body,
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto } from "./DTO/signup.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { LoginDto } from "./DTO/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post("/signup")
  @HttpCode(201)
  @UseInterceptors(FileInterceptor("profilePicture"))
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(
    @Body() signupDto: SignupDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const user = await this.authservice.createUser(signupDto, file);
    return user;
  }

  @Post("/login")
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async authenticateUser(@Body() loginDto: LoginDto) {
    const user = await this.authservice.authenticateUser(loginDto);
    return user;
  }
}
