import { Controller } from "@nestjs/common";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { authContract, usersContract } from "../contract";
import { UsersService } from "./users.service";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @TsRestHandler(authContract)
  async handler() {
    return tsRestHandler(usersContract, {
      addFriend: async () => {
        return { status: 201, body: "OK" };
      },
    });
  }
}
