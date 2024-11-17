import { HttpStatusCode } from "axios";
import { HttpStatusTypes } from "./constants";

export function checkStatus(status: number): StatusCheckerPayload {
  if (status >= 200 && status < 300) {
    return { status: status, type: HttpStatusTypes.Success };
  }

  if (status >= 400 && status < 500) {
    return { status: status, type: HttpStatusTypes.ClientError };
  }

  if (status >= 500) {
    return { status: status, type: HttpStatusTypes.Internal };
  }

  return { status: HttpStatusCode.InternalServerError, type: HttpStatusTypes.Internal };
}
