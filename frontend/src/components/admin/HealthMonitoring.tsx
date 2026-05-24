import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export function HealthMonitoring() {
  const healthData = [
    { name: "ServiceNow Sync Health", status: "Healthy", message: "Syncing normally", time: "Last check: 1m ago" },
    { name: "SharePoint Sync Health", status: "Warning", message: "High latency detected", time: "Last check: 5m ago" },
    { name: "GreenPoint Sync Health", status: "Healthy", message: "Syncing normally", time: "Last check: 2m ago" },
    { name: "Data Lake Sync Health", status: "Failed", message: "Connection timeout", time: "Last check: 10m ago" },
    { name: "Orders Feed Health", status: "Warning", message: "Partial sync failure", time: "Last check: 15m ago" },
    { name: "Policies Feed Health", status: "Healthy", message: "Syncing normally", time: "Last check: 1h ago" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Source Health Monitoring</h2>
        <p className="text-gray-500">Real-time status of data ingestion pipelines.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {healthData.map((item, i) => (
          <Card key={i} className={`border-l-4 ${item.status === 'Healthy' ? 'border-l-green-500' : item.status === 'Warning' ? 'border-l-yellow-500' : 'border-l-red-500'}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                {item.name}
                {item.status === "Healthy" && <CheckCircle2 className="text-green-500" size={20} />}
                {item.status === "Warning" && <AlertTriangle className="text-yellow-500" size={20} />}
                {item.status === "Failed" && <XCircle className="text-red-500" size={20} />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium text-gray-700">{item.message}</div>
              <div className="text-xs text-gray-500 mt-1">{item.time}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
