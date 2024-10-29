import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw, Globe } from "lucide-react";
import ProxyListRow from "@/components/component/proxy-list-row.jsx";
import DashboardHeader from "@/components/component/dashboard-header";
export default function ProxyListTable({ proxies }) {
  return (
    <>
      <DashboardHeader title="Proxy List" />
      <div className="custom-scrollbar overflow-x-auto bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[150px]">Actions</TableHead>
              <TableHead>IMEI</TableHead>
              <TableHead>Nick</TableHead>
              <TableHead>Ext IP</TableHead>
              <TableHead>Ports</TableHead>
              <TableHead>Model, Device</TableHead>
              <TableHead>SIM, Carrier</TableHead>
              <TableHead>Net Mode</TableHead>
              <TableHead>Signal, Data</TableHead>
              <TableHead>Modem IP</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proxies.map((proxy, index) => (
              <ProxyListRow key={index} proxy={proxy} />
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4 px-4">
        <div className="text-sm text-gray-600">
          Showing 1 to {proxies.length} of {proxies.length} entries
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            disabled
            className="text-gray-400 border-gray-300"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            className="text-blue-600 border-blue-300 hover:bg-blue-50"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
