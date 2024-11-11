"use client";
import { Menu } from "lucide-react";
import { useSidebar } from "./sidebar";

export default function CustomSideBarTrigger() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <div className={`fixed top-0 left-0 w-full p-2 md:hidden`}>
      <button onClick={toggleSidebar}>
        <Menu size={30} color="white" />
      </button>
    </div>
  );
}
