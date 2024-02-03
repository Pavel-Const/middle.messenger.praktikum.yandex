import { HTTPTransport } from "../core/HTTPTransport.ts";
import {
  AddUserChat, APIError, ChatDTO, CreateChat, DeleteChat, WsChat
} from "./type";

const chatApi = new HTTPTransport("/chats");

export default class ChatApi {
  async create(data: CreateChat): Promise<void | APIError> {
    return chatApi.post("/", { data });
  }

  async getChats(): Promise<ChatDTO[] | APIError> {
    return chatApi.get("");
  }

  async delete(data: DeleteChat): Promise<ChatDTO[] | APIError> {
    return chatApi.delete("/", { data });
  }

  async addUser(data: {
    chatId: number;
    users: (number | undefined)[]
  }): Promise<ChatDTO[] | APIError> {
    return chatApi.put("/users", { data });
  }

  async createWS(data: { chatId: number; userId: number | undefined }): Promise<void | APIError> {
    return chatApi.createWebSocket(data.chatId, data.userId);
  }
}
