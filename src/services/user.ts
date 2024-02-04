import UserApi from "../api/user";
import { EditPassword, EditUser } from "../api/type";
import { apiHasError } from "../utils/apiHasError";

import Router from "../core/Router.ts";

const userApi = new UserApi();
const router = new Router("#app");
/* const getUser = async () => {
  const responseUser = await authApi.me();
  if (apiHasError(responseUser)) {
    throw Error(responseUser.reason);
  }
  return transformUser(JSON.parse(responseUser.response) as UserDTO);
}; */

const editProfile = async (data: EditUser) => {
  const response = await userApi.edit(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  router.go("/settings");
};
const editAvatar = async (data: FormData) => {
  const response = await userApi.avatar(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }
  router.go("/settings");
};
const editPassword = async (data: EditPassword) => {
  const response = await userApi.password(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }
  router.go("/settings");
};

export {
  editProfile,
  editAvatar,
  editPassword
};
