import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function AuditLogs() {
  const logs = [
    { time: "2026-05-23 06:10", question: "printer not printing", intent: "it_troubleshooting", source: "-", status: "Success", escalated: "No", ticket: "No" },
    { time: "2026-05-23 06:11", question: "still not fixed", intent: "unresolved_issue", source: "-", status: "Success", escalated: "Yes", ticket: "Yes" },
    { time: "2026-05-23 06:15", question: "order 001", intent: "order_lookup", source: "Order DB", status: "Success", escalated: "No", ticket: "No" },
    { time: "2026-05-23 06:18", question: "how are you", intent: "small_talk", source: "-", status: "Success", escalated: "No", ticket: "No" },
    { time: "2026-05-23 06:22", question: "refund policy", intent: "policy_lookup", source: "Policies", status: "Success", escalated: "No", ticket: "No" },
    { time: "2026-05-23 06:25", question: "draft email to customer", intent: "writing_assistance", source: "LLM", status: "Warning", escalated: "No", ticket: "No" },
    { time: "2026-05-23 06:30", question: "what is project zeta", intent: "unknown", source: "-", status: "Failed", escalated: "Yes", ticket: "No" },
  ];

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Audit Logs</CardTitle>
            <CardDescription>Review recent user interactions and AI decisions.</CardDescription>
          </div>
          <div className="relative w-64">
            <Search size={16} className="absolute left-2.5 top-2.5 text-gray-500" />
            <Input type="text" placeholder="Search logs..." className="pl-9 bg-gray-50" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead className="w-[250px]">User Question</TableHead>
                <TableHead>Detected Intent</TableHead>
                <TableHead>Source Used</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Escalated</TableHead>
                <TableHead>Ticket Drafted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log, i) => (
                <TableRow key={i}>
                  <TableCell className="text-xs text-gray-500 whitespace-nowrap">{log.time}</TableCell>
                  <TableCell className="font-medium text-sm">"{log.question}"</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 font-normal">
                      {log.intent}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{log.source}</TableCell>
                  <TableCell>
                    <Badge variant={log.status === 'Success' ? 'default' : log.status === 'Warning' ? 'secondary' : 'destructive'} 
                      className={log.status === 'Success' ? 'bg-green-100 text-green-800' : log.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' : ''}>
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{log.escalated}</TableCell>
                  <TableCell className="text-sm text-gray-600">{log.ticket}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
