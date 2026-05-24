import { ReactNode } from "react";
import Link from "next/link";
import { SidebarNav } from "@/components/admin/SidebarNav";
import { ArrowLeft, Bot } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm hidden md:flex">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-gray-800 text-lg">
            <Bot size={22} className="text-specsavers-green" />
            SpecMate Admin
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <SidebarNav />
        </div>
        <div className="p-4 border-t border-gray-200">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
            <ArrowLeft size={16} />
            Back to Chat
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="md:hidden flex items-center gap-2 font-bold text-gray-800 text-lg mb-6 bg-white p-4 rounded-lg shadow-sm">
           <Bot size={22} className="text-specsavers-green" />
           SpecMate Admin
        </div>
        {children}
      </main>
    </div>
  );
}
