import { Controller } from "@nestjs/common";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { usersContract } from "../contracts/users";
import { UsersService } from "./users.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @TsRestHandler(usersContract)
  async handler() {
    return tsRestHandler(usersContract, {
      createUser: async (req) => {
        try {
          const user = await this.usersService.createUser(req.body);
          return { status: 201, body: { id: user?.id } };
        } catch (error) {
          if (error instanceof PrismaClientKnownRequestError) {
            return { status: 400, body: `${error.code}` };
          }
          return { status: 400, body: "Eh..." };
        }
      },
      authenticateUser: async () => {
        return {
          status: 200,
          body: {
            email: "teste@teste.com",
            id: "18y321uih23",
            username: "teste",
          },
        };
      },
      getUsers: async () => {
        const users = await this.usersService.getUsers();
        return { status: 200, body: users };
      },
    });
  }
}
