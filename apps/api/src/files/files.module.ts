import { Module } from "@nestjs/common";
import { FilesService } from "./files.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  providers: [FilesService, JwtService],
  exports: [FilesService],
})
export class FilesModule {}
