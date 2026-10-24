import { PREBUILT_PCS } from '../data/mockData';

const STORAGE_KEYS = {
  QUOTES: 'gw_admin_quotes',
  PACKS: 'gw_admin_packs',
  PARTS: 'gw_admin_parts',
  OFFERS: 'gw_admin_offers'
};

// IDs of initial demonstration mock items to cleanse from existing browser caches
const FAKE_QUOTE_IDS = new Set(['quote-101', 'quote-102', 'quote-103', 'quote-104']);
const FAKE_PART_IDS = new Set(['part-1', 'part-2', 'part-3', 'part-4', 'part-5', 'part-6']);
const FAKE_OFFER_IDS = new Set(['offer-1', 'offer-2', 'offer-3']);

export const adminStorage = {
  // QUOTES & LEADS
  getQuotes: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUOTES);
      if (!data) return [];
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];
      const clean = parsed.filter(q => q && !FAKE_QUOTE_IDS.has(q.id));
      if (clean.length !== parsed.length) {
        localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(clean));
      }
      return clean;
    } catch {
      return [];
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
      if (!data) return [];
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];
      const clean = parsed.filter(p => p && !FAKE_PART_IDS.has(p.id));
      if (clean.length !== parsed.length) {
        localStorage.setItem(STORAGE_KEYS.PARTS, JSON.stringify(clean));
      }
      return clean;
    } catch {
      return [];
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
      if (!data) return [];
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];
      const clean = parsed.filter(o => o && !FAKE_OFFER_IDS.has(o.id));
      if (clean.length !== parsed.length) {
        localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(clean));
      }
      return clean;
    } catch {
      return [];
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
