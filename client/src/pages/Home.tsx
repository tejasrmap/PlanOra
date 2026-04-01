import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Loader2, ArrowRight, Play, Globe, Zap } from 'lucide-react';
import EventCard from '../components/EventCard';
import API from '../api';

// Premium Assets
import cyberConferenceImg from '../assets/cyber_conference.png';
import crystalConcertImg from '../assets/crystal_concert.png';
import minimalistGalleryImg from '../assets/minimalist_gallery.png';

const DEMO_EVENTS = [
  {
    id: 'demo-1',
    title: 'Cyber Nexus 2026',
    description: 'The world\'s most advanced gathering of digital architects and neural engineers.',
    date: '2026-06-15',
    location: 'Neo Tokyo',
    capacity: 500,
    image: cyberConferenceImg
  },
  {
    id: 'demo-2',
    title: 'Crystal Symphony',
    description: 'A multi-sensory classical performance held within a floating glass cathedral.',
    date: '2026-07-22',
    location: 'Paris Aurora',
    capacity: 250,
    image: crystalConcertImg
  },
  {
    id: 'demo-3',
    title: 'Minimalist Void',
    description: 'An immersive art installation exploring the intersection of space and silence.',
    date: '2026-08-05',
    location: 'New York Central',
    capacity: 100,
    image: minimalistGalleryImg
  }
];

const Home = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    API.get('/events')
      .then((res) => {
        // Merge API events with demo events for a premium look
        const apiEvents = res.data.map((e: any) => ({
          ...e,
          // Fallback image logic if needed
        }));
        setEvents([...DEMO_EVENTS, ...apiEvents]);
      })
      .catch((err) => {
        console.error(err);
        setEvents(DEMO_EVENTS);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (e.category?.toLowerCase() || 'Experience').includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container relative z-10 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 glass bg-white/5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-10 border border-white/10 shadow-2xl">
              <Sparkles size={14} className="animate-pulse" />
              The Sovereign Nexus of Events
            </div>
            
            <h1 className="text-[clamp(3rem,10vw,7.5rem)] leading-[0.85] font-black tracking-[-0.05em] mb-10 text-white">
              Beyond<br />
              <span className="gradient-text">Imagination.</span>
            </h1>

            <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
              PlanOra is the state-of-the-art ecosystem for the world's most exclusive creators and unforgettable experiences.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-6 mb-24 max-w-2xl mx-auto">
              <div className="relative flex-grow group">
                <div className="absolute inset-0 bg-indigo-500/10 blur-2xl group-focus-within:bg-indigo-500/20 transition-all rounded-3xl" />
                <div className="relative flex items-center glass bg-white/5 border-white/10 px-8 h-20 rounded-3xl">
                  <Search className="text-indigo-400" size={24} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search the nexus..." 
                    className="bg-transparent border-none p-4 focus:ring-0 text-white w-full placeholder:text-slate-600 font-bold text-lg"
                  />
                </div>
              </div>
              <button className="btn-primary flex items-center justify-center gap-4 px-12 h-20 rounded-3xl whitespace-nowrap text-lg font-black uppercase tracking-wider shadow-2xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Enter Nexus
                <ArrowRight size={24} />
              </button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-16 text-slate-600 font-black uppercase tracking-[0.25em] text-[10px]">
              <div className="flex items-center gap-3 group">
                <Globe size={16} className="text-indigo-500/40 group-hover:text-indigo-400 transition-colors" />
                Global Presence
              </div>
              <div className="flex items-center gap-3 group">
                <Zap size={16} className="text-indigo-500/40 group-hover:text-indigo-400 transition-colors" />
                Real-time Sync
              </div>
              <div className="flex items-center gap-3 group">
                <Play size={16} className="text-indigo-500/40 group-hover:text-indigo-400 transition-colors" />
                Live Broadcast
              </div>
            </div>
          </motion.div>
        </section>

        {/* Events Grid Section */}
        <section className="mb-48">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">
                Featured <span className="text-indigo-500">Experiences</span>
              </h2>
              <p className="text-slate-600 font-bold text-lg">Hand-picked events meticulously curated for the extraordinary mind.</p>
            </div>
            <div className="flex gap-4">
              <button className="p-5 glass rounded-3xl cursor-pointer hover:bg-white/10 transition-all border border-white/5 group">
                <ArrowRight size={24} className="rotate-180 text-slate-500 group-hover:text-white transition-colors" />
              </button>
              <button className="p-5 glass rounded-3xl cursor-pointer hover:bg-white/10 transition-all border border-white/5 group">
                <ArrowRight size={24} className="text-slate-500 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {loading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-48 flex flex-col items-center gap-8"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full" />
                  <Loader2 className="animate-spin text-indigo-400 relative" size={80} strokeWidth={1} />
                </div>
                <p className="text-slate-600 font-black tracking-[0.4em] uppercase text-[10px] animate-pulse">Syncing with Nexus...</p>
              </motion.div>
            ) : filteredEvents.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
              >
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-40 rounded-[4rem] glass border-white/5 flex flex-col items-center justify-center text-center p-12 bg-white/[0.01]"
              >
                <div className="w-24 h-24 bg-indigo-500/10 rounded-[2.5rem] flex items-center justify-center mb-8 border border-white/5 shadow-inner">
                  <Search className="text-indigo-400" size={40} />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Signal Interrupted</h3>
                <p className="text-slate-600 max-w-sm font-medium">We couldn't detect any experiences matching your search frequency. Adjust your filters to reconnect.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Value Prop Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-40">
          {[
            { title: 'Crystal Control', desc: 'Sovereign event management with high-fidelity visualization systems.', icon: '💎' },
            { title: 'Global Nexus', desc: 'A unified ecosystem serving creators across borders and boundaries.', icon: '🌐' },
            { title: 'Infinity Engine', desc: 'Scale from intimate gatherings to global movements without friction.', icon: '⚡' }
          ].map((item, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ y: -12 }}
              className="glass p-12 rounded-[3.5rem] border-white/5 hover:bg-white/[0.04] transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full" />
              <div className="text-5xl mb-8 grayscale group-hover:grayscale-0 transition-all scale-100 group-hover:scale-110 duration-700 block">
                {item.icon}
              </div>
              <h4 className="text-2xl font-black text-white mb-4 tracking-tighter group-hover:text-indigo-400 transition-colors uppercase italic">{item.title}</h4>
              <p className="text-slate-500 leading-relaxed font-bold text-sm tracking-tight">{item.desc}</p>
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Home;
