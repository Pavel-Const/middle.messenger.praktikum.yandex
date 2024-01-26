import * as Pages from "../pages";

const pages: { [key: string]: typeof Pages[keyof typeof Pages] } = {
  login: Pages.LoginPage,
  registration: Pages.RegistrationPage,
  404: Pages.NotFoundPage,
  500: Pages.ServerErrorPage,
  profile: Pages.ProfilePage,
  "edit-profile": Pages.ProfileEditPage,
  "change-password": Pages.PasswordEditPage,
  chats: Pages.ChatsPage
};

export function navigate(page: string) {
  const app = document.getElementById("app");
  const Component = pages[page];
  const component = new Component();
  /*  if (app) {
    app.innerHTML = "";
  } */
  app?.append(component.getContent()!);
}
