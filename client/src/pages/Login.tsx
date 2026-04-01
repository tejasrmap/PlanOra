import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, Loader2, Sparkles } from 'lucide-react';
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
      setError(err.response?.data?.message || 'Nexus authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 py-24 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-indigo-600/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-72 h-72 bg-violet-600/10 rounded-full blur-[110px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 glass p-12 max-w-md w-full rounded-[3rem] border-white/5 shadow-2xl shadow-indigo-500/5"
      >
        <div className="flex flex-col items-center mb-12">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 15 }}
            className="p-6 bg-indigo-500/10 rounded-3xl mb-6 border border-indigo-500/20 shadow-inner"
          >
            <LogIn className="text-indigo-400" size={40} />
          </motion.div>
          <h2 className="text-5xl font-black text-center mb-3 tracking-tighter text-white">Welcome Back</h2>
          <p className="text-slate-500 text-center font-medium text-lg">Reconnect with the nexus.</p>
        </div>
        
        <form className="space-y-8" onSubmit={handleSubmit}>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-2xl text-center font-bold uppercase tracking-wider"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400/80 ml-1">Email Nexus</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input 
                  type="email" 
                  placeholder="name@nexus.com" 
                  className="input-field pl-14 h-14 rounded-2xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400/80 ml-1">Security Key</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="input-field pl-14 h-14 rounded-2xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading} 
            className="btn-primary w-full h-16 text-md font-bold uppercase tracking-[0.15em] mt-6 rounded-2xl shadow-xl shadow-indigo-500/10 flex items-center justify-center gap-3 group transition-all"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : (
              <>
                Initialize Access
                <Sparkles size={20} className="group-hover:animate-pulse" />
              </>
            )}
          </button>
        </form>
        
        <p className="mt-12 text-center text-slate-500 font-medium">
          New to PlanOra? <Link to="/register" className="text-indigo-400 hover:text-white transition-colors font-bold">Create Identity</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
