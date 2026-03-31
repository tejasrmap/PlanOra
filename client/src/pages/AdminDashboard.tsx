import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Users, BarChart3, Presentation } from 'lucide-react';

const ADMIN_EVENTS = [
  { id: '1', title: 'Tech Pulse 2026', date: '2026-04-15', attendees: 124, capacity: 500, status: 'Active' },
  { id: '2', title: 'Art & Soul Expo', date: '2026-05-10', attendees: 45, capacity: 200, status: 'Draft' },
];

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-extrabold mb-2 tracking-tighter">Admin Control Center</h1>
          <p className="text-slate-400">Manage your events, view analytics, and grow your community.</p>
        </motion.div>
        
        <button className="btn-primary flex items-center gap-2 px-8 py-4 shadow-indigo-500/20 shadow-lg">
          <Plus size={20} />
          Create New Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Live Events', value: '12', icon: Presentation, color: 'text-indigo-400' },
          { label: 'Total Attendees', value: '2,450', icon: Users, color: 'text-emerald-400' },
          { label: 'Avg. Attendance', value: '82%', icon: BarChart3, color: 'text-amber-400' },
          { label: 'Revenue (Mock)', value: '$12.4k', icon: SparklesIcon, color: 'text-rose-400' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 border-white/5 border-l-4"
          >
            <div className="flex justify-between items-start mb-4">
               {stat.icon && <stat.icon className={stat.color} size={24} />}
               <span className={`${stat.color} text-xs font-bold bg-white/5 px-2 py-1 rounded`}>+12.5%</span>
            </div>
            <p className="text-slate-400 text-sm mb-1 uppercase tracking-widest font-bold">{stat.label}</p>
            <p className="text-3xl font-extrabold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
          <h2 className="text-2xl font-bold">Manage Events</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 glass text-sm font-semibold border-white/10 hover:bg-white/10 transition-all">All</button>
            <button className="px-4 py-2 glass text-sm font-semibold border-white/10 opacity-50">Active</button>
            <button className="px-4 py-2 glass text-sm font-semibold border-white/10 opacity-50">Archived</button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 text-xs font-black uppercase tracking-widest border-b border-white/5">
                <th className="px-8 py-6">Event Title</th>
                <th className="px-8 py-6">Date</th>
                <th className="px-8 py-6">Attendance</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {ADMIN_EVENTS.map((event) => (
                <tr key={event.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-6 font-bold text-lg group-hover:text-indigo-400 transition-colors">{event.title}</td>
                  <td className="px-8 py-6 text-slate-400">{new Date(event.date).toLocaleDateString()}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[100px] h-1.5 bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-indigo-500" style={{ width: `${(event.attendees/event.capacity)*100}%` }} />
                      </div>
                      <span className="text-xs font-bold text-slate-400">{event.attendees}/{event.capacity}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      event.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 glass border-white/10 hover:border-indigo-400 transition-colors">
                        <Edit2 size={16} className="text-indigo-400" />
                      </button>
                      <button className="p-2 glass border-white/10 hover:border-rose-400 transition-colors">
                        <Trash2 size={16} className="text-rose-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-8 bg-white/5 border-t border-white/5 text-center">
            <button className="text-indigo-400 font-bold hover:underline text-sm uppercase tracking-widest">
                View Detailed Analytics Reports
            </button>
        </div>
      </div>
    </div>
  );
};

const SparklesIcon = ({ className, size }: { className?: string, size?: number }) => (
  <BarChart3 className={className} size={size} />
);

export default AdminDashboard;
