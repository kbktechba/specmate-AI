import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, FileText, ShoppingCart, Shield, FileCheck, Layers, AlertTriangle, FileMinus } from "lucide-react";

export function KnowledgeIndex() {
  const stats = [
    { label: "Total Indexed Documents", value: "1,245,602", icon: Database, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Total Orders", value: "850,230", icon: ShoppingCart, color: "text-specsavers-green", bg: "bg-green-100" },
    { label: "Total Policies", value: "1,402", icon: Shield, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Total KB Articles", value: "4,520", icon: FileText, color: "text-orange-600", bg: "bg-orange-100" },
    { label: "Total Incidents", value: "12,050", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100" },
    { label: "Total SOPs", value: "3,100", icon: FileCheck, color: "text-teal-600", bg: "bg-teal-100" },
    { label: "GreenPoint Updates", value: "54,201", icon: Layers, color: "text-indigo-600", bg: "bg-indigo-100" },
    { label: "SharePoint Articles", value: "320,100", icon: FileText, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Failed Indexing", value: "24", icon: FileMinus, color: "text-red-600", bg: "bg-red-100" },
    { label: "Stale Documents", value: "1,105", icon: AlertTriangle, color: "text-yellow-600", bg: "bg-yellow-100" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Knowledge Index Dashboard</h2>
        <p className="text-gray-500">Overview of all ingested enterprise knowledge.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="bg-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg}`}>
                  <Icon size={24} className={stat.color} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
