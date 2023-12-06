import {
  Controller,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { AuthGuard } from "../auth/auth.guard";
import { testAuthContract } from "../contract";
import { FilesService } from "./files.service";

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(AuthGuard)
  @TsRestHandler(testAuthContract)
  @UseInterceptors(FileInterceptor("profilePicture"))
  async handler(@UploadedFile() file: Express.Multer.File) {
    return tsRestHandler(testAuthContract, {
      testGuard: async (req) => {
        return {
          status: 200,
          body: {
            field: file.fieldname,
            username: req.body.username,
          },
        };
      },
    });
  }
}
