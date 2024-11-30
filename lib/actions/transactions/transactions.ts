"use server";

import { axiosErrorHandler } from "@/lib/misc/axiosErrorHandler";
import { AxiosService } from "@/lib/misc/interceptor";
import { checkStatus } from "@/lib/misc/statusChecker";
import { AxiosError } from "axios";

export async function addTransaction<T = TransactionResponse>(transaction: Transaction) {
  try {
    const res = await AxiosService.post("/v1/Transaction/AddTransaction", transaction, {
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
    const res = await AxiosService.get(`/v1/Transaction/GetLatestTransaction?transactionCount=${transactionCount}`, {
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
    const res = await AxiosService.get(`/v1/Transaction/GetUserTransactions?count=${count}&page=${page}`, {
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
    const res = await AxiosService.delete(`/v1/Transaction/DeleteTransaction/${transactionId}`, {
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
    const res = await AxiosService.put(`/v1/Transaction/EditTransaction/${transaction.id}`, transaction, {
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

export async function getMoneySpent<T = MoneySpentPayload>(): Promise<StatusCheckerPayload<T | RequestError>> {
  try {
    const res = await AxiosService.get("/v1/Transaction/GetMoneySpent", {
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
