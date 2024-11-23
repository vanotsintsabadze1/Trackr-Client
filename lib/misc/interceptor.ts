"use server";

import { cookies } from "next/headers";
import { API_URL } from "./constants";
import axios, { InternalAxiosRequestConfig } from "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    requiresAuth?: boolean;
  }
}

interface InterceptorInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  requiresAuth?: boolean;
}

export const AxiosService = axios.create({
  baseURL: API_URL,
});

AxiosService.interceptors.request.use((config: InterceptorInternalAxiosRequestConfig) => {
  const token = cookies().get("token")?.value;
  if (config.requiresAuth && token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

AxiosService.interceptors.response.use((res) => {
  return res;
});
