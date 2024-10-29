import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Globe,
  Check,
  Wifi,
  Trash,
  MoreVertical,
  Edit,
  Download,
  Power,
  RotateCw,
  Plus,
  X,
  Key,
  Clock,
  Activity,
  Zap,
} from "lucide-react";
import { TableCell, TableRow } from "../ui/table";

export default function ProxyListRow({ proxy }) {
  return (
    <TableRow className="hover:bg-blue-50 transition-colors duration-200">
      <TableCell className="py-4">
        <div className="font-medium">{proxy.modem_details.IMEI}</div>
      </TableCell>
      <TableCell className="py-4">
        <Badge
          variant="outline"
          className={
            proxy.net_details.IS_ONLINE === "yes"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }
        >
          {proxy.net_details.IS_ONLINE === "yes" ? "Active" : "Inactive"}
        </Badge>
      </TableCell>
      <TableCell className="py-4">
        <div className="flex flex-col items-center space-y-1">
          {/* <img
          src={`https://flagcdn.com/w40/${proxy.net_details.COUNTRYCODE}.png`}
          width="40"
          alt={`Flag of ${proxy.net_details.COUNTRY}`}
          className="rounded"
        /> */}
          <span className="text-sm">{proxy.net_details.COUNTRY}</span>
        </div>
      </TableCell>
      <TableCell className="py-4 font-mono">
        {proxy.net_details.EXT_IP}
      </TableCell>
      <TableCell className="py-4">
        <div className="flex flex-col space-y-1">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            HTTP {proxy.proxy_creds.HTTP_PORT}
          </Badge>
          {proxy.proxy_creds.SOCKS_PORT && (
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-800"
            >
              SOCKS5 {proxy.proxy_creds.SOCKS_PORT}
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell className="py-4">
        <div className="flex items-center space-x-2">
          <span className="truncate max-w-[100px]">
            {proxy.proxy_creds.LOGIN}/{proxy.proxy_creds.PASS}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-100"
          >
            <Key className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
      <TableCell className="py-4">
        <div className="flex flex-col items-center space-y-1">
          <Clock className="h-4 w-4 text-blue-500" />
          <span>{proxy.modem_details.ADDED_TIME}</span>
        </div>
      </TableCell>
      <TableCell className="py-4">
        {proxy.net_details.CurrentNetworkType}
      </TableCell>
      <TableCell className="py-4">{proxy.net_details.ping_stats}</TableCell>
      <TableCell className="py-4">
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-green-100 text-green-600 hover:bg-green-200 shadow-sm"
                >
                  <Activity className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Speed Test</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-blue-100 text-blue-600 hover:bg-blue-200 shadow-sm"
                >
                  <Zap className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Connection Speed Test</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-purple-100 text-purple-600 hover:bg-purple-200 shadow-sm"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download VPN Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-orange-100 text-orange-600 hover:bg-orange-200 shadow-sm"
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rotate IP</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </TableCell>
    </TableRow>
  );
}
