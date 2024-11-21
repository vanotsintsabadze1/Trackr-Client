"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/actions/auth/auth";
import { checkStatus } from "@/lib/misc/statusChecker";
import toast from "react-hot-toast";
import LoadingSpinner from "../ui/loading-spinner";
import { HttpStatusTypes } from "@/lib/misc/constants";
import { AxiosError, HttpStatusCode } from "axios";

export function RegisterForm() {
  const router = useRouter();
  const [data, setData] = useState<UserRegisterRequest>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setLoading(true);
    try {
      const res = await register(data);
      const status = checkStatus(res.status);

      if (status.type === HttpStatusTypes.Success) {
        router.push("/auth/login");
        toast.success("Account created successfully! Please login to continue");
        return;
      }
    } catch (error) {
      const status = (error as AxiosError).response?.status;

      if (!status) {
        toast.error("Unexpected error occurred. Please contact support");
        return;
      }

      const response = checkStatus(status);

      if (response.type === HttpStatusTypes.ClientError) {
        if (response.status === HttpStatusCode.BadRequest) {
          toast.error("Invalid request. Please check your data and try again");
          return;
        }

        if (response.status === HttpStatusCode.Conflict) {
          toast.error("User already exists with given credentials");
          return;
        }
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
            <Label htmlFor="email">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              name="name"
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
          </div>
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Write your password"
              required
              onChange={(e) => setData({ ...data, password: e.target.value })}
              name="password"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Write your password"
              name="confirmPassword"
              onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
              required
            />
          </div>
          <Button type="submit" className="w-full" onClick={handleRegister}>
            {loading ? <LoadingSpinner size={20} /> : "Register"}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
