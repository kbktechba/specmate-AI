import { greenpoint } from "@/lib/mock-data";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Tag, CheckSquare } from "lucide-react";

export async function generateStaticParams() {
  return greenpoint.map((g) => ({
    id: g.id,
  }));
}

export default async function GreenPointDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const update = greenpoint.find(g => g.id === id);

  if (!update) {
    return <div>Update not found</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
        <Link href="/greenpoint" className="flex items-center gap-1 hover:text-[#007749]"><ArrowLeft size={16} /> Back to GreenPoint</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{update.id}</span>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className={`h-3 w-full ${
          update.category === 'Promotion' ? 'bg-pink-500' :
          update.category === 'Operations' ? 'bg-blue-500' :
          update.category === 'Marketing' ? 'bg-orange-500' :
          'bg-emerald-500'
        }`} />
        
        <div className="p-8 md:p-10">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
              update.category === 'Promotion' ? 'bg-pink-100 text-pink-800' :
              update.category === 'Operations' ? 'bg-blue-100 text-blue-800' :
              update.category === 'Marketing' ? 'bg-orange-100 text-orange-800' :
              'bg-emerald-100 text-emerald-800'
            }`}>
              {update.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm flex items-center gap-1">
              <Calendar size={14} /> Published: {update.publish}
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm flex items-center gap-1">
              <MapPin size={14} /> {update.region}
            </span>
            {update.expiry && (
              <span className="px-3 py-1 rounded-full bg-red-50 text-red-700 text-sm flex items-center gap-1 border border-red-100">
                <Tag size={14} /> Expires: {update.expiry}
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">{update.title}</h1>

          <div className="prose max-w-none text-gray-700 text-lg leading-relaxed mb-10">
            <p>{update.body}</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-inner">
            <h2 className="text-xl font-bold text-[#007749] mb-4 flex items-center gap-2">
              <CheckSquare size={24} /> Action Required
            </h2>
            <p className="text-green-900 font-medium text-lg">{update.action}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
