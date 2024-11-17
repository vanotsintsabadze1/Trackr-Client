"use server";

import { API_URL } from "./constants";
import axios, { InternalAxiosRequestConfig } from "axios";
import { cookies, headers } from "next/headers";

const token = cookies().get("token")?.value;

declare module "axios" {
  interface AxiosRequestConfig {
    requireAuth?: boolean;
  }
}

interface CustomInterceptorConfig extends InternalAxiosRequestConfig {
  requireAuth?: boolean;
}

export const AxiosService = axios.create({
  baseURL: API_URL,
});

AxiosService.interceptors.request.use((config: CustomInterceptorConfig) => {
  if (config.requireAuth && token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});
