import { Outlet, Link, useLocation } from "react-router";
import { BookOpen, User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import logoImg from "../../assets/logo.webp";

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const isActive = (path: string) => {
    if (path === "/dashboard" && location.pathname === "/dashboard") return true;
    if (path !== "/dashboard" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { name: "My Orders", path: "/dashboard", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Profile", path: "/profile", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] flex flex-col font-['OnceUponMe','Nunito',sans-serif]">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-2 flex-shrink-0">
              <img src={logoImg} alt="OnceUponMe Logo" className="w-9 h-9 object-contain" />
              <span className="font-bold text-xl tracking-tight text-[#1E293B]">OnceUponMe</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive(link.path) ? "text-[#F5A623]" : "text-slate-600 hover:text-[#F5A623]"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <div className="h-6 w-px bg-slate-200 mx-2" />
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-600 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-slate-500 hover:text-[#F5A623] hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F5A623]"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white">
            <div className="pt-2 pb-3 space-y-1 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-semibold ${
                    isActive(link.path)
                      ? "bg-orange-50 text-[#F5A623]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-slate-100 my-2" />
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Outlet />
      </main>
    </div>
  );
}
