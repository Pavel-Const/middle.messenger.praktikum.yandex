import AuthApi from "../api/auth";
import { CreateUser, LoginRequestData, UserDTO } from "../api/type";
import { apiHasError } from "../utils/apiHasError";
import { transformUser } from "../utils/apiTransformers";
import Router from "../core/Router.ts";

const authApi = new AuthApi();
const router = new Router("#app");
// eslint-disable-next-line consistent-return
const getUser = async () => {
  const responseUser = await authApi.me();
  if (apiHasError(responseUser)) {
    throw Error(responseUser.reason);
  }
  if (responseUser.response) {
    return transformUser(JSON.parse(responseUser.response) as UserDTO);
  }
};

const signin = async (data: LoginRequestData) => {
  const response = await authApi.login(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }
  const me = await getUser();
  window.store.set({ user: me });
  router.go("/messenger");
};

const signup = async (data: CreateUser) => {
  const response = await authApi.create(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  const me = await getUser();
  window.store.set({ user: me });
  router.go("/messenger");
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
