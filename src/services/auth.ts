import AuthApi from "../api/auth";
import { CreateUser, LoginRequestData, UserDTO } from "../api/type";
import { apiHasError } from "../utils/apiHasError";
import { transformUser } from "../utils/apiTransformers";
import Router from "../core/Router.ts";

const authApi = new AuthApi();
const router = new Router("#app");
const getUser = async () => {
  const responseUser = await authApi.me();
  if (apiHasError(responseUser)) {
    throw Error(responseUser.reason);
  }
  return transformUser(JSON.parse(responseUser.response) as UserDTO);
};

const signin = async (data: LoginRequestData) => {
  const response = await authApi.login(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  const me = await getUser();

  window.store.set({ user: me });
  /* navigate("emails"); */
  router.go("/settings");
};

const signup = async (data: CreateUser) => {
  const response = await authApi.create(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  const me = await getUser();
  window.store.set({ user: me });
  router.go("/settings");
};

const logout = async () => {
  await authApi.logout();
  window.store.set({ user: null, chats: [] });
  router.go("/");
};

export {
  signin,
  signup,
  logout,
  getUser
};
