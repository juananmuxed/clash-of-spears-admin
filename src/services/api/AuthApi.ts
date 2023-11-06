import { LoginPayload, UserResponse } from "src/models/api/Auth";
import { User } from "src/models/api/Users";
import { clientApi } from "src/plugins/Axios";

const controller = 'auth';

export class AuthApi {
  async login(loginPayload: LoginPayload) {
    return clientApi.postClient<UserResponse>(controller, 'login', loginPayload);
  }

  async signup(user: User) {
    return clientApi.postClient<UserResponse>(controller, 'signup', user);
  }

  async refreshToken(refreshToken: string) {
    return clientApi.postClient<Omit<UserResponse, 'user'>>(controller, 'refresh-token', { refreshToken })
  }
}
