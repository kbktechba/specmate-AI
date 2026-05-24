import { servicenow } from "@/lib/mock-data";
import Link from "next/link";
import { ArrowLeft, Clock, Users, Activity } from "lucide-react";

export async function generateStaticParams() {
  return servicenow.map((s) => ({
    id: s.id,
  }));
}

export default async function ServiceNowDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ticket = servicenow.find(t => t.id === id);

  if (!ticket) {
    return <div>Incident not found</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
        <Link href="/servicenow" className="flex items-center gap-1 hover:text-blue-600"><ArrowLeft size={16} /> Back to Incidents</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{ticket.id}</span>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="bg-blue-800 text-white p-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{ticket.id}: {ticket.title}</h1>
            <p className="text-blue-200">Reported on {ticket.opened}</p>
          </div>
          <div className="flex gap-3">
             <span className={`px-3 py-1 rounded text-sm font-bold bg-white/20`}>
              Priority: {ticket.priority}
            </span>
            <span className={`px-3 py-1 rounded text-sm font-bold bg-white text-blue-900`}>
              Status: {ticket.status}
            </span>
          </div>
        </div>

        <div className="p-6 grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
            <div>
              <h2 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-900">Description</h2>
              <div className="bg-gray-50 p-4 rounded-lg border text-gray-700">
                {ticket.description}
              </div>
            </div>

            {ticket.resolution && (
              <div>
                <h2 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-900">Resolution Notes</h2>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-green-800">
                  {ticket.resolution}
                </div>
              </div>
            )}
            
            <div>
              <h2 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-900">Troubleshooting Steps / Work Notes</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Activity size={16} />
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border flex-1 text-sm text-gray-700">
                    <span className="font-semibold block mb-1">System Auto-Reply - {ticket.opened}</span>
                    Incident created and assigned to {ticket.group}. SLA timer started.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 border rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Incident Details</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-500 flex items-center gap-2"><Users size={14} /> Assignment Group</p>
                  <p className="font-medium text-gray-900 mt-1">{ticket.group}</p>
                </div>
                <div>
                  <p className="text-gray-500 flex items-center gap-2"><Clock size={14} /> Last Updated</p>
                  <p className="font-medium text-gray-900 mt-1">{ticket.updated}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <h3 className="font-semibold text-blue-900 mb-3">Related KB/SOP Links</h3>
              <ul className="text-sm space-y-2">
                <li>
                  <Link href="/confluence/SOP001" className="text-blue-600 hover:underline">SOP001 - Printer Troubleshooting</Link>
                </li>
                <li>
                  <Link href="/confluence/SOP002" className="text-blue-600 hover:underline">SOP002 - WINK Login Issues</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
