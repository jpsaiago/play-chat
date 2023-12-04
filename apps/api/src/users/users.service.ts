import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { SignUpInputSchema } from "../auth/auth.schema";

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createUser(userInfo: SignUpInputSchema) {
    const createdUser = await this.databaseService.user.create({
      data: {
        email: userInfo.email,
        password: userInfo.password,
        username: userInfo.username,
      },
      select: {
        id: true,
        username: true,
      },
    });
    return createdUser;
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
