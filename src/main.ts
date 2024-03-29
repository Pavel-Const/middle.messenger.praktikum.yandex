import * as Components from "./components";
import { registerComponent } from "./core/registerComponent.ts";
import Router from "./core/Router.ts";
import { AppState } from "./type";
import { Store } from "./core/Store.ts";
import {
  ChatsPage,
  LoginPage,
  PasswordEditPage,
  ProfileEditPage,
  ProfilePage,
  RegistrationPage
} from "./pages";
import { initApp } from "./services/initApp.ts";

declare global {
  interface Window {
    store: Store<AppState>;
  }
}

const initState: AppState = {
  error: null,
  user: null,
  chats: [],
  messages: [],
  currentChat: {
    id: null,
    name: ""
  }
};
window.store = new Store<AppState>(initState);

registerComponent("Button", Components.Button);
registerComponent("InputField", Components.InputField);
registerComponent("Input", Components.Input);
registerComponent("ErrorValid", Components.ErrorValid);
registerComponent("Link", Components.Link);
registerComponent("ErrorBlock", Components.ErrorBlock);
registerComponent("ProfileItem", Components.ProfileItem);
registerComponent("ProfileInput", Components.ProfileInput);
registerComponent("ChatItem", Components.ChatItem);
registerComponent("MessageBlock", Components.MessageBlock);
registerComponent("MessageHead", Components.MessageHead);
registerComponent("MessageItem", Components.MessageItem);
registerComponent("Avatar", Components.Avatar);
registerComponent("AvatarField", Components.AvatarField);
registerComponent("CreateChat", Components.CreateChat);

const router = new Router("#app");

router.use("/", LoginPage)
  .use("/sign-up", RegistrationPage)
  .use("/settings", ProfilePage)
  .use("/settings-edit", ProfileEditPage)
  .use("/settings-password", PasswordEditPage)
  .use("/messenger", ChatsPage)
  .start();
document.addEventListener("click", e => {
  const page = (e.target as HTMLElement)?.getAttribute("page");
  if (page) {
    router.go(page);
  }
});
document.addEventListener("DOMContentLoaded", () => initApp());
