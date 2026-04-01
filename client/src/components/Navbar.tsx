import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Calendar, User, LogOut, Sparkles } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 flex justify-center px-4">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="glass px-6 py-3 flex items-center justify-between rounded-full border-white/10 shadow-2xl backdrop-blur-2xl w-full max-w-5xl"
      >
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group decoration-none">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
              <Calendar className="text-white" size={20} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">Plan<span className="text-indigo-400">Ora</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest decoration-none">Events</Link>
            {user && (
              <Link to="/dashboard" className="text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest decoration-none">Organize</Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="flex items-center gap-2 p-2 glass rounded-full border-white/5 hover:bg-white/10 transition-all decoration-none">
                <div className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center">
                  <User size={16} className="text-indigo-400" />
                </div>
                <span className="text-sm font-bold text-white pr-2 hidden sm:inline">{user.name}</span>
              </Link>
              <button 
                onClick={logout}
                className="p-3 glass rounded-full border-white/5 hover:bg-red-500/10 hover:text-red-400 transition-all text-slate-400"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-5 py-2.5 text-sm font-bold text-slate-400 hover:text-white transition-colors decoration-none">
                Sign In
              </Link>
              <Link to="/register" className="btn-primary flex items-center gap-2 group px-6 py-2.5 rounded-full relative overflow-hidden decoration-none">
                <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                <span className="relative z-10 text-sm">Join Now</span>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
