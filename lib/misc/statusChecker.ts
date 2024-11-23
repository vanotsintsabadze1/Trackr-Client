import { HttpStatusCode } from "axios";
import { HttpStatusTypes } from "./constants";

export function checkStatus<T>(status: number, data: T | RequestError): StatusCheckerPayload<T | RequestError> {
  if (status >= 200 && status < 300) {
    return { status: status, type: HttpStatusTypes.Success, data: data as T };
  }

  if (status >= 400 && status < 500) {
    return { status: status, type: HttpStatusTypes.ClientError, data: data as RequestError };
  }

  if (status >= 500) {
    return { status: status, type: HttpStatusTypes.Internal, data: data as RequestError };
  }

  return { status: HttpStatusCode.InternalServerError, type: HttpStatusTypes.Internal, data: data as RequestError };
}
