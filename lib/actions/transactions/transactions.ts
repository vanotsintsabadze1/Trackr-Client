"use server";

import { InternalError, Ok, Problem } from "@/lib/misc/genericResponses";
import { AxiosService } from "@/lib/misc/interceptor";
import { checkStatus } from "@/lib/misc/statusChecker";

export async function addTransaction(transaction: Transaction) {
  try {
    let res = await AxiosService.post("/v1/Transaction/AddTransaction", transaction, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    return checkStatus(res.status) ? Ok(res.data) : Problem(res.status, res.statusText);
  } catch (error) {
    console.error(error);
    return InternalError();
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

    return checkStatus(res.status) ? Ok(res.data) : Problem(res.status, res.statusText);
  } catch (error) {
    console.error(error);
    return InternalError();
  }
}
