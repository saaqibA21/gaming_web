import { PREBUILT_PCS, PC_PARTS } from '../data/mockData';

const STORAGE_KEYS = {
  QUOTES: 'gw_admin_quotes',
  PACKS: 'gw_admin_packs',
  PARTS: 'gw_admin_parts',
  OFFERS: 'gw_admin_offers'
};

// Seed realistic quotes/leads for demonstration
const INITIAL_QUOTES = [
  {
    id: 'quote-101',
    type: 'consultation',
    customerName: 'Karthik Subramanian',
    phone: '+91 98401 23456',
    email: 'karthik.sub@gmail.com',
    targetBudget: '₹72,999 (02. Striker)',
    machinePurpose: '02. Striker // Entry Gaming & Esports',
    consultationMode: 'Direct Call',
    status: 'Pending',
    notes: 'Plays CS2 and Valorant. Wants 240Hz competitive lock on 1080p monitor. Inquiring about store visit tomorrow.',
    date: '2026-10-24 18:30',
    amount: 72999
  },
  {
    id: 'quote-102',
    type: 'order',
    customerName: 'Praveen Chander',
    phone: '+91 97890 54321',
    email: 'praveen.studio@outlook.com',
    targetBudget: '₹1,54,999 (04. Forge)',
    machinePurpose: '04. Forge (Content Creation & 3D)',
    consultationMode: 'WhatsApp Order',
    status: 'Quote Sent',
    notes: 'Ordered 04. Forge for Blender 3D rendering and 4K DaVinci Resolve editing. Inquired about adding an extra 32GB RAM stick.',
    date: '2026-10-24 16:15',
    amount: 154999
  },
  {
    id: 'quote-103',
    type: 'diagnostic',
    customerName: 'Vigneshwaran R',
    phone: '+91 98840 99881',
    email: 'vignesh.dev@gmail.com',
    targetBudget: 'Repair Service',
    machinePurpose: 'ASUS ROG Strix G15 (2022)',
    consultationMode: 'Walk-in Store Visit',
    status: 'In Progress',
    notes: 'Overheating & thermal throttling during Cyberpunk 2077. CPU reaching 97°C with fan noise. Requested Liquid Metal Kryonaut repasting.',
    date: '2026-10-24 14:00',
    amount: 1800
  },
  {
    id: 'quote-104',
    type: 'consultation',
    customerName: 'Dr. Aravind Swamy',
    phone: '+91 94440 12890',
    email: 'aravind.ai.lab@iitm.ac.in',
    targetBudget: '₹2,09,999+ (05. Oracle / AI)',
    machinePurpose: '05. Oracle // Local AI & LLM',
    consultationMode: 'WhatsApp Video',
    status: 'Confirmed',
    notes: 'Deep learning lab at IIT Madras. Running Llama 3 70B quantized models locally. Needs 64GB DDR5 memory and RTX 4080 Super 16GB.',
    date: '2026-10-23 19:45',
    amount: 209999
  }
];

// Seed realistic hardware upgrade parts
const INITIAL_PARTS = [
  {
    id: 'part-1',
    name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz CL30',
    category: 'Memory (RAM)',
    brand: 'Corsair',
    price: 11499,
    wattage: 15,
    inStock: true,
    compatibility: 'DDR5 Motherboards (AM5 / LGA1700)'
  },
  {
    id: 'part-2',
    name: 'Samsung 990 PRO 2TB PCIe 4.0 NVMe M.2 SSD (7450 MB/s)',
    category: 'Storage (SSD)',
    brand: 'Samsung',
    price: 16899,
    wattage: 9,
    inStock: true,
    compatibility: 'PCIe 4.0 / 5.0 M.2 Slots'
  },
  {
    id: 'part-3',
    name: 'DeepCool LS720 SE 360mm High-Performance AIO Liquid Cooler',
    category: 'Cooling',
    brand: 'DeepCool',
    price: 8499,
    wattage: 25,
    inStock: true,
    compatibility: 'AM4, AM5, LGA1700'
  },
  {
    id: 'part-4',
    name: 'ZOTAC Gaming GeForce RTX 4070 Super Twin Edge 12GB GDDR6X',
    category: 'Graphics Card (GPU)',
    brand: 'ZOTAC',
    price: 58990,
    wattage: 220,
    inStock: true,
    compatibility: 'PCIe 4.0 x16 / 650W+ PSU'
  },
  {
    id: 'part-5',
    name: 'Lian Li O11 Dynamic EVO RGB Dual-Chamber Glass Chassis',
    category: 'Chassis / Cabinet',
    brand: 'Lian Li',
    price: 14200,
    wattage: 0,
    inStock: true,
    compatibility: 'ATX / E-ATX Motherboards'
  },
  {
    id: 'part-6',
    name: 'Corsair RM850e 850W 80+ Gold Fully Modular ATX 3.0 PSU',
    category: 'Power Supply (PSU)',
    brand: 'Corsair',
    price: 10499,
    wattage: 850,
    inStock: true,
    compatibility: 'PCIe 5.0 12VHPWR Ready'
  }
];

