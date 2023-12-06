import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { FileService } from "../file/file.service";

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly filesService: FileService
  ) {}

  async createUser(userInfo: any, profilePicture?: Express.Multer.File) {
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
      profilePictureUrl = await this.filesService.uploadPicture(
        profilePicture,
        userInfo.username
      );
      const userWithPicture = await this.databaseService.user.update({
        where: { id: userWithoutPicture.id },
        data: { profilePicture: profilePictureUrl },
      });
      return userWithPicture;
    }
    return userWithoutPicture;
  }

  async updateUser(
    userId: string,
    payload: {
      username?: string;
      password?: string;
      displayName?: string;
      profilePicture?: string;
    }
  ) {
    const updatedUser = await this.databaseService.user.update({
      where: {
        id: userId,
      },
      data: {
        ...payload,
      },
    });

    return updatedUser;
  }

  async findOneUser(query: string, findBy: "username" | "email" | "id") {
    switch (findBy) {
      case "id":
        return await this.databaseService.user.findUnique({
          where: {
            id: query,
          },
        });
      case "username":
        return await this.databaseService.user.findUnique({
          where: {
            username: query,
          },
        });
      case "email":
        return await this.databaseService.user.findUnique({
          where: {
            email: query,
          },
        });
    }
  }

  async getUsers() {
    try {
      const allUsers = await this.databaseService.user.findMany({
        select: { id: true },
      });
      return allUsers;
    } catch (error) {
      throw error;
    }
  }
}
