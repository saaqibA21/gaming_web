import React from 'react';
import { TESTIMONIALS, COMPANY_INFO } from '../data/mockData';
import { Star, Quote, CheckCircle, Camera } from 'lucide-react';

export default function Testimonials() {
  const galleryImages = [
    { title: "01. Workhorse Office Rig", img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80" },
    { title: "02. Striker 240Hz Esports Rig", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80" },
    { title: "03. Monster Dual-Chamber Hybrid", img: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&auto=format&fit=crop&q=80" },
    { title: "05. Oracle Local AI Workstation", img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80" },
  ];

  return (
    <section className="py-20 sm:py-28 bg-mode-black border-b border-white/[0.08] relative assemble-on-scroll">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 assemble-down assemble-delay-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-tech font-bold tracking-widest-plus text-xs uppercase mb-3">
            VERIFIED CLIENT REVIEWS
          </div>
          <h2 className="text-4xl sm:text-6xl font-display tracking-tight text-soft-mist">
            WHAT CLIENTS <span className="text-primary">SAY</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/60 font-sans">
            Real feedback from professionals, gamers, and studios who trust Games World Chennai for purpose-built hardware.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {TESTIMONIALS.map((item, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-2xl animate-glass border border-white/[0.08] hover:border-primary/40 transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1 assemble-card assemble-up assemble-delay-${idx + 1}`}
            >
              <Quote className="w-8 h-8 text-primary/30 mb-3" />
              
              <p className="text-xs sm:text-sm text-white/70 font-sans italic leading-relaxed mb-6">
                "{item.text}"
              </p>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <div>
                  <div className="text-base font-display tracking-wider text-soft-mist flex items-center gap-1.5">
                    <span>{item.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-primary fill-primary/20" />
                  </div>
                  <div className="text-[11px] text-white/50 font-sans">{item.role} • {item.city}</div>
                </div>

                <div className="flex gap-0.5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-primary fill-primary" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rig Showcase Gallery */}
        <div className="pt-4 assemble-up assemble-delay-3">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              <h3 className="text-2xl font-display tracking-wider text-soft-mist">
                RECENT PURPOSE BUILDS
              </h3>
            </div>
            <span className="text-xs text-primary font-tech uppercase tracking-wider font-bold">#FiveMachinesFivePurposes</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <div 
                key={i}
                className="relative rounded-2xl overflow-hidden h-52 group cursor-pointer border border-white/[0.08] hover:border-primary/50 transition-all"
              >
                <img 
                  src={img.img} 
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>
                <div className="absolute bottom-3 left-3 right-3 text-sm font-display tracking-wider text-soft-mist group-hover:text-primary transition-colors">
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
