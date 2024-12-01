"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HttpStatusTypes } from "@/lib/misc/constants";
import { HttpStatusCode } from "axios";
import LoadingSpinner from "../ui/loading-spinner";
import toast from "react-hot-toast";
import { login } from "@/lib/actions/auth/auth";

export function LoginForm() {
  const [data, setData] = useState<UserLoginRequest>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    setLoading(true);
    const res = await login(data);

    if (res.type === HttpStatusTypes.Success) {
      toast.success("Login successful");
      router.refresh();
    }

    if (res.type === HttpStatusTypes.ClientError) {
      if (res.status === HttpStatusCode.Unauthorized) {
        toast.error("Invalid email or password");
      }

      toast.error("An error occured while logging in");
    }

    if (res.type === HttpStatusTypes.Internal) {
      toast.error("Unexpected error occured, contact support");
    }
    setLoading(false);
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
            <Input id="email" type="email" placeholder="m@example.com" name="email" onChange={(e) => setData({ ...data, email: e.target.value })} required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" placeholder="Write your password" required onChange={(e) => setData({ ...data, password: e.target.value })} name="password" />
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
