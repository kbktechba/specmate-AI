import { sharepoint } from "@/lib/mock-data";
import Link from "next/link";
import { FileText, Search, ShieldCheck } from "lucide-react";

export default function SharePointPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-teal-700"><ShieldCheck /> Corporate Policies</h1>
          <p className="text-gray-500 text-sm mt-1">Official Specsavers company policies and guidelines</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" placeholder="Search policies..." className="pl-9 pr-4 py-2 border rounded-md text-sm w-64 focus:outline-none focus:ring-1 focus:ring-teal-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-teal-50 text-teal-900 border-b">
            <tr>
              <th className="px-6 py-3 font-medium">Policy ID</th>
              <th className="px-6 py-3 font-medium">Policy Title</th>
              <th className="px-6 py-3 font-medium">Owner</th>
              <th className="px-6 py-3 font-medium">Effective Date</th>
              <th className="px-6 py-3 font-medium">Review Date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {sharepoint.map((pol) => (
              <tr key={pol.id} className="hover:bg-gray-50 cursor-pointer relative">
                <td className="px-6 py-4 font-medium text-teal-600">
                  <Link href={`/sharepoint/${pol.id}`} className="absolute inset-0">
                    <span className="sr-only">View</span>
                  </Link>
                  <span className="relative z-10">{pol.id}</span>
                </td>
                <td className="px-6 py-4 font-medium flex items-center gap-2">
                  <FileText size={16} className="text-gray-400" /> {pol.title}
                </td>
                <td className="px-6 py-4 text-gray-600">{pol.owner}</td>
                <td className="px-6 py-4">{pol.effective}</td>
                <td className="px-6 py-4">{pol.review}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
