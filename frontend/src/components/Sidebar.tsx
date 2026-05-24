"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, Box, Shield, BookOpen, Store, 
  Monitor, Calendar, FileText, PieChart, 
  LayoutDashboard, Settings, MessageSquare, 
  Circle, User
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const mainLinks = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Box, label: "Orders", href: "#" },
    { icon: Shield, label: "Policies", href: "#" },
    { icon: BookOpen, label: "Knowledge Base", href: "#" },
    { icon: Store, label: "Store Operations", href: "#" },
    { icon: Monitor, label: "IT Support", href: "#" },
    { icon: Calendar, label: "Appointments", href: "#" },
    { icon: FileText, label: "Documents", href: "#" },
    { icon: PieChart, label: "Reports", href: "#" },
    { icon: LayoutDashboard, label: "Dashboards", href: "#" },
  ];

  const recentChats = [
    { label: "ORD001 status", href: "#", active: true },
    { label: "Refund policy", href: "#" },
    { label: "Printer not printing", href: "#" },
    { label: "Appointment no-show", href: "#" },
    { label: "WINK slow today", href: "#" },
  ];

  return (
    <aside className="w-[280px] h-full flex flex-col bg-background border-r border-border overflow-hidden">
      
      {/* Logo & Subtitle */}
      <div className="p-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-specsavers-green mix-blend-multiply opacity-90 dark:mix-blend-screen -mr-2"></div>
            <div className="w-5 h-5 rounded-full bg-specsavers-green/80 mix-blend-multiply dark:mix-blend-screen"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">SpecMate</h1>
            <p className="text-xs text-muted-foreground -mt-0.5">Retail Assistant</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide">
        {/* Main Nav */}
        <nav className="space-y-1 mb-8">
          {mainLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link 
                key={link.label} 
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-specsavers-green/10 text-specsavers-green dark:text-specsavers-green" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Recent Chats */}
        <div className="mb-8">
          <div className="flex items-center justify-between px-3 mb-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recent Chats</h2>
            <button className="text-muted-foreground hover:text-foreground">
              <span className="text-lg leading-none">›</span>
            </button>
          </div>
          <div className="space-y-0.5">
            {recentChats.map((chat, i) => (
              <Link 
                key={i} 
                href={chat.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  chat.active ? "text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <MessageSquare size={16} className={chat.active ? "text-specsavers-green" : "opacity-60"} />
                <span className="truncate">{chat.label}</span>
              </Link>
            ))}
          </div>
          <Link href="#" className="block px-3 mt-3 text-xs font-medium text-specsavers-green hover:underline">
            View all
          </Link>
        </div>
      </div>

      {/* Bottom Area */}
      <div className="p-4 border-t border-border bg-background space-y-4">
        {/* System Status */}
        <div className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-border/50 bg-card hover:bg-muted/50 cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <Circle size={10} className="fill-green-500 text-green-500" />
            <div>
              <p className="text-xs font-medium text-foreground">All Systems Operational</p>
              <p className="text-[10px] text-muted-foreground">Last updated: 2 min ago</p>
            </div>
          </div>
          <span className="text-muted-foreground text-lg leading-none">›</span>
        </div>

        {/* Admin Panel Link */}
        <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Settings size={18} />
          Admin Panel
        </Link>

        {/* Sign In */}
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <User size={16} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Sign in</p>
              <p className="text-xs text-muted-foreground">Access your account</p>
            </div>
          </div>
          <span className="text-muted-foreground text-lg leading-none">›</span>
        </div>
      </div>
    </aside>
  );
}
