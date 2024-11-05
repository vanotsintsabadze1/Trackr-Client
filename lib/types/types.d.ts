interface UserLoginRequest {
  email: string;
  password: string;
}

interface UserRegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
