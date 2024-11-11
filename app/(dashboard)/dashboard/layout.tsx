import CustomSideBarTrigger from "@/components/ui/custom-sidebar-button";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Calendar, Home, Notebook, Settings } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: Calendar,
    },
    {
      title: "Notes",
      url: "/notes",
      icon: Notebook,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ];

  return (
    <SidebarProvider>
      <main className="flex">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="text-white gap-4 font-medium">
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className="hover:bg-gray-400 transition-all duration-200 ease-in-out hover:text-black"
                      >
                        <Link href={item.url} className="w-full h-full flex">
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="text-center flex flex-col items-center gap-1">
            <span className="text-xs font-medium text-gray-300/50">
              Developed by Vano © 2024.
            </span>
            <Link
              href="/tos"
              className="text-[.6rem] font-medium text-gray-300/30 underline"
            >
              Terms of Service
            </Link>
            <span className="text-[.6rem] font-medium text-gray-300/50 pb-5">
              v1.0.0
            </span>
          </SidebarFooter>
        </Sidebar>
        <div className="fixed left-0 top-0 p-2 md:relative">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
