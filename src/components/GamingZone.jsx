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
  Sparkles,
  Flame,
  Activity,
  Radio
} from 'lucide-react';
import { playClickSound, playMountSound } from '../utils/audioEffects';

const BATTLE_STATIONS = [
  {
    id: 'station-esports',
    name: 'STATION 01 // 240Hz ESPORTS ARENA',
    tag: 'RTX 4070 SUPER • 240Hz FAST-IPS',
    specs: 'Intel Core i7-14700KF | RTX 4070 Super 12GB | 240Hz Fast-IPS 0.5ms | Glorious Model O & Wooting 60HE | Low-Ping Dedicated Gigabit LAN',
    games: ['Valorant', 'Counter-Strike 2', 'Apex Legends', 'Overwatch 2'],
    icon: Trophy
  },
  {
    id: 'station-ps5',
    name: 'STATION 02 // 4K 120Hz PS5 VIP SUITE',
    tag: '65" SONY 4K OLED • 4-WAY DUALSENSE',
    specs: 'PlayStation 5 Disc Edition | 65" 4K 120Hz OLED HDR Display | 4x Haptic DualSense Controllers | Recliner Leather Lounge Suite',
    games: ['EA Sports FC 24', 'WWE 2K24', 'Tekken 8', 'Mortal Kombat 1', 'Spider-Man 2'],
    icon: Tv
  },
  {
    id: 'station-sim',
    name: 'STATION 03 // SIM RACING COCKPIT',
    tag: 'FORCE FEEDBACK • STEEL COCKPIT',
    specs: 'Next-Level Racing Steel Rig | Logitech G29 Force-Feedback Dual Motor Wheel | 6-Speed Shifter | Triple Pedals | 144Hz Curved Display',
    games: ['Gran Turismo 7', 'Forza Horizon 5', 'Assetto Corsa', 'F1 24'],
    icon: Headphones
  }
];

export default function GamingZone() {
  const [activeStation, setActiveStation] = useState(0);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(GAMING_ZONE_PLANS[1]);
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    date: '',
    timeSlot: 'Evening (5:00 PM - 8:00 PM)',
    players: '1 Player'
  });

  const handleStationClick = (idx) => {
    playClickSound();
    setActiveStation(idx);
  };

  const handleBookClick = (plan) => {
    playMountSound();
    setSelectedPlan(plan);
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    playMountSound();
    const msg = `*GAMES WORLD CHENNAI - ARENA SEAT RESERVATION*
Plan: ${selectedPlan.title} (${selectedPlan.price})
Station: ${BATTLE_STATIONS[activeStation].name}
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
    <section id="gaming-zone" className="py-16 sm:py-20 bg-transparent border-b border-gw-border relative assemble-on-scroll">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-red-500 font-tech font-bold tracking-widest-plus text-xs uppercase mb-2 assemble-down assemble-delay-1">
            ESPORTS ARENA • PS5 4K VIP LOUNGE • SIM RACING
          </div>
          <h2 className="text-4xl sm:text-6xl font-display tracking-tight text-white assemble-down assemble-delay-2">
            THE GAMES WORLD <span className="text-red-600">GAMING ZONE</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-300 font-sans assemble-down assemble-delay-3">
            Chennai's competitive tournament destination. Powered by RTX 40-Series battle stations, 240Hz high-refresh displays, ultra-low ping gigabit fiber, and private 65" 4K 120Hz PlayStation 5 couch suites.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE BATTLE STATION BAY TELEMETRY */}
        {/* ========================================================================= */}
        <div className="mb-14 p-5 sm:p-7 rounded-2xl bg-[#0a0a10]/95 border border-red-900/50 shadow-2xl relative overflow-hidden assemble-socket assemble-delay-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-gw-border/80 mb-6">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <div>
                <h3 className="text-xl font-display tracking-wider text-white flex items-center gap-2">
                  <span>ARENA STATIONS // READY FOR DEPLOYMENT</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800 font-tech font-bold uppercase">
                    FIBER: 1.2ms PING
                  </span>
                </h3>
                <p className="text-[11px] text-gray-400 font-sans">
                  Select a station loadout below to inspect the dedicated hardware & tournament peripherals.
                </p>
              </div>
            </div>
            <div className="text-xs font-tech text-gray-400">
              LOCATION: <span className="text-white font-bold">ATHIPATTEN ST, CHENNAI</span>
            </div>
          </div>

          {/* Station Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {BATTLE_STATIONS.map((station, idx) => {
              const StationIcon = station.icon;
              const isActive = activeStation === idx;
              return (
                <button
                  key={station.id}
                  onClick={() => handleStationClick(idx)}
                  className={`p-4 rounded-xl border text-left transition-all relative ${
                    isActive
                      ? 'bg-red-950/60 border-red-500 shadow-red-glow text-white'
                      : 'bg-gw-card/80 border-gw-border hover:border-gray-500 text-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-tech font-bold text-red-400">
                      {station.tag}
                    </span>
                    <StationIcon className={`w-4 h-4 ${isActive ? 'text-red-400' : 'text-gray-500'}`} />
                  </div>
                  <div className="text-sm font-display tracking-wider text-white font-bold leading-tight">
                    {station.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Station Specs & Preloaded Titles */}
          <div className="p-4 sm:p-5 rounded-xl bg-gw-card/90 border border-gw-border/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs font-tech font-bold text-red-400 uppercase tracking-wider">
                STATION HARDWARE LOADOUT:
              </div>
              <p className="text-xs sm:text-sm text-gray-200 font-sans">
                {BATTLE_STATIONS[activeStation].specs}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-tech text-gray-400 uppercase">Pre-Loaded Titles:</span>
                {BATTLE_STATIONS[activeStation].games.map((g) => (
                  <span key={g} className="px-2 py-0.5 rounded bg-black/60 border border-gw-border text-[10px] font-tech text-emerald-400">
                    {g}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => handleBookClick(selectedPlan)}
              className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-tech font-bold text-xs uppercase tracking-wider transition-all shadow-red-glow"
            >
              Reserve This Station
            </button>
          </div>
        </div>

        {/* Pricing / Passes Section */}
        <div className="space-y-6">
          <div className="text-center assemble-down assemble-delay-3">
            <h3 className="text-3xl font-display tracking-wider text-white">
              GAMING PASSES & HOURLY RATES
            </h3>
            <p className="text-xs text-gray-400 font-tech uppercase tracking-widest-plus mt-1">Walk-in or Reserve via WhatsApp</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GAMING_ZONE_PLANS.map((plan, idx) => (
              <div
                key={plan.id}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative border assemble-card assemble-up assemble-delay-${idx + 1} ${
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 animate-fadeIn">
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
