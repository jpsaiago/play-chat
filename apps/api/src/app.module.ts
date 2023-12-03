import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import { UsersModule } from "./users/users.module";
import { DatabaseService } from "./database/database.service";

@Module({
  imports: [ConfigModule.forRoot(), UsersModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, DatabaseService],
})
export class AppModule {}
