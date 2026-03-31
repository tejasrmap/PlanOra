import { Link } from 'react-router-dom';
import { Calendar, User, LogIn } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar border-b border-white/10">
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
        <Calendar className="text-indigo-500" />
        <span className="gradient-text">PlanOra</span>
      </Link>
      
      <div className="flex items-center gap-8">
        <Link to="/" className="text-slate-300 hover:text-white transition-colors">Events</Link>
        <Link to="/login" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
          <LogIn size={18} />
          Login
        </Link>
        <Link to="/register" className="btn-primary">
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
