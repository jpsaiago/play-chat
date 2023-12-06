import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { DatabaseService } from "../database/database.service";
import { FilesModule } from "../files/files.module";

@Module({
  imports: [FilesModule],
  controllers: [UsersController],
  providers: [UsersService, DatabaseService],
  exports: [UsersService],
})
export class UsersModule {}
