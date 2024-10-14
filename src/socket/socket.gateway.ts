import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class Gateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // 클라이언트가 연결될 때 호출
  handleConnection(client: Socket, ...args: any[]) {
    const restaurantId = client.handshake.query.restaurantId as string;
    if (restaurantId) {
      client.join(restaurantId); // 방 입장
    }
  }

  // 클라이언트가 연결을 해제할 때 호출
  handleDisconnect(client: Socket) {
    const restaurantId = client.handshake.query.restaurantId as string;
    if (restaurantId) {
      client.leave(restaurantId); // 방 퇴장
    }
  }

  // createOrder에서 호출
  sendOrderUpdate(restaurantId: string, orderData: any) {
    this.server.to(restaurantId).emit('orderUpdate', orderData); // 주문 정보를 전송
  }

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }
}

export default Gateway;
