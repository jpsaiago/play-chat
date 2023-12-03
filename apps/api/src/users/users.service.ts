import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { SignUpInputSchema } from "./users.schemas";
import { hashSync } from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createUser(input: SignUpInputSchema) {
    const createdUser = await this.databaseService.user.create({
      data: {
        email: input.email,
        password: hashSync(input.password, 10),
        username: input.username,
      },
    });
    return createdUser;
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
