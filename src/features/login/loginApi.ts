import api from "../../app/api";

export interface ILoginRequest {
  username: string;
  password: string;
}

const login = (payload: ILoginRequest) => {
  return api.post("/auth/authenticate.php", {
    username: payload.username,
    password: payload.password,
  });
};

const LoginApi = {
  login,
};   

export default LoginApi;
