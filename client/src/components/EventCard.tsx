import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    capacity: number;
    image?: string;
  };
}

const EventCard = ({ event }: EventCardProps) => {
  const hasImage = !!event.image;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="glass group relative overflow-hidden flex flex-col h-full rounded-[2.5rem] border-white/5 shadow-2xl transition-all"
    >
      <Link to={`/events/${event.id}`} className="flex flex-col h-full">
        {/* Image / Header Section */}
        <div className="relative h-56 overflow-hidden">
          {hasImage ? (
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-600/20 to-violet-600/20 flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              <span className="text-indigo-400 font-black tracking-widest uppercase text-[10px] opacity-50 z-10">Premium Experience</span>
            </div>
          )}
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-[#0a0c10]/20 to-transparent" />
          
          {/* Category Tag */}
          <div className="absolute top-6 left-6 px-4 py-2 glass-hover rounded-full border border-white/10 text-[9px] font-black uppercase tracking-[0.25em] text-white z-20">
            Nexus Event
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 flex flex-col flex-grow relative z-10">
          <div className="flex-grow mb-8">
            <h3 className="text-2xl font-black mb-3 text-white tracking-tighter leading-tight group-hover:text-indigo-400 transition-colors">
              {event.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 font-medium">
              {event.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 items-center">
            <div className="flex items-center gap-3 text-slate-500">
              <Calendar size={16} className="text-indigo-500/60" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center gap-3 text-slate-500">
              <MapPin size={16} className="text-indigo-500/60" />
              <span className="text-[10px] font-black uppercase tracking-widest truncate">
                {event.location}
              </span>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 py-4 bg-white/5 group-hover:bg-indigo-500 rounded-[1.5rem] border border-white/5 group-hover:border-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all shadow-xl shadow-black/20">
            Initialize Access
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default EventCard;
