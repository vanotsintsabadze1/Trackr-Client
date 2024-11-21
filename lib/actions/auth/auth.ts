"use server";

import { axiosErrorHandler } from "@/lib/misc/axiosErrorHandler";
import { HttpStatusTypes } from "@/lib/misc/constants";
import { Ok, Problem } from "@/lib/misc/genericResponses";
import { AxiosService } from "@/lib/misc/interceptor";
import { checkStatus } from "@/lib/misc/statusChecker";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function login(user: UserLoginRequest) {
  try {
    const res = await AxiosService.post("v1/User/Login", user);
    const status = checkStatus(res.status);

    if (status.type === HttpStatusTypes.Success) {
      cookies().set("token", res.data);
    }

    console.log("something", res.data);

    return status.type === HttpStatusTypes.Success ? Ok(res.data) : Problem(res.status, res.statusText, res.data);
  } catch (error) {
    return await axiosErrorHandler(error as AxiosError);
  }
}

export async function register(user: UserRegisterRequest) {
  try {
    const res = await AxiosService.post("/v1/User/Register", user, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    const status = checkStatus<UserRegisterResponse>(res.status);

    return status;
  } catch (error) {
    return await axiosErrorHandler(error as AxiosError);
  }
}

export async function logout() {
  cookies().delete("session");

  return Ok();
}
