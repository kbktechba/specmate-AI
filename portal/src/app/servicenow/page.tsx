import { servicenow } from "@/lib/mock-data";
import Link from "next/link";
import { HeadphonesIcon, Search } from "lucide-react";

export default function ServiceNowPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-blue-800"><HeadphonesIcon /> ServiceNow IT Support</h1>
          <p className="text-gray-500 text-sm mt-1">Incident management and resolution</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" placeholder="Search incidents..." className="pl-9 pr-4 py-2 border rounded-md text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-blue-50 text-blue-900 border-b">
            <tr>
              <th className="px-6 py-3 font-medium">Incident #</th>
              <th className="px-6 py-3 font-medium">Short Description</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Priority</th>
              <th className="px-6 py-3 font-medium">Assignment Group</th>
              <th className="px-6 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {servicenow.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-blue-600 hover:underline">
                  <Link href={`/servicenow/${ticket.id}`}>{ticket.id}</Link>
                </td>
                <td className="px-6 py-4 font-medium">{ticket.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-sm text-xs font-medium border ${
                    ticket.status === 'Resolved' ? 'bg-green-50 text-green-700 border-green-200' :
                    ticket.status === 'Open' ? 'bg-red-50 text-red-700 border-red-200' :
                    'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    ticket.priority === 'P1' ? 'bg-red-100 text-red-800' :
                    ticket.priority === 'P2' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{ticket.group}</td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/servicenow/${ticket.id}`} className="text-sm text-blue-600 hover:underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
