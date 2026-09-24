import React, { useState } from 'react';
import { GAMING_ZONE_PLANS, COMPANY_INFO } from '../data/mockData';
import { 
  Gamepad2, 
  Trophy, 
  Tv, 
  Headphones, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Share2, 
  Users,
  Sparkles
} from 'lucide-react';

export default function GamingZone() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(GAMING_ZONE_PLANS[1]);
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    date: '',
    timeSlot: 'Evening (5:00 PM - 8:00 PM)',
    players: '1 Player'
  });

  const handleBookClick = (plan) => {
    setSelectedPlan(plan);
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const msg = `*GAMES WORLD CHENNAI - ARENA SEAT RESERVATION*
Plan: ${selectedPlan.title} (${selectedPlan.price})
Name: ${bookingData.name}
Phone: ${bookingData.phone}
Date: ${bookingData.date || 'Today'}
Time Slot: ${bookingData.timeSlot}
Party Size: ${bookingData.players}
---------------------------------
Please reserve our station/booth.`;

    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    setBookingModalOpen(false);
  };

  return (
    <section id="gaming-zone" className="py-16 sm:py-20 bg-[#0a0a0f]/85 backdrop-blur-md border-b border-gw-border relative cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-red-500 font-tech font-bold tracking-widest-plus text-xs uppercase mb-2">
            ESPORTS ARENA • PS5 4K VIP LOUNGE • SIM RACING
          </div>
          <h2 className="text-4xl sm:text-6xl font-display tracking-tight text-white">
            THE GAMES WORLD <span className="text-red-600">GAMING ZONE</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-300 font-sans">
            Chennai's competitive tournament destination. Powered by RTX 40-Series battle stations, 240Hz high-refresh displays, ultra-low ping gigabit fiber, and private 65" 4K 120Hz PlayStation 5 couch suites.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          
          <div className="p-6 rounded-2xl bg-gw-card border border-gw-border hover:border-red-600/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display tracking-wider text-white mb-2">240Hz TOURNAMENT RIGS</h3>
            <p className="text-xs text-gray-300 font-sans leading-relaxed">
              Every esports station features 240Hz Fast-IPS monitors, RTX 4070 Super graphics, mechanical switches, and zero-packet-loss fiber for Valorant, CS2, and Apex Legends.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gw-card border border-gw-border hover:border-red-600/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Tv className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display tracking-wider text-white mb-2">PS5 4K 120Hz VIP COUCH</h3>
            <p className="text-xs text-gray-300 font-sans leading-relaxed">
              Private leather recliner couch booth with a 65-inch 4K 120Hz OLED TV and 4 DualSense controllers. Ready for FC 24, WWE 2K24, Tekken 8, and Mortal Kombat 1.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gw-card border border-gw-border hover:border-red-600/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display tracking-wider text-white mb-2">FORCE-FEEDBACK SIM RACING</h3>
            <p className="text-xs text-gray-300 font-sans leading-relaxed">
              Dedicated steel cockpit rig with Logitech G29 force-feedback wheel, paddle shifters, and 3-pedal floor unit for Gran Turismo 7 and Forza Horizon 5.
            </p>
          </div>

        </div>

        {/* Pricing / Passes Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-3xl font-display tracking-wider text-white">
              GAMING PASSES & HOURLY RATES
            </h3>
            <p className="text-xs text-gray-400 font-tech uppercase tracking-widest-plus mt-1">Walk-in or Reserve via WhatsApp</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GAMING_ZONE_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative border ${
                  plan.popular 
                    ? 'bg-gradient-to-b from-red-950/50 via-gw-card to-gw-card border-red-600 shadow-red-glow' 
                    : 'bg-gw-card border-gw-border hover:border-gray-500'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 right-4 px-3 py-0.5 rounded-full text-[10px] font-tech font-bold uppercase tracking-wider bg-red-600 text-white shadow-md">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <h4 className="text-xl font-display tracking-wider text-white">{plan.title}</h4>
                  
                  <div className="mt-3 mb-6">
                    <span className="text-4xl font-display text-red-500 tracking-wide">{plan.price}</span>
                    <span className="text-xs text-gray-400 font-tech ml-1">{plan.unit}</span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-gray-300 font-sans">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleBookClick(plan)}
                  className={`mt-8 w-full py-3 px-4 rounded-xl text-xs font-tech font-bold uppercase tracking-wider transition-all duration-200 ${
                    plan.popular
                      ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-glow'
                      : 'bg-[#181822] hover:bg-red-600 text-gray-200 hover:text-white border border-gw-border'
                  }`}
                >
                  Book Slot
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Location & Arena Info */}
        <div className="mt-12 text-center text-xs text-gray-400 font-sans">
          📍 Arena Location: <span className="text-white font-semibold">{COMPANY_INFO.address}</span> • Open Daily from 10:30 AM to 9:30 PM
        </div>

      </div>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#101017] border border-red-600/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 text-red-500 mb-1">
              <Gamepad2 className="w-5 h-5" />
              <span className="text-xs font-tech font-bold tracking-wider uppercase">Games World Arena Booking</span>
            </div>

            <h3 className="text-2xl font-display tracking-wider text-white">
              RESERVE: {selectedPlan?.title}
            </h3>
            <p className="text-xs text-gray-400 mt-1 mb-6 font-sans">
              Rate: <span className="text-red-400 font-bold font-tech">{selectedPlan?.price} {selectedPlan?.unit}</span>
            </p>

            <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Your Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-gw-border text-white focus:outline-none focus:border-red-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">WhatsApp Phone Number</label>
                <input 
                  type="tel" 
                  required
                  placeholder="+91 9876543210"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-gw-border text-white focus:outline-none focus:border-red-500 font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Date</label>
                  <input 
                    type="date" 
                    value={bookingData.date}
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-gw-border text-white focus:outline-none focus:border-red-500 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Number of Gamers</label>
                  <select 
                    value={bookingData.players}
                    onChange={(e) => setBookingData({...bookingData, players: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-gw-border text-white focus:outline-none focus:border-red-500 font-sans"
                  >
                    <option>1 Player</option>
                    <option>2 Players</option>
                    <option>3 - 4 Players (VIP)</option>
                    <option>5+ Squad Team</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Preferred Time Slot</label>
                <select 
                  value={bookingData.timeSlot}
                  onChange={(e) => setBookingData({...bookingData, timeSlot: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-gw-border text-white focus:outline-none focus:border-red-500 font-sans"
                >
                  <option>Morning (11:00 AM - 2:00 PM)</option>
                  <option>Afternoon (2:00 PM - 5:00 PM)</option>
                  <option>Evening (5:00 PM - 8:00 PM)</option>
                  <option>Night (8:00 PM - 10:00 PM)</option>
                  <option>Night Owl Lock-in (10:00 PM - 7:00 AM)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-tech font-bold uppercase tracking-wider text-xs shadow-red-glow transition-all"
              >
                Confirm via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
