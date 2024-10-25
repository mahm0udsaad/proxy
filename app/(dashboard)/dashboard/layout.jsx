import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../../../components/component/dashboard-sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-gray-100 w-full overflow-x-hidden">{children}</main>
    </SidebarProvider>
  );
}
