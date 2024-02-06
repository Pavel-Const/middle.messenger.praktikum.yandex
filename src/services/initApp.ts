import { getUser } from "./auth";
import Router from "../core/Router.ts";
import { getChats } from "./chat.ts";

const router = new Router("#app");

const initApp = async () => {
  const isRoot = window.location.pathname === "/";
  const isRegistration = window.location.pathname === "/sign-up";
  let me = null;
  try {
    me = await getUser();
  } catch (error) {
    if (!isRegistration) {
      router.go("/");
      return;
    }
  }
  const chats = await getChats();
  window.store.set({ user: me, chats });
  if (isRoot) {
    router.go("/messenger");
  }
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
  initChatPage
};
