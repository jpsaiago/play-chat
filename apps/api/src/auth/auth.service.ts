import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { compare } from "bcrypt";
import { UsersService } from "../users/users.service";
import { LoginInputSchema, SignUpInputSchema } from "./auth.schema";
import { hash } from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async createUser(
    userInfo: SignUpInputSchema,
    profilePicture?: Express.Multer.File
  ) {
    const user = await this.usersService.createUser(
      {
        email: userInfo.email,
        username: userInfo.username,
        password: await hash(userInfo.password, 10),
        displayName: userInfo.displayName,
      },
      profilePicture
    );

    const token = await this.jwtService.signAsync({
      id: user.id,
      username: user.username,
    });
    return { token, ...user };
  }

  async authenticateUser(credentials: LoginInputSchema) {
    const user = await this.usersService.findOneUser(
      credentials.username,
      "username"
    );

    if (!user || !compare(credentials.password, user.password)) {
      throw new HttpException(
        "Senha ou usuário inválido",
        HttpStatus.UNAUTHORIZED
      );
    }

    const token = await this.jwtService.signAsync({
      id: user.id,
      username: user.username,
    });
    return { token, id: user.id, username: user.username };
  }
}
