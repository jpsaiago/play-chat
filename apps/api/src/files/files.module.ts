import { Module } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FilesController } from "./files.controller";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [FilesController],
  providers: [FilesService, JwtService],
  exports: [FilesService],
})
export class FilesModule {}
