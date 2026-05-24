import { confluence } from "@/lib/mock-data";
import Link from "next/link";
import { ArrowLeft, Edit, Share2, Star } from "lucide-react";

export async function generateStaticParams() {
  return confluence.map((c) => ({
    id: c.id,
  }));
}

export default async function ConfluenceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = confluence.find(d => d.id === id);

  if (!doc) {
    return <div>Page not found</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl bg-white p-8 rounded-xl border shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <Link href="/confluence" className="flex items-center gap-1 hover:text-blue-600"><ArrowLeft size={16} /> Back</Link>
          <span>/</span>
          <span>Spaces</span>
          <span>/</span>
          <span>Retail Operations</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">{doc.id}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <button className="hover:text-gray-600"><Edit size={18} /></button>
          <button className="hover:text-gray-600"><Share2 size={18} /></button>
          <button className="hover:text-yellow-500"><Star size={18} /></button>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-6">{doc.title}</h1>
      
      <div className="flex gap-6 text-sm text-gray-500 border-b pb-6 mb-6">
        <p>Created by: <span className="text-blue-600 font-medium">{doc.owner}</span></p>
        <p>Last updated: <span className="text-gray-900">{doc.updated}</span></p>
      </div>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Purpose</h2>
        <p className="text-gray-700">{doc.purpose}</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Scope</h2>
        <p className="text-gray-700">{doc.scope}</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Step-by-step Procedure</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          {doc.steps.map((step, index) => (
            <li key={index} className="pl-2">{step}</li>
          ))}
        </ol>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Escalation Path</h2>
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded text-orange-900">
          If the issue cannot be resolved using the steps above, escalate to: <strong>{doc.escalation}</strong>.
        </div>
      </div>
    </div>
  );
}
