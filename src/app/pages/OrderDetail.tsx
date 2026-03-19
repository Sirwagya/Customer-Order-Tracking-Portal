import { Link, useParams } from "react-router";
import { ChevronLeft, Download, MessageCircle, FileText, CheckCircle2, Circle } from "lucide-react";

export function OrderDetail() {
  const { id } = useParams();

  // Mock data for the specific order
  const order = {
    id: id || "ORD-84920",
    type: "Combo", // Storybook / Movie / Combo
    childName: "Emma",
    date: "Oct 12, 2023",
    status: "In Production",
    estimatedDelivery: "Oct 24, 2023",
    image: "https://images.unsplash.com/photo-1598618137594-8e7657a6ef6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdpY2FsJTIwY2hpbGRyZW4lMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzczOTM0ODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  };

  const steps = [
    { label: "Order Placed", status: "completed" },
    { label: "Customization", status: "completed" },
    { label: "In Production", status: "current" },
    { label: "Quality Check", status: "pending" },
    { label: "Shipped", status: "pending" },
    { label: "Delivered", status: "pending" },
  ];

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-6 h-6 text-green-500 bg-white rounded-full" />;
      case "current":
        return (
          <div className="w-6 h-6 rounded-full bg-[#F5A623] text-white flex items-center justify-center border-4 border-amber-100 ring-2 ring-[#F5A623]">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
        );
      case "pending":
      default:
        return <Circle className="w-6 h-6 text-slate-300 fill-slate-50" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header & Breadcrumb */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/dashboard"
          className="p-2 rounded-full hover:bg-white text-slate-500 hover:text-[#1E293B] transition-colors border border-transparent hover:border-slate-200 shadow-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-[#1E293B]">Order {order.id}</h1>
          <p className="text-slate-500 mt-1 font-medium text-lg">
            {order.childName}'s {order.type} • Placed on {order.date}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (Left) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Tracker Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-extrabold text-[#1E293B]">Order Status</h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-amber-100 text-amber-700 border border-amber-200">
                {order.status}
              </span>
            </div>

            {/* Stepper — Desktop: horizontal, Mobile: vertical */}
            {/* Desktop Stepper */}
            <div className="hidden sm:block">
              <div className="flex items-center">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex items-center flex-1 last:flex-none">
                    {/* Step icon */}
                    <div className="flex flex-col items-center relative">
                      <div className="flex-shrink-0 z-10 bg-white p-0.5 rounded-full">
                        {getStepIcon(step.status)}
                      </div>
                      <p
                        className={`absolute top-9 whitespace-nowrap text-xs font-semibold ${
                          step.status === "current"
                            ? "text-[#F5A623]"
                            : step.status === "completed"
                            ? "text-slate-700"
                            : "text-slate-400"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                    {/* Connector line */}
                    {idx !== steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-1 rounded-full ${
                        step.status === "completed" ? "bg-green-500" : "bg-slate-200"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              {/* Spacer for labels below the bar */}
              <div className="h-8" />
            </div>

            {/* Mobile Stepper — vertical timeline */}
            <div className="sm:hidden space-y-0">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  {/* Left column: icon + connector */}
                  <div className="flex flex-col items-center">
                    <div className="flex-shrink-0 z-10 bg-white p-0.5 rounded-full">
                      {getStepIcon(step.status)}
                    </div>
                    {idx !== steps.length - 1 && (
                      <div className={`w-0.5 flex-1 min-h-[28px] ${
                        step.status === "completed" ? "bg-green-500" : "bg-slate-200"
                      }`} />
                    )}
                  </div>
                  {/* Right column: label */}
                  <p
                    className={`pt-0.5 pb-4 text-sm font-semibold ${
                      step.status === "current"
                        ? "text-[#F5A623]"
                        : step.status === "completed"
                        ? "text-slate-700"
                        : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50 flex items-start gap-4">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                <FileText className="w-6 h-6 text-[#F5A623]" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-[#1E293B] mb-1">Estimated Delivery</h4>
                <p className="text-lg text-[#F5A623] font-bold">{order.estimatedDelivery}</p>
                <p className="text-sm text-slate-500 mt-1 font-medium">
                  We're currently adding the final magical touches to your personalized order.
                </p>
              </div>
            </div>
          </div>

          {/* Download Digital Items */}
          {(order.type === "Movie" || order.type === "Combo") && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center flex-shrink-0">
                <Download className="w-8 h-8" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-extrabold text-[#1E293B]">Digital Assets Available</h3>
                <p className="text-slate-500 mt-1 font-medium">
                  Download Emma's personalized movie and digital certificates.
                </p>
              </div>
              <button className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-xl text-white bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-500/30 transition-all duration-200">
                Download Now
              </button>
            </div>
          )}
        </div>

        {/* Sidebar (Right) */}
        <div className="space-y-6">
          {/* Product Preview */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
            <h3 className="text-lg font-extrabold text-[#1E293B] mb-4">Product Preview</h3>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-inner bg-slate-100 mb-4 group">
              <img
                src={order.image}
                alt={`${order.childName}'s ${order.type}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-bold text-lg drop-shadow-md">{order.childName}'s</p>
                <p className="text-sm font-medium text-white/90 uppercase tracking-widest drop-shadow-md">{order.type}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Format</span>
                <span className="font-bold text-[#1E293B]">{order.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Star</span>
                <span className="font-bold text-[#1E293B]">{order.childName}</span>
              </div>
            </div>
          </div>

          {/* Need Help */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-[#1E293B] mb-2">Need Help?</h3>
            <p className="text-slate-500 text-sm font-medium mb-4">
              Have a question about your order or spotted a typo? We're here to help make it perfect.
            </p>
            <button className="w-full inline-flex items-center justify-center px-4 py-2.5 border-2 border-slate-100 rounded-xl text-sm font-bold text-[#1E293B] bg-white hover:border-slate-300 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
