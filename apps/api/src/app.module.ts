import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UsersService } from "./users/users.service";
import { UsersModule } from "./users/users.module";
import { DatabaseService } from "./database/database.service";
import { AuthModule } from "./auth/auth.module";
import { FilesModule } from "./files/files.module";
import { RedisModule } from "./redis/redis.module";
import { SocketsGateway } from "./sockets/sockets.gateway";
import { SocketsModule } from "./sockets/sockets.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    FilesModule,
    RedisModule,
    SocketsModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService, DatabaseService, SocketsGateway],
})
export class AppModule {}
