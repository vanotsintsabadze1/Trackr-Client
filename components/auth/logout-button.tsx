"use client";

import { logout } from "@/lib/actions/auth/auth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogOutButton() {
  const router = useRouter();

  async function handleLogOut() {
    await logout();
    router.refresh();
  }

  return (
    <button onClick={handleLogOut} className="w-full h-full flex items-center gap-2">
      <LogOut size={17} />
      <span>Log out</span>
    </button>
  );
}
