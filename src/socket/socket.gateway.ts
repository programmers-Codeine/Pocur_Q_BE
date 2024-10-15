import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class Gateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // 클라이언트가 연결될 때 호출
  handleConnection(client: Socket) {
    const restaurantId = client.handshake.query.restaurantId as string;
    if (restaurantId) {
      client.join(restaurantId); // 방 입장
      console.log(`클라이언트 ${client.id}가 레스토랑 ${restaurantId}에 연결됨`);
    }
  }

  // 클라이언트가 연결을 해제할 때 호출
  handleDisconnect(client: Socket) {
    const restaurantId = client.handshake.query.restaurantId as string;
    if (restaurantId) {
      client.leave(restaurantId); // 방 퇴장
      console.log(`클라이언트 ${client.id}가 레스토랑 ${restaurantId}에서 연결 해제됨`);
    }
  }

  // createOrder에서 호출
  sendOrderUpdate(restaurantId: string, orderData: any) {
    this.server.to(restaurantId).emit('orderUpdate', orderData); // 주문 정보를 전송
  }

  // 프론트엔드에서 placeCallRequest 이벤트로 데이터를 전달받는 메소드
  @SubscribeMessage('placeCallRequest')
  handlePlaceCallRequest(@MessageBody() data: any, @ConnectedSocket() client: Socket): void {
    const restaurantId = client.handshake.query.restaurantId as string; // 클라이언트에서 받은 restaurantId

    // 프론트에서 받은 데이터를 사용
    const callName = data.callName;
    const tableNum = data.tableNum;

    console.log(`새 콜 요청: ${callName}, 테이블 번호: ${tableNum}, 레스토랑 ID: ${restaurantId}`);

    // 'newCallRequest' 이벤트를 해당 레스토랑의 관리자에게 전송
    this.server.to(restaurantId).emit('newCallRequest', { callName, tableNum });
  }

  afterInit(server: Server) {
    console.log('WebSocket 서버 초기화 완료');
    console.log(`서버 인스턴스: ${server}`);
  }
}

export default Gateway;
