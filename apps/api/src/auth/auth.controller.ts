import { Controller, HttpException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { authContract } from "../contract";
import { Prisma } from "@prisma/client";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @TsRestHandler(authContract)
  async handler() {
    return tsRestHandler(authContract, {
      createUser: async (req) => {
        try {
          const user = await this.authService.createUser(req.body);
          return {
            status: 201,
            body: { username: user.username, token: user.token, id: user.id },
          };
        } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
              return {
                status: 400,
                body: `Usuário inválido`,
              };
            }
          }
          return { status: 500, body: `${e}` };
        }
      },

      authenticateUser: async (req) => {
        try {
          const user = await this.authService.authenticateUser(req.body);
          return {
            status: 200,
            body: { username: user.username, token: user.token, id: user.id },
          };
        } catch (error) {
          if (error instanceof HttpException) {
            if (error.getStatus() === 400) {
              return { status: 400, body: error.message };
            }
          }
          return { status: 500, body: "Algo deu errado, tente novamente" };
        }
      },
    });
  }
}
