import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DatabaseService } from "../database/database.service";
import { RedisService } from "../redis/redis.service";
import { Socket } from "socket.io";

@Injectable()
export class SocketsService {
  constructor(
    private jwtService: JwtService,
    private databaseService: DatabaseService,
    private redisService: RedisService
  ) {}

  async authenticateSocket(client: Socket) {
    const payload = this.jwtService.verify(client.handshake.auth.token);
    const user = await this.databaseService.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      return false;
    }

    await this.redisService.client
      .multi()
      .sadd("connected_users", user.id)
      .hset("socket_connections", user.id, client.id)
      .exec();

    return true;
  }

  async disconnectSocket(client: Socket) {
    const payload = await this.jwtService.verify(client.handshake.auth.token);
    await this.redisService.client
      .multi()
      .srem("connected_users", payload.id)
      .hdel("socket_connections", payload.id)
      .exec();
  }
}
