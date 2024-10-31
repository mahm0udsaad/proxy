"use client";
import React, { useState, useEffect } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  Clock,
  Download,
  Key,
  RotateCw,
  Zap,
  ArrowRight,
  XCircle,
} from "lucide-react";
import {
  fetchConnectionResults,
  fetchSpeedTestData,
  rotateProxy,
} from "@/actions/getProxyList";
function LoadingState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <RotateCw className="h-8 w-8 animate-spin text-blue-500" />
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      <XCircle className="h-12 w-12 text-red-500" />
      <div className="text-center">
        <p className="text-sm text-muted-foreground font-medium">{message}</p>
        {onRetry && (
          <Button variant="destructive" className="mt-4" onClick={onRetry}>
            <RotateCw className="mr-2 h-4 w-4" /> Retry
          </Button>
        )}
      </div>
    </div>
  );
}

function ConnectionSpeedTestModal({ isOpen, onClose, imei }) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    fetchConnectionResults(imei)
      .then((data) => {
        setResult(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching speed test data:", error);
        setError(error.message || "Failed to fetch connection results");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    } else {
      setResult(null);
      setError(null);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Connection Speed Test Results</DialogTitle>
          <DialogDescription>
            Detailed performance metrics for proxy {imei}
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <LoadingState message="Running connection speed test..." />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchData} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {result?.results.map((result, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{result.connections} Connections</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 gap-2 text-sm">
                    <dt>Success Rate:</dt>
                    <dd className="font-medium text-right">
                      {result.successRate}
                    </dd>
                    <dt>Requests/sec:</dt>
                    <dd className="font-medium text-right">
                      {result.requestsPerSecond.toFixed(2)}
                    </dd>
                    <dt>Time/Request:</dt>
                    <dd className="font-medium text-right">
                      {result.timePerRequestMs.toFixed(2)} ms
                    </dd>
                  </dl>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function SpeedTestModal({
  isOpen,
  onClose,
  imei,
  username,
  password,
  ipAddress,
  port,
}) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const speedTestParams = {
    ipAddress: ipAddress,
    port: port,
    imei: imei,
    username: username,
    password: password,
  };

  const fetchSpeedTest = () => {
    setLoading(true);
    setError(null);
    fetchSpeedTestData(speedTestParams)
      .then((data) => {
        if (data.error) {
          throw new Error(data.error || "Unknown error occurred");
        }
        setResult(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching speed test data:", error);
        setError(error.message || "Failed to perform speed test");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isOpen) {
      fetchSpeedTest();
    } else {
      setResult(null);
      setError(null);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Speed Test Result</DialogTitle>
          <DialogDescription>
            Network speed test results for this proxy
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {loading ? (
            <LoadingState message="Running speed test..." />
          ) : error ? (
            <ErrorState message={error} onRetry={fetchSpeedTest} />
          ) : (
            result && (
              <>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">IMEI</span>
                        <span className="font-mono text-sm">{result.imei}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Nickname</span>
                        <span className="text-sm">{result.nick}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-green-100 bg-green-50">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm font-medium text-green-600">
                          Download
                        </p>
                        <p className="text-2xl font-bold text-green-700">
                          {result.downloadSpeed}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-blue-100 bg-blue-50">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm font-medium text-blue-600">
                          Upload
                        </p>
                        <p className="text-2xl font-bold text-blue-700">
                          {result.uploadSpeed}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="mt-4">
                  <img
                    src={result.resultImage}
                    alt="Speed test result"
                    className="w-full rounded-lg border"
                  />
                </div>
              </>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function RotateIPModal({ isOpen, onClose, imei }) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fetchRotateProxy = () => {
    setLoading(true);
    setError(null);
    rotateProxy(imei)
      .then((data) => {
        setResult(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error rotating proxy:", error);
        setError(error.message || "Failed to rotate IP");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isOpen) {
      fetchRotateProxy();
    } else {
      setResult(null);
      setError(null);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>IP Rotation Result</DialogTitle>
          <DialogDescription>
            The IP rotation process has been initiated
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <LoadingState message="Rotating IP..." />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchRotateProxy} />
        ) : (
          result && (
            <div className="space-y-4">
              <Card className="border-green-100 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status</span>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800"
                    >
                      {result.result}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Previous IP
                    </p>
                    <p className="text-sm text-muted-foreground font-mono">
                      {result.EXT_IP1}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">New IP</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      {result.EXT_IP2}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Process Time
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {result.total_time} seconds
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Event ID</p>
                  <p className="text-sm text-muted-foreground font-mono">
                    {result.EVENT_ID}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function ProxyListRow({ proxyData }) {
  const [rotateModalOpen, setRotateModalOpen] = useState(false);
  const [speedTestModalOpen, setSpeedTestModalOpen] = useState(false);
  const [connectionTestModalOpen, setConnectionTestModalOpen] = useState(false);

  const handleDownloadVPNSettings = () => {
    const vpnSettings = `
      [VPN]
      Name=Proxy VPN
      Type=L2TP
      Server=${proxyData.net_details.EXT_IP}
      Username=${proxyData.proxy_creds.LOGIN}
      Password=${proxyData.proxy_creds.PASS}
      L2TPIPsecPSK=your_preshared_key
    `;

    const blob = new Blob([vpnSettings], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vpn_settings.conf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <TableRow className="hover:bg-blue-50 transition-colors duration-200">
      <TableCell className="py-4">
        <div className="font-medium">{proxyData.modem_details.IMEI}</div>
      </TableCell>
      <TableCell className="py-4">
        <Badge
          variant="outline"
          className={
            proxyData.net_details.IS_ONLINE === "yes"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }
        >
          {proxyData.net_details.IS_ONLINE === "yes" ? "Active" : "Inactive"}
        </Badge>
      </TableCell>
      <TableCell className="py-4">
        <div className="font-medium">{proxyData.net_details.CELLOP}</div>
      </TableCell>
      <TableCell className="py-4 font-mono">
        {proxyData.net_details.EXT_IP}
      </TableCell>
      <TableCell className="py-4">
        <div className="flex flex-col space-y-1">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            HTTP {proxyData.proxy_creds.HTTP_PORT}
          </Badge>
          {proxyData.proxy_creds.SOCKS_PORT && (
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-800"
            >
              SOCKS5 {proxyData.proxy_creds.SOCKS_PORT}
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell className="py-4">
        <div className="flex items-center space-x-2">
          <span className="truncate max-w-[100px]">
            {proxyData.proxy_creds.LOGIN}/{proxyData.proxy_creds.PASS}
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
        {proxyData.net_details.CurrentNetworkType}
      </TableCell>
      <TableCell className="py-4">{proxyData.net_details.ping_stats}</TableCell>
      <TableCell className="py-4 w-48">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-blue-500 flex-shrink-0" />
          <span className="text-sm">{proxyData.modem_details.ADDED_TIME}</span>
        </div>
      </TableCell>
      <TableCell className="py-4">
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-green-100 text-green-600 hover:bg-green-200 shadow-sm"
                  onClick={() => setSpeedTestModalOpen(true)}
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
                  onClick={() => setConnectionTestModalOpen(true)}
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
                  onClick={handleDownloadVPNSettings}
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
                  onClick={() => setRotateModalOpen(true)}
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
        <SpeedTestModal
          isOpen={speedTestModalOpen}
          onClose={() => setSpeedTestModalOpen(false)}
          imei={proxyData.modem_details.IMEI}
          username={proxyData.proxy_creds.LOGIN}
          password={proxyData.proxy_creds.PASS}
          ipAddress={proxyData.net_details.EXT_IP}
          port={proxyData.proxy_creds.HTTP_PORT}
        />
        <ConnectionSpeedTestModal
          isOpen={connectionTestModalOpen}
          onClose={() => setConnectionTestModalOpen(false)}
          imei={proxyData.modem_details.IMEI}
        />
        <RotateIPModal
          isOpen={rotateModalOpen}
          imei={proxyData.modem_details.IMEI}
          onClose={() => setRotateModalOpen(false)}
        />
      </TableCell>
    </TableRow>
  );
}
