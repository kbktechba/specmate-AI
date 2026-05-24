import { greenpoint } from "@/lib/mock-data";
import Link from "next/link";
import { Gift, Search, Megaphone } from "lucide-react";

export default function GreenPointPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-[#007749] text-white p-8 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3"><Gift size={32} /> GreenPoint</h1>
          <p className="text-green-100 text-lg mt-2">Retail updates, marketing campaigns, and promotions</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" placeholder="Search updates..." className="pl-9 pr-4 py-3 border-0 rounded-full text-sm w-72 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-inner" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {greenpoint.map((update) => (
          <Link href={`/greenpoint/${update.id}`} key={update.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
            <div className={`h-2 w-full ${
              update.category === 'Promotion' ? 'bg-pink-500' :
              update.category === 'Operations' ? 'bg-blue-500' :
              update.category === 'Marketing' ? 'bg-orange-500' :
              'bg-emerald-500'
            }`} />
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  update.category === 'Promotion' ? 'bg-pink-50 text-pink-700' :
                  update.category === 'Operations' ? 'bg-blue-50 text-blue-700' :
                  update.category === 'Marketing' ? 'bg-orange-50 text-orange-700' :
                  'bg-emerald-50 text-emerald-700'
                }`}>
                  {update.category}
                </span>
                <span className="text-xs text-gray-400">{update.publish}</span>
              </div>
              <h2 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-[#007749]">{update.title}</h2>
              <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">{update.body}</p>
              
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto">
                <span className="text-xs text-gray-500">{update.region}</span>
                <span className="text-sm font-medium text-[#007749] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more <Megaphone size={14} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
