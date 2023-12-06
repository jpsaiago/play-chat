import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { DatabaseService } from "../database/database.service";
import { FileService } from "../file/file.service";

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, DatabaseService, FileService],
  exports: [AuthService],
})
export class AuthModule {}
