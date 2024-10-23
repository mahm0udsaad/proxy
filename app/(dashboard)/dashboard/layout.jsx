import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../../../components/component/dashboard-sidebar";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-gray-100 w-full overflow-x-hidden">{children}</main>
    </SidebarProvider>
  );
}
