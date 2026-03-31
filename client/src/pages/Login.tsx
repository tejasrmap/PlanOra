import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/auth/login', { email, password });
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass p-10 max-w-md w-full border-white/5"
      >
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-indigo-500/20 rounded-2xl">
            <LogIn className="text-indigo-400" size={32} />
          </div>
        </div>
        
        <h2 className="text-3xl font-extrabold text-center mb-2 tracking-tighter">Welcome Back</h2>
        <p className="text-slate-400 text-center mb-10">Enter your credentials to access PlanOra.</p>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm rounded-lg text-center font-semibold">
              {error}
            </div>
          )}
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
          
          <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-lg mt-4 flex items-center justify-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : 'Login'}
          </button>
        </form>
        
        <p className="mt-8 text-center text-slate-400 text-sm">
          Don't have an account? <Link to="/register" className="text-indigo-400 hover:underline">Register now</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
