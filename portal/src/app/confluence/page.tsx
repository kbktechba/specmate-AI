import { confluence } from "@/lib/mock-data";
import Link from "next/link";
import { Book, Search, FileText } from "lucide-react";

export default function ConfluencePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-blue-600"><Book /> Confluence Knowledge Base</h1>
          <p className="text-gray-500 text-sm mt-1">SOPs, escalation guides, and procedures</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" placeholder="Search spaces..." className="pl-9 pr-4 py-2 border rounded-md text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {confluence.map((doc) => (
          <Link href={`/confluence/${doc.id}`} key={doc.id} className="bg-white rounded-lg border shadow-sm p-6 hover:shadow-md transition-shadow group">
            <div className="flex items-start gap-4">
              <div className="mt-1 text-blue-500 group-hover:text-blue-600">
                <FileText size={24} />
              </div>
              <div>
                <h2 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600">{doc.title}</h2>
                <p className="text-xs text-gray-500 mt-1">{doc.id} • Updated {doc.updated}</p>
                <p className="text-sm text-gray-600 mt-3 line-clamp-2">{doc.purpose}</p>
                <div className="mt-4 inline-block px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                  Owner: {doc.owner}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
