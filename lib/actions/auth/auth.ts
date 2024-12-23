"use server";

import { axiosErrorHandler } from "@/lib/misc/axiosErrorHandler";
import { HttpStatusTypes } from "@/lib/misc/constants";
import { Ok } from "@/lib/misc/genericResponses";
import { AxiosService } from "@/lib/misc/interceptor";
import { checkStatus } from "@/lib/misc/statusChecker";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function login(user: UserLoginRequest) {
  try {
    const res = await AxiosService.post("v1/user/login", user);
    const status = checkStatus<string>(res.status, res.data);

    if (status.type === HttpStatusTypes.Success) {
      cookies().set("token", res.data);
    }

    return status;
  } catch (error) {
    return await axiosErrorHandler(error as AxiosError);
  }
}

export async function register(user: UserRegisterRequest) {
  try {
    const res = await AxiosService.post("/v1/user/register", user, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    const status = checkStatus<UserRegisterResponse>(res.status, res.data);

    return status;
  } catch (error) {
    return await axiosErrorHandler(error as AxiosError);
  }
}

export async function logout() {
  cookies().delete("token");
  return Ok();
}
