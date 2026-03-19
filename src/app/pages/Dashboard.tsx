import { Link } from "react-router";
import { Package, Truck, CheckCircle2, ChevronRight, Book, Film } from "lucide-react";

export function Dashboard() {
  const orders = [
    {
      id: "ORD-84920",
      type: "Storybook",
      childName: "Emma",
      date: "Oct 12, 2023",
      status: "In Production",
      image: "https://images.unsplash.com/photo-1598618137594-8e7657a6ef6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdpY2FsJTIwY2hpbGRyZW4lMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzczOTM0ODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "ORD-84815",
      type: "Movie",
      childName: "Liam",
      date: "Sep 28, 2023",
      status: "Delivered",
      image: "https://images.unsplash.com/photo-1725354870984-e97f219247b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYXRlZCUyMGNoaWxkcmVuJTIwbW92aWUlMjBwb3N0ZXJ8ZW58MXx8fHwxNzczOTM0ODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "ORD-85012",
      type: "Combo",
      childName: "Sophia",
      date: "Nov 02, 2023",
      status: "Pending",
      image: "https://images.unsplash.com/photo-1598618137594-8e7657a6ef6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdpY2FsJTIwY2hpbGRyZW4lMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzczOTM0ODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "In Production":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getProductIcon = (type: string) => {
    switch (type) {
      case "Storybook":
        return <Book className="w-5 h-5 text-indigo-500" />;
      case "Movie":
        return <Film className="w-5 h-5 text-rose-500" />;
      default:
        return <div className="flex"><Book className="w-4 h-4 text-indigo-500" /><Film className="w-4 h-4 text-rose-500 -ml-1" /></div>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1E293B]">
            Welcome back, Sarah 👋
          </h1>
          <p className="text-slate-500 mt-2 font-medium text-lg">
            Track your magical creations and see what's new.
          </p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-xl text-white bg-[#F5A623] hover:bg-amber-500 shadow-lg shadow-amber-500/30 transition-all duration-200 active:scale-[0.98] w-full md:w-auto"
        >
          Create New Magic
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 flex items-center gap-4 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
            <Package className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Orders</p>
            <p className="text-3xl font-extrabold text-[#1E293B]">3</p>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 flex items-center gap-4 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <Truck className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">In Progress</p>
            <p className="text-3xl font-extrabold text-[#1E293B]">2</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 flex items-center gap-4 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Delivered</p>
            <p className="text-3xl font-extrabold text-[#1E293B]">1</p>
          </div>
        </div>
      </div>

      {/* Recent Orders List */}
      <div>
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-2xl font-extrabold text-[#1E293B]">Recent Orders</h2>
          <button className="text-[#F5A623] font-bold hover:text-amber-600 transition-colors">
            View All
          </button>
        </div>
        
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl p-4 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-200 cursor-pointer group"
            >
              <div className="flex-shrink-0 relative">
                <img
                  src={order.image}
                  alt={order.type}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-sm group-hover:shadow-md transition-shadow"
                />
                <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full shadow-md border border-slate-50">
                  {getProductIcon(order.type)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-extrabold text-[#1E293B] truncate">
                    {order.childName}'s {order.type}
                  </h3>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm font-medium text-slate-500 mt-2">
                  <span className="flex items-center gap-1">
                    Order {order.id}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                  <span>{order.date}</span>
                </div>
              </div>

              <div className="mt-4 sm:mt-0 flex-shrink-0">
                <Link
                  to={`/order/${order.id}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 border-2 border-slate-100 rounded-xl text-sm font-bold text-[#1E293B] bg-white hover:border-[#F5A623] hover:text-[#F5A623] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F5A623]"
                >
                  View Details
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
