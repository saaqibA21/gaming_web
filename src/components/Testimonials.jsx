import React from 'react';
import { TESTIMONIALS, COMPANY_INFO } from '../data/mockData';
import { Star, Quote, CheckCircle, Camera } from 'lucide-react';

export default function Testimonials() {
  const galleryImages = [
    { title: "Dual-Chamber Panoramic RTX 4080 Super", img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80" },
    { title: "240Hz Esports Zone Tournament Rig", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80" },
    { title: "Custom Liquid Loop 9800X3D Rig", img: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&auto=format&fit=crop&q=80" },
    { title: "AI Workstation Pre-Packed for Transit", img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80" },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#070709]/85 backdrop-blur-md border-b border-gw-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-red-500 font-tech font-bold tracking-widest-plus text-xs uppercase mb-2">
            VERIFIED CUSTOMER REVIEWS
          </div>
          <h2 className="text-4xl sm:text-6xl font-display tracking-tight text-white">
            WHAT GAMERS <span className="text-red-600">SAY</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-300 font-sans">
            Real feedback from gamers, streamers, and esports players who build and game at Games World Chennai.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {TESTIMONIALS.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-gw-card border border-gw-border hover:border-red-600/50 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="w-8 h-8 text-red-600/30 mb-3" />
              
              <p className="text-xs sm:text-sm text-gray-200 font-sans italic leading-relaxed mb-6">
                "{item.text}"
              </p>

              <div className="pt-4 border-t border-gw-border flex items-center justify-between">
                <div>
                  <div className="text-base font-display tracking-wider text-white flex items-center gap-1.5">
                    <span>{item.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-red-500 fill-red-500 text-black" />
                  </div>
                  <div className="text-[11px] text-gray-400 font-sans">{item.role} • {item.city}</div>
                </div>

                <div className="flex gap-0.5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rig Showcase Gallery */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-red-500" />
              <h3 className="text-2xl font-display tracking-wider text-white">
                RECENT WORKBENCH BUILDS
              </h3>
            </div>
            <span className="text-xs text-gray-400 font-tech uppercase tracking-wider">#GamesWorldCustoms</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <div 
                key={i}
                className="relative rounded-xl overflow-hidden h-52 group cursor-pointer border border-gw-border hover:border-red-600/60"
              >
                <img 
                  src={img.img} 
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-3 left-3 right-3 text-sm font-display tracking-wider text-white group-hover:text-red-400 transition-colors">
                  {img.title}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
