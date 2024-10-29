import DashboardPage from "../../../components/dashboard-page";
import { fetchUserInfo } from "@/actions/getProxyList";
export default async function Dashboard() {
  const data = await fetchUserInfo();
  console.log(data[0]);

  return <DashboardPage proxies={data} />;
}
