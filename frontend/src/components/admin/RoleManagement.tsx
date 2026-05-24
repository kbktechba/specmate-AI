import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export function RoleManagement() {
  const modules = [
    "Chat Interface",
    "Ticket Drafting",
    "Policy Lookup",
    "Order Data (PII Hidden)",
    "Order Data (Full Access)",
    "Connector Management",
    "AI Configuration",
    "Audit Logs",
    "Analytics",
  ];

  const roles = [
    {
      name: "Store Staff",
      access: {
        "Chat Interface": true,
        "Ticket Drafting": true,
        "Policy Lookup": true,
        "Order Data (PII Hidden)": true,
        "Order Data (Full Access)": false,
        "Connector Management": false,
        "AI Configuration": false,
        "Audit Logs": false,
        "Analytics": false,
      }
    },
    {
      name: "Store Manager",
      access: {
        "Chat Interface": true,
        "Ticket Drafting": true,
        "Policy Lookup": true,
        "Order Data (PII Hidden)": true,
        "Order Data (Full Access)": true,
        "Connector Management": false,
        "AI Configuration": false,
        "Audit Logs": false,
        "Analytics": true,
      }
    },
    {
      name: "Admin",
      access: {
        "Chat Interface": true,
        "Ticket Drafting": true,
        "Policy Lookup": true,
        "Order Data (PII Hidden)": true,
        "Order Data (Full Access)": true,
        "Connector Management": true,
        "AI Configuration": true,
        "Audit Logs": true,
        "Analytics": true,
      }
    }
  ];

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Role & Access Management</CardTitle>
        <CardDescription>Configure which roles have access to specific modules.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[250px]">Module / Feature</TableHead>
                {roles.map(r => (
                  <TableHead key={r.name} className="text-center">{r.name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {modules.map(module => (
                <TableRow key={module}>
                  <TableCell className="font-medium text-gray-700">{module}</TableCell>
                  {roles.map(r => (
                     <TableCell key={`${module}-${r.name}`} className="text-center">
                       {r.access[module as keyof typeof r.access] ? (
                         <Check className="mx-auto text-green-500" size={18} />
                       ) : (
                         <X className="mx-auto text-gray-300" size={18} />
                       )}
                     </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
