import {
  Controller,
  HttpException,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Prisma } from "@prisma/client";
import { TsRestHandler, TsRestRequest, tsRestHandler } from "@ts-rest/nest";
import { authContract } from "../contract";
import { AuthService } from "./auth.service";
import { SignUpInputSchema } from "./auth.schema";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @TsRestHandler(authContract)
  @UseInterceptors(FileInterceptor("profilePicture"))
  async handler(
    @UploadedFile() file: Express.Multer.File,
    @TsRestRequest() request: { body: SignUpInputSchema }
  ) {
    return tsRestHandler(authContract, {
      createUser: async () => {
        try {
          const user = await this.authService.createUser(request.body, file);
          return {
            status: 201,
            body: user,
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
            body: user,
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
