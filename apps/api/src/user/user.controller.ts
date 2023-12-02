import { Controller } from "@nestjs/common";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { userContract } from "../contracts/user";

@Controller()
export class UserController {
  constructor() {}

  @TsRestHandler(userContract)
  async handler() {
    return tsRestHandler(userContract, {
      getExample: async () => {
        return { status: 200, body: "oi" };
      },
    });
  }
}
