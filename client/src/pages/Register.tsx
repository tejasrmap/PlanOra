import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, Briefcase, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/auth/register', { name, email, password, role });
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass p-10 max-w-lg w-full border-white/5"
      >
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-indigo-500/20 rounded-2xl">
            <UserPlus className="text-indigo-400" size={32} />
          </div>
        </div>
        
        <h2 className="text-3xl font-extrabold text-center mb-2 tracking-tighter">Create Account</h2>
        <p className="text-slate-400 text-center mb-10">Join PlanOra and start your event journey.</p>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm rounded-lg text-center font-semibold">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="pl-12" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 ml-1">Account Role</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <select 
                  className="glass pl-12 pr-4 py-3 rounded-lg border border-white/10 w-full appearance-none text-slate-400 focus:outline-none focus:border-indigo-500"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="USER">Attendee (User)</option>
                  <option value="ADMIN">Organizer (Admin)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="email" 
                placeholder="name@example.com" 
                className="pl-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="pl-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-lg mt-4 shadow-xl flex items-center justify-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : 'Register'}
          </button>
        </form>
        
        <p className="mt-8 text-center text-slate-400 text-sm">
          Already have an account? <Link to="/login" className="text-indigo-400 hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
