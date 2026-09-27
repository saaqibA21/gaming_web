import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { 
  ShieldCheck, 
  Cpu, 
  Flame, 
  Package, 
  Wrench, 
  Award, 
  Sparkles
} from 'lucide-react';

export default function WhyUs() {
  const [activeFaq, setActiveFaq] = useState(null);

  const pillarsDifference = [
    {
      title: "24-Hour Stress Testing",
      desc: "Every PC undergoes continuous 24-hour benchmarking under FurMark GPU burn-in, Cinebench multi-core stress, and MemTest86 before packing to verify zero crashes.",
      icon: Flame
    },
    {
      title: "Clean Cable Management",
      desc: "Every cable is custom-routed, Velcro-strapped, and tension-balanced behind panels for both visual cleanliness and optimal internal airflow.",
      icon: Wrench
    },
    {
      title: "Armored Wooden Crate Transit",
      desc: "Custom-cut expanding foam internally braces the GPU against socket damage, while the chassis is enclosed in double-wall wooden crating for PAN-India transit.",
      icon: Package
    },
    {
      title: "Zero-Bottleneck Guarantee",
      desc: "We verify CPU-GPU-VRM matching before finalizing every build. No underpowered power supplies and no bare-PCB stripped motherboards.",
      icon: ShieldCheck
    }
  ];

  const faqs = [
    {
      q: "Custom PC Builder vs. Prebuilt – Which should I choose?",
      a: "If you have specific game targets, aesthetic choices (like dual-chamber panoramic glass), or specialized editing/streaming needs, our Custom PC Configurator gives you total component freedom. If you want a thoroughly benchmarked machine ready to dispatch in 24 hours, our Prebuilts are tuned for maximum FPS per Rupee."
    },
    {
      q: "How does PAN-India shipping work, and is the graphics card safe?",
      a: "All PCs are packed with internal expanding foam molds that support the heavy GPU and CPU cooler against road vibrations. The PC is then secured inside a custom wooden crate. Every shipment is 100% insured against loss or damage."
    },
    {
      q: "What warranty and after-sales support do you provide?",
      a: "All builds include individual brand component warranties (ranging from 3 to 10 years on RAM & PSUs), plus Games World's 3-year build warranty and dedicated hardware support."
    },
    {
      q: "Can I visit your physical store in Chennai?",
      a: `Yes! You are welcome to visit Games World at ${COMPANY_INFO.address}. Consult directly with our build team in person or bring your gaming laptop in for same-day diagnostic service.`
    }
  ];

  return (
    <section id="why-us" className="py-16 sm:py-20 bg-transparent border-b border-gw-border relative assemble-on-scroll">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-red-500 font-tech font-bold tracking-widest-plus text-xs uppercase mb-2 assemble-down assemble-delay-1">
            HARDWARE INTEGRITY & STANDARDS
          </div>
          <h2 className="text-4xl sm:text-6xl font-display tracking-tight text-white assemble-down assemble-delay-2">
            THE GAMES WORLD <span className="text-red-600">DIFFERENCE</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-300 font-sans assemble-down assemble-delay-3">
            Every build that leaves our workbench is treated as a tournament machine. Here is how we build differently.
          </p>
        </div>

        {/* 4 Quality Standards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {pillarsDifference.map((item, idx) => {
            const Icon = item.icon;
            const delayClass = `assemble-delay-${idx + 1}`;
            return (
              <div 
                key={idx}
                className={`p-6 rounded-2xl bg-gw-card border border-gw-border hover:border-red-600/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-red-glow assemble-card assemble-up ${delayClass}`}
              >
                <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display tracking-wider text-white mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>


        {/* Frequently Asked Questions */}
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-display tracking-wider text-white">
              FREQUENTLY ASKED QUESTIONS
            </h3>
            <p className="text-xs text-gray-400 font-tech uppercase tracking-widest-plus mt-1">
              Clear answers before you buy
            </p>
          </div>

          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="rounded-xl border border-gw-border bg-gw-card overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between text-sm sm:text-base font-tech font-bold text-white hover:text-red-400 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-red-500 ml-4 font-mono font-bold text-lg">
                  {activeFaq === idx ? '−' : '+'}
                </span>
              </button>
              {activeFaq === idx && (
                <div className="p-4 pt-0 text-xs sm:text-sm text-gray-300 font-sans leading-relaxed border-t border-gw-border/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
