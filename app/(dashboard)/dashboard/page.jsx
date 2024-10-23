"use client";
import React, { useState } from "react";
import {
  Search,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Globe,
  Power,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DashboardHeader from "@/components/component/dashboard-header";

export default function Dashboard() {
  const [viewMode, setViewMode] = useState("list");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [donglesPerPage, setDonglesPerPage] = useState("5");

  const exampleProxies = [
    {
      id: 1,
      country: "United States",
      connectionIp: "192.168.1.1",
      httpPort: 8080,
      socks5Port: 1080,
      credentials: "user:pass",
      rotationInterval: 300,
      modemStatus: "Connected",
      whitelistedIps: "10.0.0.1, 10.0.0.2",
    },
    {
      id: 2,
      country: "Germany",
      connectionIp: "192.168.1.2",
      httpPort: 8081,
      socks5Port: 1081,
      credentials: "user2:pass2",
      rotationInterval: 600,
      modemStatus: "Disconnected",
      whitelistedIps: "10.0.0.3",
    },
    {
      id: 3,
      country: "Japan",
      connectionIp: "192.168.1.3",
      httpPort: 8082,
      socks5Port: 1082,
      credentials: "user3:pass3",
      rotationInterval: 900,
      modemStatus: "Connected",
      whitelistedIps: "10.0.0.4, 10.0.0.5",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader title="Your Proxies" />
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search proxies"
                className="pl-10 pr-4 py-2 w-64"
              />
            </div>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Countries">All Countries</SelectItem>
                <SelectItem value="United States">United States</SelectItem>
                <SelectItem value="Germany">Germany</SelectItem>
                <SelectItem value="Japan">Japan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              onClick={() => setViewMode("cards")}
              className={
                viewMode === "cards"
                  ? "bg-blue-900 text-white"
                  : "bg-white text-black hover:text-white hover:bg-blue-900"
              }
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Cards
            </Button>
            <Button
              size="sm"
              onClick={() => setViewMode("list")}
              className={
                viewMode === "list"
                  ? "bg-blue-900 text-white"
                  : "bg-white text-black hover:text-white hover:bg-blue-900"
              }
            >
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Proxy List</CardTitle>
          </CardHeader>
          <CardContent>
            {viewMode === "list" ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Country</TableHead>
                    <TableHead className="font-semibold">ID#</TableHead>
                    <TableHead className="font-semibold">
                      Connection IP
                    </TableHead>
                    <TableHead className="font-semibold">HTTP Port</TableHead>
                    <TableHead className="font-semibold">SOCKS5 Port</TableHead>
                    <TableHead className="font-semibold">Credentials</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                    <TableHead className="font-semibold">
                      Rotation Interval (s)
                    </TableHead>
                    <TableHead className="font-semibold">
                      Modem Status
                    </TableHead>
                    <TableHead className="font-semibold">
                      Whitelisted IPs
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exampleProxies.map((proxy) => (
                    <TableRow key={proxy.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-2 text-blue-600" />
                          {proxy.country}
                        </div>
                      </TableCell>
                      <TableCell>{proxy.id}</TableCell>
                      <TableCell>{proxy.connectionIp}</TableCell>
                      <TableCell>{proxy.httpPort}</TableCell>
                      <TableCell>{proxy.socks5Port}</TableCell>
                      <TableCell>{proxy.credentials}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{proxy.rotationInterval}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            proxy.modemStatus === "Connected"
                              ? "success"
                              : "destructive"
                          }
                        >
                          <Power className="h-3 w-3 mr-1" />
                          {proxy.modemStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{proxy.whitelistedIps}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exampleProxies.map((proxy) => (
                  <Card key={proxy.id} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 mr-2 text-blue-600" />
                          <span className="font-semibold">{proxy.country}</span>
                        </div>
                        <Badge
                          variant={
                            proxy.modemStatus === "Connected"
                              ? "success"
                              : "destructive"
                          }
                        >
                          <Power className="h-3 w-3 mr-1" />
                          {proxy.modemStatus}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-semibold">ID:</span> {proxy.id}
                        </p>
                        <p>
                          <span className="font-semibold">IP:</span>{" "}
                          {proxy.connectionIp}
                        </p>
                        <p>
                          <span className="font-semibold">HTTP Port:</span>{" "}
                          {proxy.httpPort}
                        </p>
                        <p>
                          <span className="font-semibold">SOCKS5 Port:</span>{" "}
                          {proxy.socks5Port}
                        </p>
                        <p>
                          <span className="font-semibold">Rotation:</span>{" "}
                          {proxy.rotationInterval}s
                        </p>
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Dongles per page:</span>
            <Select value={donglesPerPage} onValueChange={setDonglesPerPage}>
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="5" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </main>

      <div className="fixed bottom-4 right-4">
        <Button
          variant="default"
          size="icon"
          className="rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
