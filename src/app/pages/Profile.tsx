import { useState } from "react";
import { User, Mail, Phone, Bell, Plus, Save, Camera, Edit2 } from "lucide-react";

export function Profile() {
  const [children, setChildren] = useState([
    {
      id: 1,
      name: "Emma",
      age: 6,
      photo: "https://images.unsplash.com/photo-1631040651289-703d4e435573?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwa2lkJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczOTM0ODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      name: "Liam",
      age: 4,
      photo: null,
    },
  ]);

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    promos: true,
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-[#1E293B]">Profile & Settings</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl text-sm font-bold text-white bg-[#F5A623] hover:bg-amber-500 shadow-lg shadow-amber-500/30 transition-all duration-200">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (Left) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Parent Information Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
            <h2 className="text-xl font-extrabold text-[#1E293B] mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-[#F5A623]" /> Parent Details
            </h2>
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-[#1E293B] mb-2" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    defaultValue="Sarah"
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#F5A623]/50 focus:border-[#F5A623] transition-all font-medium text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1E293B] mb-2" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    defaultValue="Johnson"
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#F5A623]/50 focus:border-[#F5A623] transition-all font-medium text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1E293B] mb-2" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    defaultValue="sarah.johnson@example.com"
                    className="block w-full pl-11 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#F5A623]/50 focus:border-[#F5A623] transition-all font-medium text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1E293B] mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    defaultValue="+1 (555) 123-4567"
                    className="block w-full pl-11 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#F5A623]/50 focus:border-[#F5A623] transition-all font-medium text-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Children Profiles */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-extrabold text-[#1E293B]">Saved Children</h2>
              <button className="text-[#F5A623] font-bold text-sm hover:text-amber-600 flex items-center gap-1 transition-colors bg-orange-50 px-3 py-1.5 rounded-full">
                <Plus className="w-4 h-4" />
                Add Child
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {children.map((child) => (
                <div
                  key={child.id}
                  className="p-4 rounded-2xl border-2 border-slate-100 bg-slate-50 hover:border-slate-200 transition-all flex items-center gap-4 relative group cursor-pointer"
                >
                  <div className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Edit2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="w-16 h-16 rounded-full bg-white border border-slate-200 overflow-hidden flex-shrink-0 relative">
                    {child.photo ? (
                      <img
                        src={child.photo}
                        alt={child.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <Camera className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#1E293B] text-lg">{child.name}</h3>
                    <p className="text-sm font-medium text-slate-500">{child.age} years old</p>
                  </div>
                </div>
              ))}

              <button className="p-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-white hover:border-[#F5A623] transition-all flex flex-col items-center justify-center gap-2 h-full text-slate-500 hover:text-[#F5A623] group py-8 sm:py-0">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover:bg-orange-50 transition-colors shadow-sm">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="font-bold text-sm">Add New Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar (Right) */}
        <div className="space-y-8">
          {/* Notification Preferences */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
            <h2 className="text-xl font-extrabold text-[#1E293B] mb-6 flex items-center gap-2">
              <Bell className="w-6 h-6 text-[#F5A623]" /> Notifications
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#1E293B]">Email Updates</p>
                  <p className="text-sm text-slate-500 font-medium mt-1">Order status & delivery</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:ring-offset-2 ${
                    notifications.email ? "bg-green-500" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.email ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#1E293B]">SMS Alerts</p>
                  <p className="text-sm text-slate-500 font-medium mt-1">Get texts on delivery day</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, sms: !notifications.sms })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:ring-offset-2 ${
                    notifications.sms ? "bg-green-500" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.sms ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#1E293B]">Promotional</p>
                  <p className="text-sm text-slate-500 font-medium mt-1">Special offers & news</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, promos: !notifications.promos })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:ring-offset-2 ${
                    notifications.promos ? "bg-green-500" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.promos ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
