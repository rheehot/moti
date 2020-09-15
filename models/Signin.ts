import API from "../utils/API";

export default class Signin  {
  static api: API = new API();

  accessToken?: string;

  refreshToken?: string

  signUp?: boolean;

  public static postSignin ({ accessToken, body }: { accessToken: string; body: {snsType: string} }): Promise<Signin> {
    return this.api.post(`/v1/signin/`, body, {
      headers: { Authorization: accessToken },
    });
  }

}