"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Network, 
  Database, 
  Activity, 
  Cpu, 
  ShieldAlert, 
  BarChart3, 
  Users 
} from "lucide-react";

export function SidebarNav() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "connectors";

  const items = [
    { id: "connectors", label: "Connectors", icon: Network },
    { id: "knowledge", label: "Knowledge Index", icon: Database },
    { id: "health", label: "Health Monitoring", icon: Activity },
    { id: "ai-config", label: "AI Configuration", icon: Cpu },
    { id: "audit", label: "Audit Logs", icon: ShieldAlert },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "roles", label: "Role Management", icon: Users },
  ];

  return (
    <nav className="space-y-1 px-2">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <Link
            key={item.id}
            href={`/admin?tab=${item.id}`}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive 
                ? "bg-specsavers-green/10 text-specsavers-green" 
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <Icon size={18} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
