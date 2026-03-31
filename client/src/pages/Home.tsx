import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Loader2 } from 'lucide-react';
import EventCard from '../components/EventCard';
import API from '../api';

const Home = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/events')
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="hero mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-sm font-semibold mb-6 border border-indigo-500/20">
            <Sparkles size={16} />
            Experience Events Like Never Before
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tighter leading-tight">
            Discover. Plan. <br />
            <span className="gradient-text">Celebrate Together.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            The world's most premium event management platform. Join thousands of creators and attendees in the ultimate event ecosystem.
          </p>
          
          <div className="flex max-w-xl mx-auto gap-3 glass p-2 rounded-2xl border-white/5 mb-20">
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search className="text-slate-500" size={20} />
              <input 
                type="text" 
                placeholder="Search events, categories, or keywords..." 
                className="bg-transparent border-none p-0 m-0 focus:ring-0 text-white w-full h-12"
              />
            </div>
            <button className="btn-primary flex items-center gap-2">
              Explore
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full py-20 flex flex-col items-center gap-4 text-slate-500">
              <Loader2 className="animate-spin" size={48} />
              <p className="text-xl">Discovering amazing events...</p>
            </div>
          ) : events.length > 0 ? (
            events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <EventCard {...event} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center glass border-white/5 opacity-50">
              <p className="text-xl">No events found. Be the first to create one!</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-12">Curated Categories</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {['Tech', 'Music', 'Arts', 'Education', 'Sports', 'Business'].map(cat => (
            <div key={cat} className="glass px-8 py-4 cursor-pointer hover:bg-white/10 transition-all font-semibold rounded-2xl border-white/5">
              {cat}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
