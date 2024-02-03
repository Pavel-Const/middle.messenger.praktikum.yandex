import ChatApi from "../api/chat";
import { apiHasError } from "../utils/apiHasError";
const chatApi = new ChatApi();

const getChats = async () => {
  const responseChat = await chatApi.getChats();
  if (apiHasError(responseChat)) {
    throw Error(responseChat.reason);
  }
  return JSON.parse(responseChat.response);
};

const createChat = async (title: string) => {
  const response = await chatApi.create({ title });
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  const responseChat = await chatApi.getChats();
  if (apiHasError(responseChat)) {
    throw Error(responseChat.reason);
  }

  const chats = await getChats();
  window.store.set({ chats });
};

const deleteChat = async (chatId: number) => {
  const response = await chatApi.delete({ chatId });
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  const responseChat = await chatApi.getChats();
  if (apiHasError(responseChat)) {
    throw Error(responseChat.reason);
  }

  const chats = await getChats();
  window.store.set({ chats });
};
const addUserChat = async (chatId: number, userId: number | undefined) => {
  const response = await chatApi.addUser({ users: [userId], chatId });
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  const responseChat = await chatApi.getChats();
  if (apiHasError(responseChat)) {
    throw Error(responseChat.reason);
  }

  const chats = await getChats();
  window.store.set({ chats });
};

const addWsChat = async (chatId: number, userId: number | undefined) => {
  const response = await chatApi.createWS({ userId, chatId });
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  const responseChat = await chatApi.getChats();
  if (apiHasError(responseChat)) {
    throw Error(responseChat.reason);
  }

  const chats = await getChats();
  window.store.set({ chats });
};

export {
  createChat,
  getChats,
  deleteChat,
  addUserChat,
  addWsChat
};
