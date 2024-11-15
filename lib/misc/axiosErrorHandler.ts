"use server";

import { AxiosError } from "axios";
import { checkStatus } from "./statusChecker";
import { HttpStatusTypes } from "./constants";
import { InternalError, Problem } from "./genericResponses";

export async function axiosErrorHandler(error: AxiosError, data?: any) {
  if (typeof error.response?.status !== "undefined") {
    console.error(error.response.status);
    console.error(error.response.statusText);
    console.error(error.response.data);
    console.error(error.response.headers);
  } else {
    console.error("No response from server");
    console.error(error.request);
  }

  if (typeof error.response?.status === "number") {
    const statusPayload = checkStatus(error.response.status);
    const isClientError = statusPayload.type === HttpStatusTypes.ClientError;
    return isClientError
      ? Problem(error.response?.status, error.response?.statusText, data || error.response?.data)
      : InternalError();
  }
  return InternalError();
}