// Seed active promotional offers
const INITIAL_OFFERS = [
  {
    id: 'offer-1',
    title: 'FESTIVE CHENNAI PROMO',
    tagline: '₹2,000 Instant Steam Gift Card with 02. Striker & 03. Monster rigs',
    code: 'STEAMFEST',
    discountAmount: '₹2,000 STEAM CREDIT',
    applicableOn: '02. Striker & 03. Monster',
    validUntil: '2026-11-15',
    active: true,
    badgeText: 'HOT DEAL'
  },
  {
    id: 'offer-2',
    title: 'CREATOR NVME SPEED UPGRADE',
    tagline: 'Free upgrade from 1TB to 2TB Gen4 7000MB/s NVMe on 04. Forge',
    code: 'SPEEDFORGE',
    discountAmount: 'FREE 2TB SSD UPGRADE',
    applicableOn: '04. Forge Rig',
    validUntil: '2026-11-30',
    active: true,
    badgeText: 'CREATOR SPECIAL'
  },
  {
    id: 'offer-3',
    title: 'FREE PAN-INDIA WOODEN CRATING',
    tagline: 'Zero packaging and transit insurance fee on all 5 machines',
    code: 'SAFESHIP',
    discountAmount: '100% FREE WOODEN CRATING',
    applicableOn: 'All 5 Machines',
    validUntil: '2026-12-31',
    active: true,
    badgeText: 'ASSURANCE'
  }
];

