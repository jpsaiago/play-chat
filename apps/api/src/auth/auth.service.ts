import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { compare } from "bcrypt";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { SignupDto } from "./DTO/signup.dto";
import { DatabaseService } from "../database/database.service";
import { FileService } from "../file/file.service";
import { LoginDto } from "./DTO/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly databaseService: DatabaseService,
    private readonly fileService: FileService
  ) {}

  async createUser(userInfo: SignupDto, profilePicture?: Express.Multer.File) {
    //Cria o usuário com os dados recebidos
    let profilePictureUrl: string | undefined = undefined;

    //Primeiro criamos o usuário, para garantir que imagens não sejam subidas sem um usuário correspondente
    const userWithoutPicture = await this.databaseService.user.create({
      data: {
        email: userInfo.email,
        password: userInfo.password,
        username: userInfo.username,
        displayName: userInfo.displayName,
        profilePicture: profilePictureUrl,
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        profilePicture: true,
      },
    });
    //Se uma foto for fornecida, faz o upload e armazena a url dela no banco de dados
    if (profilePicture) {
      profilePictureUrl = await this.fileService.uploadPicture(
        profilePicture,
        userInfo.username
      );

      const userWithPicture = await this.databaseService.user.update({
        where: { id: userWithoutPicture.id },
        data: { profilePicture: profilePictureUrl },
        select: {
          id: true,
          username: true,
          displayName: true,
          profilePicture: true,
        },
      });

      const token = await this.jwtService.signAsync({
        id: userWithPicture.id,
        username: userWithPicture.username,
      });
      return { token, ...userWithPicture };
    }
    const token = await this.jwtService.signAsync({
      id: userWithoutPicture.id,
      username: userWithoutPicture.username,
    });
    return { token, ...userWithoutPicture };
  }

  async authenticateUser(credentials: LoginDto) {
    const user = await this.databaseService.user.findUnique({
      where: {
        username: credentials.username,
      },
    });

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
    return {
      token,
      id: user.id,
      username: user.username,
      profilePicture: user.profilePicture,
      displayName: user.displayName,
    };
  }
}
