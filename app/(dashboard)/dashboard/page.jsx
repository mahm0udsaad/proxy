import DashboardPage from "../../../components/dashboard-page";
import { fetchUserInfo } from "@/actions/getProxyList";
export default async function Dashboard() {
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

  const data = await fetchUserInfo();
  console.log(data[0]);

  return <DashboardPage proxies={data} />;
}
