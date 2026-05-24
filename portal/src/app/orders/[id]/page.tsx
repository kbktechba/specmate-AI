import { orders } from "@/lib/mock-data";
import Link from "next/link";
import { ArrowLeft, Box, Calendar, Clock, MapPin, User, AlertCircle } from "lucide-react";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = orders.find(o => o.id === id);

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
        <Link href="/orders" className="flex items-center gap-1 hover:text-[#007749]"><ArrowLeft size={16} /> Back to Orders</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{order.id}</span>
      </div>

      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold text-gray-900">Order {order.id}</h1>
        <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
          order.status === 'Completed' || order.status === 'Ready for Pickup' ? 'bg-green-100 text-green-700' :
          order.status === 'Delayed' ? 'bg-red-100 text-red-700' :
          order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Customer & Store Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm flex items-center gap-1"><User size={14}/> Customer</p>
              <p className="font-medium mt-1">{order.customer}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm flex items-center gap-1"><MapPin size={14}/> Store Location</p>
              <p className="font-medium mt-1">{order.store}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Product Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm flex items-center gap-1"><Box size={14}/> Frame</p>
              <p className="font-medium mt-1">{order.frame}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm flex items-center gap-1"><Box size={14}/> Lens Type</p>
              <p className="font-medium mt-1">{order.lensType}</p>
            </div>
          </div>
        </div>

        <div className="col-span-2 bg-white border rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Fulfillment Timeline</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-gray-500 text-sm flex items-center gap-1"><Calendar size={14}/> Ordered Date</p>
              <p className="font-medium mt-1">{order.orderedDate}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm flex items-center gap-1"><Clock size={14}/> Est. Delivery</p>
              <p className="font-medium mt-1">{order.estimatedDelivery}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm flex items-center gap-1"><AlertCircle size={14}/> Fulfillment Notes</p>
              <p className="font-medium mt-1 text-blue-700">{order.notes}</p>
            </div>
          </div>
        </div>

        <div className="col-span-2 bg-[#007749]/5 border border-[#007749]/20 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#007749] mb-2">Related Support Action</h2>
          <p className="text-gray-700 mb-4">If there are issues fulfilling this order or customer requires support.</p>
          <button className="bg-[#007749] text-white px-4 py-2 rounded shadow hover:bg-[#005a36] transition-colors">
            Raise Customer Service - BCDC ticket
          </button>
        </div>
      </div>
    </div>
  );
}
