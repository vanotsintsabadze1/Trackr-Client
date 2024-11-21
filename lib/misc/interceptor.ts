"use server";

const isServer = typeof window === "undefined";

import { cookies } from "next/headers";
import { API_URL } from "./constants";
import axios from "axios";

function cookieInterceptor(req: any) {
  if (isServer) {
    const cookieString = cookies()
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");
    req.headers.cookie = cookieString;
  }

  return req;
}

export const AxiosService = axios.create({
  baseURL: API_URL,
});

AxiosService.interceptors.request.use(cookieInterceptor);

AxiosService.interceptors.response.use((res) => {
  return res;
});
