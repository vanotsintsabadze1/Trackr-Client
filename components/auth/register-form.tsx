"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/actions/auth/auth";
import { HttpStatusTypes } from "@/lib/misc/constants";
import { HttpStatusCode } from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../ui/loading-spinner";

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
    const res = await register(data);

    if (res.type === HttpStatusTypes.Success) {
      toast.success("Account created successfully");
      router.push("/auth/login");
      return;
    }

    if (res.type === HttpStatusTypes.ClientError) {
      if (res.status === HttpStatusCode.Conflict) {
        toast.error("Email already in use");
        return;
      }

      toast.error("An error occured while creating account");
    }

    if (res.type === HttpStatusTypes.Internal) {
      toast.error("Unexpected error occured, contact support");
      return;
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
            <Input id="name" type="text" placeholder="John Doe" name="name" onChange={(e) => setData({ ...data, name: e.target.value })} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" name="email" onChange={(e) => setData({ ...data, email: e.target.value })} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Write your password" required onChange={(e) => setData({ ...data, password: e.target.value })} name="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Confirm Password</Label>
            <Input id="confirmPassword" type="password" placeholder="Write your password" name="confirmPassword" onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} required />
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
