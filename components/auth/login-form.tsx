"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkStatus } from "@/lib/misc/statusChecker";
import { API_URL, HttpStatusTypes } from "@/lib/misc/constants";
import axios, { AxiosError, HttpStatusCode } from "axios";
import LoadingSpinner from "../ui/loading-spinner";
import toast from "react-hot-toast";

export function LoginForm() {
  const [data, setData] = useState<UserLoginRequest>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // this is the only time we do fetch request on front-end since the cookies have to be set by the server side.
  // we could inject cookies on our own but it is not recommended since we might screw up options like secure, httpOnly, etc.

  async function handleLogin() {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/v1/User/Login`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      });

      const status = checkStatus(res.status);

      if (status.type === HttpStatusTypes.Success) {
        toast.success("Login successful");
        router.refresh();
        return;
      }
    } catch (error) {
      let status = (error as AxiosError).status;

      if (status === undefined) {
        toast.error("An error occurred. Please try again");
        return;
      }
      let checkedStatus = checkStatus(status);

      if (checkedStatus.type === HttpStatusTypes.ClientError) {
        if (checkedStatus.status === HttpStatusCode.Unauthorized) {
          toast.error("Invalid email or password");
          return;
        }
      }

      if (checkedStatus.type === HttpStatusTypes.Internal) {
        toast.error("An error occurred. Please try again");
        return;
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              name="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Write your password"
              required
              onChange={(e) => setData({ ...data, password: e.target.value })}
              name="password"
            />
          </div>
          <Button type="submit" className="w-full relative" onClick={handleLogin}>
            {loading ? <LoadingSpinner size={20} /> : "Login"}
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="underline">
            Register
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
