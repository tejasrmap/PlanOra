import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowLeft, ShieldCheck, Clock, Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import API from '../api';
import { useAuth } from '../context/AuthContext';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get(`/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch(() => setError('Event not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleRegister = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setRegistering(true);
    try {
      await API.post('/registrations', { eventId: id });
      setRegistered(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setRegistering(false);
    }
  };

  if (loading) return (
    <div className="container mx-auto px-4 py-12 max-w-5xl text-center flex flex-col items-center justify-center min-h-[50vh]">
      <Loader2 className="animate-spin text-indigo-500 mb-4" size={48} />
      <p className="text-xl text-slate-400">Loading event details...</p>
    </div>
  );

  if (error || !event) return (
    <div className="container mx-auto px-4 py-12 max-w-5xl text-center">
      <h2 className="text-3xl font-bold text-rose-400 mb-4">{error || 'Event not found'}</h2>
      <Link to="/" className="btn-primary inline-block">Back to Events</Link>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Events
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="px-4 py-1 bg-indigo-500/20 text-indigo-400 text-sm font-bold rounded-full uppercase tracking-wider mb-6 inline-block">
              {event.category}
            </span>
            <h1 className="text-5xl font-extrabold mb-6 tracking-tighter leading-tight">{event.title}</h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              {event.description}
            </p>

            <div className="glass p-8 space-y-6 border-white/5">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck className="text-indigo-400" />
                Event Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-xl">
                    <Calendar className="text-indigo-400" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-300">Date</h4>
                    <p className="text-slate-400">{new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'full' })}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-xl">
                    <Clock className="text-indigo-400" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-300">Time</h4>
                    <p className="text-slate-400">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-xl">
                    <MapPin className="text-indigo-400" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-300">Location</h4>
                    <p className="text-slate-400">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-xl">
                    <Users className="text-indigo-400" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-300">Capacity</h4>
                    <p className="text-slate-400">{event.capacity} Spots Total</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 sticky top-32 border-indigo-500/20"
          >
            <h3 className="text-2xl font-bold mb-6">Reserve Your Spot</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-400">
                <span>Registration Fee</span>
                <span className="text-white font-semibold">Free</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Status</span>
                <span className="text-indigo-400 font-semibold">{registered ? 'Already Registered' : 'Available'}</span>
              </div>
            </div>
            
            <button 
              onClick={handleRegister}
              disabled={registering || registered}
              className={`w-full py-4 text-lg font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
                registered 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-none cursor-default' 
                : 'btn-primary shadow-indigo-500/20'
              }`}
            >
              {registering ? <Loader2 className="animate-spin" /> : 
               registered ? <><CheckCircle2 size={20} /> Registered</> : 
               'Register Now'}
            </button>
            <p className="mt-4 text-center text-xs text-slate-500">
              {registered ? 'Check your dashboard for details.' : 'By registering, you agree to our Terms of Service.'}
            </p>

            <div className="mt-10 pt-8 border-t border-white/5 text-center">
              <p className="text-slate-400 text-sm mb-2">Hosted By</p>
              <p className="font-bold text-lg">{event.organizer?.name || 'Authorized Organizer'}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
