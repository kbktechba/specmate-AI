import { sharepoint } from "@/lib/mock-data";
import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle2, AlertTriangle, Link as LinkIcon } from "lucide-react";

export default async function SharePointDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const policy = sharepoint.find(p => p.id === id);

  if (!policy) {
    return <div>Policy not found</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl bg-white shadow-sm border border-gray-200">
      {/* SharePoint Header */}
      <div className="bg-teal-700 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText size={24} />
          <span className="font-semibold text-lg">SharePoint Policy Library</span>
        </div>
        <div className="text-sm bg-teal-800 px-3 py-1 rounded-full">
          Official Corporate Document
        </div>
      </div>

      <div className="p-8 space-y-8">
        <div>
          <Link href="/sharepoint" className="inline-flex items-center gap-2 text-sm text-teal-600 hover:underline mb-4">
            <ArrowLeft size={16} /> Back to Library
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{policy.id}: {policy.title}</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y text-sm">
          <div>
            <p className="text-gray-500 mb-1">Policy Owner</p>
            <p className="font-medium">{policy.owner}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Effective Date</p>
            <p className="font-medium">{policy.effective}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Next Review Date</p>
            <p className="font-medium">{policy.review}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Status</p>
            <p className="font-medium text-green-600 flex items-center gap-1"><CheckCircle2 size={14} /> Active</p>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-bold text-teal-800 mb-3 border-b pb-2">1. Policy Summary</h2>
            <p className="text-gray-700 leading-relaxed">{policy.summary}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-teal-800 mb-3 border-b pb-2">2. Required Action (What colleagues should do)</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-900">
              {policy.action}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-teal-800 mb-3 border-b pb-2">3. Exceptions</h2>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 text-orange-900 flex gap-3">
              <AlertTriangle className="shrink-0" />
              <span>{policy.exceptions}</span>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-teal-800 mb-3 border-b pb-2">4. Related SOPs</h2>
            <Link href={`/confluence/${policy.sop}`} className="inline-flex items-center gap-2 text-teal-600 hover:underline border border-teal-200 px-4 py-2 rounded-lg bg-teal-50">
              <LinkIcon size={16} /> View {policy.sop} in Confluence
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
