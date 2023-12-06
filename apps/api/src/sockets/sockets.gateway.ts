import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { SocketsService } from "./sockets.service";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class SocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private socketService: SocketsService) {}

  async handleConnection(client: Socket) {
    const isUserVerified = await this.socketService.authenticateSocket(client);
    if (!isUserVerified) {
      return client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    return await this.socketService.disconnectSocket(client);
  }

  @SubscribeMessage("connection")
  handleMessage(client: any, payload: any) {
    console.log("evento certo");
  }
}
