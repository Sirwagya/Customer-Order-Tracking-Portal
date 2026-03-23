import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, LogIn } from "lucide-react";
import logoImg from "../../assets/logo.webp";
import bgImg from "../../assets/root_page_bg.webp";
import googleIcon from "../../assets/search.webp";

const DEMO_EMAIL = "sarah@onceuponme.com";
const DEMO_PASSWORD = "magic123";

export function Login() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isNewUser) {
      // For "Create Account" mode, just navigate (no real backend yet)
      navigate("/dashboard");
      return;
    }

    // Demo credential validation
    if (email.toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError("Invalid email or password. Try sarah@onceuponme.com / magic123");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex font-['OnceUponMe','Nunito',sans-serif] bg-[#FDFBF7]">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-center items-center bg-orange-50/50">
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] to-transparent z-10" />
        <img
          src={bgImg}
          alt="OnceUponMe Background"
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80"
        />
        <div className="relative z-20 max-w-lg px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#1E293B] mb-6">
            Welcome to OnceUponMe
          </h1>
          <p className="text-xl text-[#334155] font-medium leading-relaxed">
            Where your child is the star of the story. Turn magical moments into personalized storybooks and movies.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 w-full relative">
        {/* Mobile Header Image / Info */}
        <div className="lg:hidden text-center mb-10 mt-[-2rem]">
          <img src={logoImg} alt="OnceUponMe Logo" className="w-16 h-16 object-contain mx-auto mb-4" />
          <h1 className="text-3xl font-extrabold text-[#1E293B] mb-2">OnceUponMe</h1>
          <p className="text-[#64748B] font-medium max-w-sm mx-auto">
            Where your child is the star of the story.
          </p>
        </div>

        <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 border border-slate-100">
          <div className="text-center mb-8 hidden lg:block">
            <img src={logoImg} alt="OnceUponMe Logo" className="w-14 h-14 object-contain mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#1E293B]">
              {isNewUser ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              {isNewUser ? "Start your magical journey today" : "Log in to track your magical orders"}
            </p>
          </div>
          
          <h2 className="text-2xl font-bold text-[#1E293B] lg:hidden mb-6 text-center">
            {isNewUser ? "Create Account" : "Welcome Back"}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-[#1E293B] mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className="block w-full pl-11 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#F5A623]/50 focus:border-[#F5A623] transition duration-150 ease-in-out font-medium text-slate-900"
                  placeholder="parent@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1E293B] mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  className="block w-full pl-11 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#F5A623]/50 focus:border-[#F5A623] transition duration-150 ease-in-out font-medium text-slate-900"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {!isNewUser && (
              <div className="flex items-center justify-end">
                <a href="#" className="text-sm font-bold text-[#F5A623] hover:text-amber-600 transition-colors">
                  Forgot your password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-base font-bold text-white bg-[#F5A623] hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F5A623] shadow-lg shadow-amber-500/30 transition-all duration-200 active:scale-[0.98]"
            >
              <LogIn className="w-5 h-5 mr-2" />
              {isNewUser ? "Create Account" : "Sign In"}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-slate-500 font-medium">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="w-full flex justify-center py-3 px-4 border-2 border-slate-100 rounded-xl text-sm font-bold text-[#1E293B] bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F5A623] transition-all duration-200"
              >
                <img src={googleIcon} alt="Google" className="w-5 h-5 mr-2" />
                {isNewUser ? "Sign up with Google" : "Sign in with Google"}
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => { setIsNewUser(!isNewUser); setError(""); }}
              className="font-bold text-[#F5A623] hover:text-amber-600 transition-colors"
            >
              {isNewUser
                ? "Already have an account? Sign in"
                : "New to OnceUponMe? Create Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
