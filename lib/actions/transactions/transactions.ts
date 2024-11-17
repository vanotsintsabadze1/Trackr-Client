"use server";

import { axiosErrorHandler } from "@/lib/misc/axiosErrorHandler";
import { HttpStatusTypes } from "@/lib/misc/constants";
import { Ok, Problem } from "@/lib/misc/genericResponses";
import { AxiosService } from "@/lib/misc/interceptor";
import { checkStatus } from "@/lib/misc/statusChecker";
import { AxiosError } from "axios";

export async function addTransaction(transaction: Transaction) {
  try {
    let res = await AxiosService.post("/v1/Transaction/AddTransaction", transaction, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    const status = checkStatus(res.status);

    return status.type === HttpStatusTypes.Success ? Ok(res.data) : Problem(res.status, res.statusText);
  } catch (error) {
    return await axiosErrorHandler(error as AxiosError);
  }
}

export async function getLatestTransactions(transactionCount: number) {
  try {
    let res = await AxiosService.get(`/v1/Transaction/GetLatestTransaction?transactionCount=${transactionCount}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    const status = checkStatus(res.status);

    return status.type === HttpStatusTypes.Success ? Ok(res.data) : Problem(res.status, res.statusText);
  } catch (error) {
    return await axiosErrorHandler(error as AxiosError);
  }
}

export async function getTransaction(count: number, page: number) {
  try {
    let res = await AxiosService.get(`/v1/Transaction/GetUserTransactions?count=${count}&page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    const status = checkStatus(res.status);

    return status.type === HttpStatusTypes.Success ? Ok(res.data) : Problem(res.status, res.statusText);
  } catch (error) {
    return await axiosErrorHandler(error as AxiosError);
  }
}
