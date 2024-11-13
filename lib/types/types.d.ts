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

interface TransactionResponse {
  id: number;
  type: number;
  title: string;
  description: string;
  amount: number;
  tranDate: string;
}

interface ActionResult {
  status: number;
  message: string;
  data: any;
}
