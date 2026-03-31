import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Tag, Loader2 } from 'lucide-react';
import API from '../api';

const Dashboard = () => {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/registrations/me')
      .then((res) => setRegistrations(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-extrabold mb-2 tracking-tighter">My Dashboard</h1>
          <p className="text-slate-400">Manage your registrations and upcoming events.</p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full md:w-auto">
          <div className="glass p-4 text-center border-white/5">
            <p className="text-slate-400 text-xs mb-1 uppercase tracking-widest font-bold">Total</p>
            <p className="text-2xl font-bold">{registrations.length}</p>
          </div>
          <div className="glass p-4 text-center border-white/5">
            <p className="text-slate-400 text-xs mb-1 uppercase tracking-widest font-bold">Upcoming</p>
            <p className="text-2xl font-bold text-indigo-400">{registrations.filter(r => new Date(r.event.date) > new Date()).length}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
        {loading ? (
          <div className="py-20 flex flex-col items-center gap-4 text-slate-500">
            <Loader2 className="animate-spin" size={48} />
            <p className="text-xl">Loading your schedule...</p>
          </div>
        ) : registrations.length > 0 ? (
          registrations.map((reg, index) => (
            <motion.div
              key={reg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 border-white/5 hover:border-indigo-500/30 transition-all group"
            >
              <div className="flex-1 space-y-3 w-full">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-bold rounded-full uppercase tracking-wider">
                    {reg.event.category}
                  </span>
                  <span className={`text-xs font-bold flex items-center gap-1 ${reg.status === 'CONFIRMED' ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {reg.status === 'CONFIRMED' && <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />}
                    {reg.status}
                  </span>
                </div>
                <h3 className="text-2xl font-bold group-hover:text-indigo-400 transition-colors">{reg.event.title}</h3>
                <div className="flex flex-wrap gap-6 text-slate-400 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-indigo-400" />
                    {new Date(reg.event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-indigo-400" />
                    {reg.event.location}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button className="glass px-6 py-3 font-semibold text-sm hover:bg-white/5 border-white/10 flex-1 md:flex-initial">
                  Details
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="glass p-20 text-center border-white/5 opacity-50">
            <Tag size={48} className="mx-auto mb-4 text-slate-600" />
            <p className="text-xl">No registrations yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
