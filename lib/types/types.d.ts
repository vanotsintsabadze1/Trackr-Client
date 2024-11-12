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

interface Transaction {
  type: number;
  title: string;
  description: string;
  amount: number;
}

interface ActionResult {
  status: number;
  message: string;
  data: any;
}
