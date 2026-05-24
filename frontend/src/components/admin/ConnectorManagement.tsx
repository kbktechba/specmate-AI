import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Settings, AlertCircle, CheckCircle2, Clock } from "lucide-react";

const connectors = [
  { name: "SharePoint", type: "Document Store", status: "Connected", syncTime: "2 mins ago", indexed: "14,502", owner: "IT Ops", auth: "OAuth2", freq: "Hourly" },
  { name: "Operations SharePoint", type: "Document Store", status: "Connected", syncTime: "5 mins ago", indexed: "3,201", owner: "Retail Ops", auth: "OAuth2", freq: "Hourly" },
  { name: "Optometry SharePoint", type: "Document Store", status: "Warning", syncTime: "2 hrs ago", indexed: "1,105", owner: "Clinical", auth: "OAuth2", freq: "Daily" },
  { name: "GreenPoint", type: "Internal Wiki", status: "Connected", syncTime: "10 mins ago", indexed: "854", owner: "Comms", auth: "API Key", freq: "Real-time" },
  { name: "ServiceNow", type: "ITSM", status: "Connected", syncTime: "1 min ago", indexed: "45,210", owner: "IT Service Desk", auth: "Basic Auth", freq: "Real-time" },
  { name: "Data Lake", type: "Data Warehouse", status: "Pending", syncTime: "-", indexed: "0", owner: "Data Eng", auth: "SAML", freq: "Daily" },
  { name: "Policies Repository", type: "CMS", status: "Connected", syncTime: "1 hr ago", indexed: "120", owner: "HR", auth: "API Key", freq: "Daily" },
  { name: "Knowledge Base", type: "Help Center", status: "Connected", syncTime: "15 mins ago", indexed: "2,400", owner: "Support", auth: "OAuth2", freq: "Hourly" },
  { name: "Orders System", type: "ERP", status: "Failed", syncTime: "5 hrs ago", indexed: "102,400", owner: "Supply Chain", auth: "Mutual TLS", freq: "Real-time" },
  { name: "Weather API", type: "External API", status: "Connected", syncTime: "10 mins ago", indexed: "-", owner: "Digital", auth: "API Key", freq: "Hourly" },
  { name: "Appointment System", type: "Booking", status: "Connected", syncTime: "2 mins ago", indexed: "15,000", owner: "Retail Ops", auth: "OAuth2", freq: "Real-time" },
];

export function ConnectorManagement() {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Connector Management</CardTitle>
            <CardDescription>Manage and monitor enterprise data sources.</CardDescription>
          </div>
          <Button className="bg-specsavers-green hover:bg-specsavers-green/90">
            <RefreshCw size={16} className="mr-2" /> Sync All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>Connector</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead>Indexed Records</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {connectors.map((c) => (
                <TableRow key={c.name}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{c.name}</span>
                      <span className="text-xs text-gray-500">{c.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={c.status === "Connected" ? "default" : c.status === "Warning" ? "secondary" : c.status === "Failed" ? "destructive" : "outline"}
                      className={c.status === "Connected" ? "bg-green-100 text-green-800 hover:bg-green-100" : c.status === "Warning" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" : ""}
                    >
                      {c.status === "Connected" && <CheckCircle2 size={12} className="mr-1" />}
                      {c.status === "Warning" && <AlertCircle size={12} className="mr-1" />}
                      {c.status === "Failed" && <AlertCircle size={12} className="mr-1" />}
                      {c.status === "Pending" && <Clock size={12} className="mr-1" />}
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{c.syncTime}</TableCell>
                  <TableCell className="text-sm">{c.indexed}</TableCell>
                  <TableCell className="text-sm text-gray-600">{c.owner}</TableCell>
                  <TableCell className="text-sm text-gray-600">{c.freq}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" className="h-8 text-xs">Test</Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Settings size={14} /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
