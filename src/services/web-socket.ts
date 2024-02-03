interface IMessage {
  content: string;
  type: string;
}

interface IWebSocketService {
  socket: WebSocket | null;
  connect(chatId: number, userId: number | undefined, token: string): void;
  onOpen(): void;
  onMessage(event: MessageEvent): void;
  onClose(event: CloseEvent): void;
  onError(event: Event): void;
  sendMessage(content: string, type?: string): void;
}

class WebSocketService implements IWebSocketService {
  socket: WebSocket | null = null;

  connect(chatId: number, userId: number | undefined, token: string): void {
    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
    this.socket.addEventListener("open", this.onOpen.bind(this));
    this.socket.addEventListener("message", this.onMessage.bind(this));
    this.socket.addEventListener("close", this.onClose.bind(this));
    this.socket.addEventListener("error", this.onError.bind(this));
  }

  onOpen(): void {
    console.log("Соединение установлено");
  }

  onMessage(event: MessageEvent): void {
    console.log("Получены данные", event.data);
  }

  onClose(event: CloseEvent): void {
    if (event.wasClean) {
      console.log("Соединение закрыто чисто");
    } else {
      console.log("Обрыв соединения");
    }
    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  }

  onError(event: Event): void {
    console.log("Ошибка", event);
  }

  sendMessage(content: string, type: string = "message"): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ content, type }));
    }
  }
}
