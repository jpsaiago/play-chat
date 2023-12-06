import { Injectable } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class RedisService {
  client: Redis;

  constructor() {
    this.client = new Redis(`${process.env.REDIS_URL}`);
  }

  destructor() {
    this.client.quit();
  }
}
