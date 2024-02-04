import { getUser } from "./auth";
import Router from "../core/Router.ts";
import { getChats } from "./chat.ts";

const router = new Router("#app");

const initApp = async () => {
  let me = null;
  try {
    me = await getUser();
  } catch (error) {
    router.go("/");
    return;
  }

  const chats = await getChats();
  window.store.set({ user: me, chats });
  router.go("/messenger");
};
const initProfile = async () => {
  let me = null;
  try {
    me = await getUser();
  } catch (error) {
    console.error(error);
    router.go("/");
    return;
  }
  window.store.set({ user: me });
};

const initChatPage = async () => {
  let me = null;
  try {
    me = await getUser();
  } catch (error) {
    router.go("/");
    return;
  }
  const chats = await getChats();
  window.store.set({ user: me, chats });
};

export {
  initApp,
  initChatPage,
  initProfile
};
