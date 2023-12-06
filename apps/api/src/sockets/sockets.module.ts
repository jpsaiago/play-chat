import { Module } from "@nestjs/common";
import { SocketsGateway } from "./sockets.gateway";
import { UsersModule } from "../users/users.module";
import { DatabaseService } from "../database/database.service";
import { RedisModule } from "../redis/redis.module";
import { SocketsService } from "./sockets.service";

@Module({
  providers: [SocketsGateway, DatabaseService, SocketsService],
  imports: [UsersModule, RedisModule],
  exports: [SocketsService],
})
export class SocketsModule {}
