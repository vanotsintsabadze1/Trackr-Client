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

interface UserRegisterResponse {
  name: string;
  email: string;
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

interface StatusCheckerPayload<T> {
  status: number;
  type: 0 | 1 | 2;
  data: T | RequestError;
}

interface RequestError {
  code: string;
  title: string;
  traceId: string;
  status: number;
  type: string;
}

interface MoneySpentPayload {
  moneySpent: number;
  costLimit: number;
}