export const adminStorage = {
  // QUOTES & LEADS
  getQuotes: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUOTES);
      return data ? JSON.parse(data) : INITIAL_QUOTES;
    } catch {
      return INITIAL_QUOTES;
    }
  },

  addQuote: (quoteData) => {
    try {
      const current = adminStorage.getQuotes();
      const newQuote = {
        id: `quote-${Date.now()}`,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'Pending',
        ...quoteData
      };
      const updated = [newQuote, ...current];
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(updated));
      return newQuote;
    } catch (e) {
      console.error('Failed to save quote', e);
      return null;
    }
  },

  updateQuoteStatus: (id, newStatus) => {
    try {
      const current = adminStorage.getQuotes();
      const updated = current.map(q => q.id === id ? { ...q, status: newStatus } : q);
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  deleteQuote: (id) => {
    try {
      const current = adminStorage.getQuotes();
      const updated = current.filter(q => q.id !== id);
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  // PACKS & MACHINES
  getPacks: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PACKS);
      return data ? JSON.parse(data) : PREBUILT_PCS;
    } catch {
      return PREBUILT_PCS;
    }
  },

  savePacks: (packs) => {
    try {
      localStorage.setItem(STORAGE_KEYS.PACKS, JSON.stringify(packs));
    } catch (e) {
      console.error('Failed to save packs', e);
    }
  },

  updatePackPrice: (id, newPrice) => {
    try {
      const packs = adminStorage.getPacks();
      const numericPrice = Number(newPrice);
      const updated = packs.map(p => {
        if (p.id === id) {
          return {
            ...p,
            price: numericPrice,
            displayPrice: `Rs. ${numericPrice.toLocaleString('en-IN')}`
          };
        }
        return p;
      });
      adminStorage.savePacks(updated);
      return updated;
    } catch {
      return adminStorage.getPacks();
    }
  },

  addPack: (newPack) => {
    try {
      const packs = adminStorage.getPacks();
      const id = newPack.id || `pb-${Date.now()}`;
      const numericPrice = Number(newPack.price) || 49999;
      const formattedPack = {
        ...newPack,
        id,
        price: numericPrice,
        displayPrice: `Rs. ${numericPrice.toLocaleString('en-IN')}`,
        popular: !!newPack.popular,
        fps: newPack.fps || {
          "Standard Benchmarks": "High FPS",
          "Thermal Stability": "<65°C under load",
          "Cold Boot": "5 Seconds"
        },
        tableSpecs: newPack.tableSpecs || [
          { label: "PROCESSOR", value: newPack.specs?.cpu?.split('(')[0] || "High-Perf CPU" },
          { label: "GRAPHICS", value: newPack.specs?.gpu?.split('(')[0] || "Discrete GPU" },
          { label: "MEMORY", value: newPack.specs?.ram || "16GB RAM" },
          { label: "STORAGE", value: newPack.specs?.storage || "1TB SSD" }
        ],
        warranty: newPack.warranty || "3 Years Games World Hardware Warranty"
      };
      const updated = [...packs, formattedPack];
      adminStorage.savePacks(updated);
      return updated;
    } catch {
      return adminStorage.getPacks();
    }
  },

  deletePack: (id) => {
    try {
      const packs = adminStorage.getPacks();
      const updated = packs.filter(p => p.id !== id);
      adminStorage.savePacks(updated);
      return updated;
    } catch {
      return adminStorage.getPacks();
    }
  },

  // HARDWARE PARTS
  getParts: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PARTS);
      return data ? JSON.parse(data) : INITIAL_PARTS;
    } catch {
      return INITIAL_PARTS;
    }
  },

  saveParts: (parts) => {
    try {
      localStorage.setItem(STORAGE_KEYS.PARTS, JSON.stringify(parts));
    } catch (e) {
      console.error('Failed to save parts', e);
    }
  },

  addPart: (part) => {
    try {
      const parts = adminStorage.getParts();
      const newPart = {
        id: `part-${Date.now()}`,
        inStock: true,
        ...part,
        price: Number(part.price) || 0
      };
      const updated = [newPart, ...parts];
      adminStorage.saveParts(updated);
      return updated;
    } catch {
      return adminStorage.getParts();
    }
  },

  deletePart: (id) => {
    try {
      const parts = adminStorage.getParts();
      const updated = parts.filter(p => p.id !== id);
      adminStorage.saveParts(updated);
      return updated;
    } catch {
      return adminStorage.getParts();
    }
  },

  updatePartPrice: (id, newPrice) => {
    try {
      const parts = adminStorage.getParts();
      const updated = parts.map(p => p.id === id ? { ...p, price: Number(newPrice) } : p);
      adminStorage.saveParts(updated);
      return updated;
    } catch {
      return adminStorage.getParts();
    }
  },

  // OFFERS & PROMOTIONS
  getOffers: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.OFFERS);
      return data ? JSON.parse(data) : INITIAL_OFFERS;
    } catch {
      return INITIAL_OFFERS;
    }
  },

  saveOffers: (offers) => {
    try {
      localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(offers));
    } catch (e) {
      console.error('Failed to save offers', e);
    }
  },

  addOffer: (offer) => {
    try {
      const offers = adminStorage.getOffers();
      const newOffer = {
        id: `offer-${Date.now()}`,
        active: true,
        ...offer
      };
      const updated = [newOffer, ...offers];
      adminStorage.saveOffers(updated);
      return updated;
    } catch {
      return adminStorage.getOffers();
    }
  },

  toggleOfferActive: (id) => {
    try {
      const offers = adminStorage.getOffers();
      const updated = offers.map(o => o.id === id ? { ...o, active: !o.active } : o);
      adminStorage.saveOffers(updated);
      return updated;
    } catch {
      return adminStorage.getOffers();
    }
  },

  deleteOffer: (id) => {
    try {
      const offers = adminStorage.getOffers();
      const updated = offers.filter(o => o.id !== id);
      adminStorage.saveOffers(updated);
      return updated;
    } catch {
      return adminStorage.getOffers();
    }
  }
};
