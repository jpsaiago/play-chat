import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { DatabaseService } from "../database/database.service";
import { FileService } from "../file/file.service";

@Module({
  providers: [UsersService, DatabaseService, FileService],
  exports: [UsersService],
})
export class UsersModule {}
