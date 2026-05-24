import { orders } from "@/lib/mock-data";
import Link from "next/link";
import { Database, Search } from "lucide-react";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Database className="text-[#007749]" /> Orders System</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track customer orders</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" placeholder="Search orders..." className="pl-9 pr-4 py-2 border rounded-md text-sm w-64 focus:outline-none focus:ring-1 focus:ring-[#007749]" />
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 border-b">
            <tr>
              <th className="px-6 py-3 font-medium">Order ID</th>
              <th className="px-6 py-3 font-medium">Customer</th>
              <th className="px-6 py-3 font-medium">Store</th>
              <th className="px-6 py-3 font-medium">Frame</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Est. Delivery</th>
              <th className="px-6 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-blue-600 hover:underline">
                  <Link href={`/orders/${order.id}`}>{order.id}</Link>
                </td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">{order.store}</td>
                <td className="px-6 py-4">{order.frame} ({order.lensType})</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Completed' || order.status === 'Ready for Pickup' ? 'bg-green-100 text-green-700' :
                    order.status === 'Delayed' ? 'bg-red-100 text-red-700' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">{order.estimatedDelivery}</td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/orders/${order.id}`} className="text-sm text-[#007749] hover:underline">View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
