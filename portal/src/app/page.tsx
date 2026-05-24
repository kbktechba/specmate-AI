import { Database, HeadphonesIcon, Book, FileText, Gift } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to the Enterprise Portal</h1>
        <p className="text-gray-500">Access internal systems, knowledge bases, and tools.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/orders" className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-green-50 text-[#007749] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#007749] group-hover:text-white transition-colors">
            <Database size={24} />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Orders System</h2>
          <p className="text-gray-500 text-sm">View and manage customer orders, track statuses, and fulfillments.</p>
        </Link>
        
        <Link href="/servicenow" className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <HeadphonesIcon size={24} />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">ServiceNow</h2>
          <p className="text-gray-500 text-sm">IT Service Management, raise tickets, and track incident resolutions.</p>
        </Link>

        <Link href="/confluence" className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <Book size={24} />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Confluence</h2>
          <p className="text-gray-500 text-sm">Knowledge base, SOPs, escalation guides, and procedures.</p>
        </Link>

        <Link href="/sharepoint" className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
            <FileText size={24} />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">SharePoint</h2>
          <p className="text-gray-500 text-sm">Official company policies, compliance documents, and guidelines.</p>
        </Link>

        <Link href="/greenpoint" className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <Gift size={24} />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">GreenPoint</h2>
          <p className="text-gray-500 text-sm">Retail updates, marketing campaigns, promotions, and announcements.</p>
        </Link>
      </div>
    </div>
  );
}
