import { HTTPTransport } from "../core/HTTPTransport.ts";
import {
  APIError, CreateUser, LoginRequestData, SignUpResponse, UserDTO
} from "./type";

const authApi = new HTTPTransport("/auth");

export default class AuthApi {
  async create(data: CreateUser): Promise<SignUpResponse> {
    let result: SignUpResponse;
    result = await authApi.post("/signup", { data }) as SignUpResponse;
    return result;
  }

  async login(data: LoginRequestData): Promise<void | APIError> {
    let result: void | APIError;
    result = await authApi.post("/signin", { data }) as void | APIError;
    return result;
  }

  async me(): Promise<UserDTO | APIError> {
    let result: UserDTO | APIError;
    result = await authApi.get("/user") as any | APIError;
    return result;
  }

  async logout(): Promise<void | APIError> {
    let result: void | APIError;
    result = await authApi.post("/logout") as void | APIError;
    return result;
  }
}
