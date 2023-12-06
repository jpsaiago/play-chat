import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UsersService } from "./users/users.service";
import { UsersModule } from "./users/users.module";
import { DatabaseService } from "./database/database.service";
import { AuthModule } from "./auth/auth.module";
import { RedisModule } from "./redis/redis.module";
import { SocketsGateway } from "./sockets/sockets.gateway";
import { SocketsModule } from "./sockets/sockets.module";
import { JwtModule } from "@nestjs/jwt";
import { FileService } from "./file/file.service";
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    RedisModule,
    SocketsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: "2 days",
      },
    }),
    FriendsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UsersService,
    DatabaseService,
    SocketsGateway,
    FileService,
  ],
})
export class AppModule {}
