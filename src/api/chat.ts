import { HTTPTransport } from "../core/HTTPTransport.ts";
import {
  APIError, ChatDTO, CreateChat, DeleteChat
} from "./type";

const chatApi = new HTTPTransport("/chats");

export default class ChatApi {
  async create(data: CreateChat): Promise<void | APIError> {
    return chatApi.post("/", { data }) as Promise<APIError>;
  }

  async getChats(): Promise<any | APIError> {
    return chatApi.get("") as Promise<{} | APIError>;
  }

  async delete(data: DeleteChat): Promise<ChatDTO[] | APIError> {
    return chatApi.delete("/", { data }) as Promise<ChatDTO[] | APIError>;
  }

  async addUser(data: {
    chatId: number;
    users: (number | undefined)[]
  }): Promise<ChatDTO[] | APIError> {
    return chatApi.put("/users", { data }) as Promise<ChatDTO[] | APIError>;
  }

  async createWS(data: { chatId: number; userId: number | undefined }): Promise<void | APIError> {
    return chatApi.createWebSocket(data.chatId, data.userId);
  }
}
