import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class OrdersGateway {
  @WebSocketServer()
  server: Server;

  sendOrderUpdate(orderData: any) {
    this.server.emit('orderUpdate', orderData);
  }
}

export default OrdersGateway;
