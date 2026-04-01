import { Link } from 'react-router-dom';
import { Calendar, LogIn, Sparkles, User, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[1000] w-[95%] max-w-5xl"
    >
      <div className="glass px-8 py-4 flex items-center justify-between rounded-full border-white/10">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter group">
          <div className="p-2 bg-indigo-500/20 rounded-lg group-hover:bg-indigo-500/30 transition-colors">
            <Calendar className="text-indigo-400" size={24} />
          </div>
          <span className="gradient-text">PlanOra</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Events</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                <LayoutDashboard size={16} className="text-indigo-400/60" />
                Dashboard
              </Link>
              <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                <div className="flex items-center gap-2 text-sm font-medium text-indigo-400 bg-indigo-500/10 py-1 px-3 rounded-full border border-indigo-500/20">
                  <User size={14} />
                  {user.name}
                </div>
                <button 
                  onClick={logout}
                  className="text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-rose-400 transition-colors"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                <LogIn size={18} />
                Login
              </Link>
              <Link to="/register" className="btn-primary flex items-center gap-2 py-2 px-6 rounded-full">
                <Sparkles size={16} />
                Join Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
