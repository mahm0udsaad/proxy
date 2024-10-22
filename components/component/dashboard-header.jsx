"use client";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

const DashboardHeader = ({ title }) => {
  return (
    <header className="bg-blue-900 text-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex gap-2">
          <SidebarTrigger className="text-2xl" />
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm">
            Balance: <span className="font-semibold">$0</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-black border-white hover:bg-blue-800"
          >
            Add Funds
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-blue-800"
          >
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
export default DashboardHeader;
