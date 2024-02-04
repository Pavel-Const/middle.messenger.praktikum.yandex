import constants from "../constants";

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
};

interface IRequest {
  headers?: { [key: string]: string };
  method?: string;
  data?: any;
}

interface TokenResponse {
  token: string;
}
function queryStringify(data: { [key: string]: string }) {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class HTTPTransport {
  private apiUrl: string = "";

  constructor(apiPath: string) {
    this.apiUrl = `${constants.HOST}${apiPath}`;
  }

  get = (url: string, options: IRequest = {}) => {
    return this.request(`${this.apiUrl}${url}`, {
      ...options,
      method: METHODS.GET
    });
  };

  post = (url: string, options?: { data: any }) => {
    return this.request(`${this.apiUrl}${url}`, {
      ...options,
      method: METHODS.POST
    });
  };

  put = (url: string, options?: { data: any }) => {
    return this.request(`${this.apiUrl}${url}`, {
      ...options,
      method: METHODS.PUT
    });
  };

  delete = (url: string, options?: { data: any }) => {
    return this.request(`${this.apiUrl}${url}`, {
      ...options,
      method: METHODS.DELETE
    });
  };

  createWebSocket = async (chatId: number, userId: number | undefined) => {
    const resp = await this.post(`/token/${chatId}`) as { response: string };
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

      const data = JSON.parse(event.data);
      const state = window.store.getState();
      if (Array.isArray(data)) {
        window.store.set({
          ...state,
          messages: [...data] // Если data - массив, используем оператор spread для добавления его элементов
        });
      } else {
        window.store.set({
          ...state,
          messages: [data, ...state.messages] // Если data - объект, добавляем его как один элемент
        });
      }
      console.log(window.store.getState());
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

  request = (url: string, options: IRequest = {}, timeout = 5000) => {
    const {
      headers = {},
      method,
      data
    } = options;
    return new Promise(function (resolve, reject) {
      if (!method) {
        reject("No method");
        return;
      }
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;
      xhr.open(
        method,
        isGet && !!data && !(data instanceof FormData)
          ? `${url}${queryStringify(data)}`
          : url,
        true
      );
      xhr.withCredentials = true;

      if (!(data instanceof FormData)) {
        // Задайте заголовок Content-Type только если он явно указан
        // По умолчанию установите "application/json"
        if (!headers["Content-Type"]) {
          headers["Content-Type"] = "application/json";
        }
        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
        } else {
          reject(new Error(`${JSON.parse(xhr.response).reason}`));
        }
      };
      xhr.onabort = () => reject(new Error("Request was aborted by the user"));
      xhr.onerror = () => reject(new Error("Network error occurred"));
      xhr.ontimeout = () => reject(new Error("Request timed out"));
      xhr.timeout = timeout;
      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data instanceof FormData ? data : JSON.stringify(data));
      }
    });
  };
}
