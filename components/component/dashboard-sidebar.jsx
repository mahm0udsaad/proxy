"use client";
import {
  File,
  HelpCircle,
  ShoppingBag,
  User,
  Settings,
  CreditCard,
  BookOpen,
  MessageSquare,
  Globe,
  Plus,
} from "lucide-react";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

// Menu items for different sections.
const proxyManagementItems = [
  {
    title: "Your Proxies",
    url: "#",
    icon: Globe,
    link: "main",
  },
  {
    title: "Add New Proxies",
    url: "#",
    icon: Plus,
    link: "/dashboard/add-proxy",
  },
  {
    title: "Billing & Renewals",
    url: "#",
    icon: CreditCard,
    link: "/dashboard/billing",
  },
];

const accountItems = [
  {
    title: "Your Account",
    url: "#",
    icon: User,
    link: "/dashboard/account",
  },
  {
    title: "Purchases",
    url: "#",
    icon: ShoppingBag,
    link: "/dashboard/purchases",
  },
];

const knowledgeDeskItems = [
  {
    title: "Documentation",
    url: "#",
    icon: BookOpen,
  },
  {
    title: "Contact Support",
    url: "#",
    icon: HelpCircle,
  },
];

const settingsItems = [
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Chat",
    url: "#",
    icon: MessageSquare,
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const pathname = usePathname();
  const pathnameList = pathname.split("/");
  console.log(pathnameList, pathnameList.length);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-white">
        {/* Logo */}
        <div className="p-4 flex items-center gap-2">
          <Image
            priority
            src={"/logo.png"}
            alt={"logo"}
            width={45}
            height={50}
            className="max-w-full h-auto"
          />
          {open && (
            <span className="text-black font-bold text-xl">PowerProxy</span>
          )}
        </div>

        {/* Proxy Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="border-b pb-1">
            Proxy Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {proxyManagementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.link === "main" ? "/dashboard" : item.link}
                      className={
                        item.link === "main" && pathnameList.length === 2
                          ? "text-blue-600 bg-blue-50"
                          : pathnameList.includes(item.link.split("/")[2])
                          ? "text-blue-600 bg-blue-50"
                          : "hover:text-blue-600 hover:bg-blue-50"
                      }
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="border-b pb-1">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.link}
                      className="hover:text-blue-600 hover:bg-blue-50"
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Knowledge Desk Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="border-b pb-1">
            Knowledge Desk
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {knowledgeDeskItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.link}
                      className="hover:text-blue-600 hover:bg-blue-50"
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings & Chat Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="border-b pb-1">
            Settings & Chat
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.link}
                      className="hover:text-blue-600 hover:bg-blue-50"
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="border-t flex items-end">
          <UserButton
            className={"size-12"}
            appearance={{
              elements: {
                userButtonAvatarBox: open ? "rounded-md" : "size-8 rounded-md",
              },
            }}
          />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
