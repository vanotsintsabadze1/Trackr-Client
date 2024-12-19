"use server";

import { axiosErrorHandler } from "@/lib/misc/axiosErrorHandler";
import { AxiosService } from "@/lib/misc/interceptor";
import { checkStatus } from "@/lib/misc/statusChecker";
import { AxiosError } from "axios";

export async function addTransaction<T = TransactionResponse>(transaction: Transaction) {
  try {
    const res = await AxiosService.post("/v1/transaction", transaction, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      requiresAuth: true,
    });

    const status = checkStatus<T>(res.status, res.data);

    return status;
  } catch (error) {
    return await axiosErrorHandler(error as AxiosError);
  }
}

export async function getLatestTransactions<T = TransactionResponse[]>(transactionCount: number) {
  try {
    const res = await AxiosService.get(`/v1/transaction/latest-transactions?transactionCount=${transactionCount}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      requiresAuth: true,
    });

    const status = checkStatus<T>(res.status, res.data);

    return status;
  } catch (error) {
    return await axiosErrorHandler(error as AxiosError);
  }
}

export async function getTransaction<T = TransactionResponse[]>(count: number, page: number) {
  try {
    const res = await AxiosService.get(`/v1/transaction/?count=${count}&page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      requiresAuth: true,
    });

    const status = checkStatus<T>(res.status, res.data);

    return status;
  } catch (error) {
    return await axiosErrorHandler(error as AxiosError);
  }
}

export async function deleteTransaction<T = TransactionResponse>(transactionId: number): Promise<StatusCheckerPayload<T | RequestError>> {
  try {
    const res = await AxiosService.delete(`/v1/transaction/${transactionId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      requiresAuth: true,
    });

    const status = checkStatus<T>(res.status, res.data);

    return status;
  } catch (error) {
    return await axiosErrorHandler(error as AxiosError);
  }
}

export async function editTransaction<T = TransactionResponse>(transaction: TransactionResponse): Promise<StatusCheckerPayload<T | RequestError>> {
  try {
    const res = await AxiosService.put(`/v1/transaction/${transaction.id}`, transaction, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      requiresAuth: true,
    });

    const status = checkStatus<T>(res.status, res.data);

    return status;
  } catch (error) {
    return await axiosErrorHandler(error as AxiosError);
  }
}

export async function getMoneySpent<T = MoneySpentPayload | RequestError>(): Promise<StatusCheckerPayload<MoneySpentPayload | RequestError>> {
  try {
    const res = await AxiosService.get("/v1/transaction/money-spent", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      requiresAuth: true,
    });

    const status = checkStatus<MoneySpentPayload>(res.status, res.data);

    return status;
  } catch (error) {
    return await axiosErrorHandler(error as AxiosError);
  }
}

// NOTICE: this has to be moved to the user actions :).

export async function updateCostLimit<T = UserRegisterResponse>(costLimit: number): Promise<StatusCheckerPayload<T | RequestError>> {
  try {
    const res = await AxiosService.patch(
      "/v1/user/cost-limit",
      { costLimit },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        requiresAuth: true,
      }
    );

    const status = checkStatus<T>(res.status, res.data);

    return status;
  } catch (error) {
    return await axiosErrorHandler(error as AxiosError);
  }
}

export async function getPreviousAndCurrentMonthExpenses<T = PreviousAndCurrentMonthExpenses>(): Promise<StatusCheckerPayload<T | RequestError>> {
  try {
    const res = await AxiosService.get("/v1/transaction/previous-and-current-month", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      requiresAuth: true,
    });

    const status = checkStatus<T>(res.status, res.data);

    return status;
  } catch (error) {
    return await axiosErrorHandler(error as AxiosError);
  }
}

export async function getBalance<T = BalancePayload>(): Promise<StatusCheckerPayload<T | RequestError>> {
  try {
    const res = await AxiosService.get("/v1/user/balance", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      requiresAuth: true,
    });

    const status = checkStatus<T>(res.status, res.data);

    return status;
  } catch (error) {
    return await axiosErrorHandler(error as AxiosError);
  }
}

export async function updateBalance<T = UserRegisterResponse>(balance: number): Promise<StatusCheckerPayload<T | RequestError>> {
  try {
    const res = await AxiosService.patch(
      "/v1/user/balance",
      { balance },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        requiresAuth: true,
      }
    );

    const status = checkStatus<T>(res.status, res.data);

    return status;
  } catch (error) {
    return await axiosErrorHandler(error as AxiosError);
  }
}

export async function getYearlyExpenses<T = YearlyExpense[]>(): Promise<StatusCheckerPayload<T | RequestError>> {
  try {
    const res = await AxiosService.get("/v1/transaction/yearly-expense", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      requiresAuth: true,
    });

    const status = checkStatus<T>(res.status, res.data);

    return status;
  } catch (error) {
    return await axiosErrorHandler(error as AxiosError);
  }
}
