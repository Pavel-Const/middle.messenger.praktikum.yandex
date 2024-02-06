import { HTTPTransport } from "../core/HTTPTransport.ts";
import {
  EditPassword, EditUser, SignUpResponse
} from "./type";

const userApi = new HTTPTransport("/user");

export default class UserApi {
  async edit(data: EditUser): Promise<SignUpResponse> {
    let result: SignUpResponse;
    result = await userApi.put("/profile", { data }) as SignUpResponse;
    return result;
  }

  async avatar(data: FormData): Promise<SignUpResponse> {
    let result: SignUpResponse;
    result = await userApi.put("/profile/avatar", { data }) as SignUpResponse;
    return result;
  }

  async password(data: EditPassword): Promise<SignUpResponse> {
    let result: SignUpResponse;
    result = await userApi.put("/password", { data }) as SignUpResponse;
    return result;
  }
}
