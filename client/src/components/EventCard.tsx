import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  capacity: number;
}

const EventCard = ({ id, title, date, location, category, capacity }: EventCardProps) => {
  return (
    <Link to={`/events/${id}`} className="event-card glass p-6 block hover:border-indigo-500/50 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-bold rounded-full uppercase tracking-wider">
          {category}
        </span>
        <div className="text-slate-500 flex items-center gap-1 text-sm">
          <Users size={14} />
          {capacity}
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">{title}</h3>
      
      <div className="space-y-2 text-slate-400 text-sm">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          {new Date(date).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          {location}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-indigo-400 font-semibold group-hover:underline">View Details</span>
      </div>
    </Link>
  );
};

export default EventCard;
