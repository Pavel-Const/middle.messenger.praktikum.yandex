import Handlebars from "handlebars";
import * as Components from "./components";
import { registerComponent } from "./core/registerComponent.ts";
import Router from "./core/Router.ts";
import {
  ChatsPage,
  LoginPage,
  PasswordEditPage,
  ProfileEditPage,
  ProfilePage,
  RegistrationPage
} from "./pages";

/* Object.entries(Components).forEach(([ name, component ]) => {
  if(['Input', 'Button'].includes(name)) {
    registerComponent(name, component);
    return;
  }
  Handlebars.registerPartial(name, component);

}); */

Handlebars.registerPartial("Form", Components.Form);

registerComponent("Button", Components.Button);
registerComponent("InputField", Components.InputField);
registerComponent("Input", Components.Input);
registerComponent("ErrorValid", Components.ErrorValid);
registerComponent("Link", Components.Link);
registerComponent("ErrorBlock", Components.ErrorBlock);
registerComponent("ProfileItem", Components.ProfileItem);
registerComponent("ProfileInput", Components.ProfileInput);
registerComponent("ChatItem", Components.ChatItem);
registerComponent("MessageItem", Components.MessageItem);

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
    /*  e.preventDefault();
      e.stopImmediatePropagation(); */
  }
});
