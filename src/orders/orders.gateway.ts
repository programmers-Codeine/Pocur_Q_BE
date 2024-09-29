import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class OrdersGateway {
  @WebSocketServer()
  server: Server;

  sendOrderUpdate(orderData: any) {
    this.server.emit('orderUpdate', orderData); // 클라이언트에게 주문 업데이트 전송
  }
}

export default OrdersGateway;
