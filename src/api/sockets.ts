import { HTTPTransport } from "../core/HTTPTransport.ts";

interface TokenResponse {
  token: string;
}

const socketApi = new HTTPTransport("/chats");

export const createWebSocket = async (chatId: number, userId: number | undefined) => {
  const resp = await socketApi.post(`/token/${chatId}`) as { response: string };
  const token = JSON.parse(resp.response).token as TokenResponse;
  const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

  socket.addEventListener("open", () => {
    console.log("Соединение установлено");

    socket.send(JSON.stringify({
      content: "0",
      type: "get old"
    }));
    const sendBtn = document.querySelector(".chat__contentSend");
    sendBtn?.addEventListener("click", () => {
      const input: HTMLInputElement = document.querySelector(".chat__contentBottom input") as HTMLInputElement;
      socket.send(JSON.stringify({
        content: input?.value,
        type: "message"
      }));
    });
  });

  socket.addEventListener("close", event => {
    if (event.wasClean) {
      console.log("Соединение закрыто чисто");
    } else {
      console.log("Обрыв соединения");
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  socket.addEventListener("message", event => {
    console.log("Получены данные", event.data);
    try {
      const data = JSON.parse(event.data);
      const state = window.store.getState();
      if (Array.isArray(data)) {
        window.store.set({
          ...state,
          messages: [...data]
        });
      } else {
        window.store.set({
          ...state,
          messages: [data, ...state.messages]
        });
      }
    } catch (error) {
      console.error("Ошибка при разборе JSON:", error);
    }

    const sendBtn = document.querySelector(".chat__contentSend");
    sendBtn?.addEventListener("click", () => {
      const input: HTMLInputElement = document.querySelector(".chat__contentBottom input") as HTMLInputElement;
      if (input.value.trim().length > 0) {
        socket.send(JSON.stringify({
          content: input?.value,
          type: "message"
        }));
      }
    });
  });

  socket.addEventListener("error", event => {
    console.log("Ошибка", event);
  });
};
