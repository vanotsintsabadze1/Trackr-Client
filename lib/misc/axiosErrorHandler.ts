"use server";

import { AxiosError } from "axios";
import { checkStatus } from "./statusChecker";
import { HttpStatusTypes } from "./constants";

export async function axiosErrorHandler(error: AxiosError) {
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
    const statusPayload = checkStatus<RequestError>(error.response.status, error.response.data as RequestError);
    return statusPayload;
  }

  return {
    status: 500,
    type: HttpStatusTypes.Internal,
    data: {
      title: "Unexpected error occured",
      code: "UnexpectedError",
      status: 500,
      type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.1",
    } as RequestError,
  };
}
