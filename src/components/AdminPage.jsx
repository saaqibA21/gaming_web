import React, { useState, useEffect } from 'react';
import { adminStorage } from '../utils/adminStorage';
import { 
  ShoppingBag, 
  Sparkles, 
  Tag, 
  Cpu, 
  Layers, 
  Clock, 
  CheckCircle2, 
  Trash2, 
  Plus, 
  Search, 
  Phone, 
  MessageSquare, 
  ArrowLeft, 
  FileText, 
  TrendingUp, 
  DollarSign, 
  ShieldCheck, 
  Download, 
  Edit3, 
  Save, 
  X,
  ExternalLink,
  Percent,
  Flame,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdminPage({ onBackToStore }) {
  const [activeTab, setActiveTab] = useState('quotes'); // 'quotes' | 'packs' | 'parts' | 'offers'

  // Data States
  const [quotes, setQuotes] = useState([]);
  const [packs, setPacks] = useState([]);
  const [parts, setParts] = useState([]);
  const [offers, setOffers] = useState([]);

  // Filter & Search States
  const [quotesSearch, setQuotesSearch] = useState('');
  const [quoteTypeFilter, setQuoteTypeFilter] = useState('all');
  const [quoteStatusFilter, setQuoteStatusFilter] = useState('all');
  
  // Pack Modal / Edit state
  const [isPackModalOpen, setIsPackModalOpen] = useState(false);
  const [editingPackId, setEditingPackId] = useState(null);
  const [packFormData, setPackFormData] = useState({
    number: '06',
    name: '',
    subtitle: '',
    category: 'gaming',
    badge: 'NEW ARRIVAL',
    price: '',
    quote: '',
    purpose: '',
    cpu: '',
    gpu: '',
    ram: '',
    storage: '',
    motherboard: '',
    psu: '',
    cooler: '',
    cabinet: '',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80'
  });

  // Part Modal / Form State
  const [isPartModalOpen, setIsPartModalOpen] = useState(false);
  const [partFormData, setPartFormData] = useState({
    name: '',
    category: 'Memory (RAM)',
    brand: '',
    price: '',
    wattage: 15,
    compatibility: ''
  });

  // Offer Modal / Form State
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [offerFormData, setOfferFormData] = useState({
    title: '',
    tagline: '',
    code: '',
    discountAmount: '',
    applicableOn: 'All 5 Machines',
    validUntil: '2026-12-31',
    badgeText: 'LIMITED OFFER'
  });

  // Inline Price Editing state for packs
  const [inlinePricePack, setInlinePricePack] = useState({});

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    setQuotes(adminStorage.getQuotes());
    setPacks(adminStorage.getPacks());
    setParts(adminStorage.getParts());
    setOffers(adminStorage.getOffers());
  };

  // Status Colors
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'In Progress':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      case 'Quote Sent':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'Confirmed':
      case 'Completed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-white/10 text-white/70 border-white/20';
    }
  };

  // Quote Handlers
  const handleStatusChange = (id, newStatus) => {
    const updated = adminStorage.updateQuoteStatus(id, newStatus);
    setQuotes(updated);
  };

  const handleDeleteQuote = (id) => {
    if (window.confirm('Are you sure you want to delete this quote request?')) {
      const updated = adminStorage.deleteQuote(id);
      setQuotes(updated);
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Type', 'Customer Name', 'Phone', 'Budget / Amount', 'Machine Purpose', 'Status', 'Notes'];
    const rows = quotes.map(q => [
      q.id,
      q.date,
      q.type,
      `"${q.customerName}"`,
      `"${q.phone}"`,
      `"₹${(q.amount || 0).toLocaleString('en-IN')}"`,
      `"${q.machinePurpose || ''}"`,
      q.status,
      `"${(q.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `games_world_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pack Handlers
  const handleSavePack = (e) => {
    e.preventDefault();
    const newPack = {
      number: packFormData.number,
      name: packFormData.name.toUpperCase(),
      subtitle: packFormData.subtitle.toUpperCase(),
      category: packFormData.category,
      badge: packFormData.badge,
      purpose: packFormData.purpose,
      quote: packFormData.quote || "Built local. Priced fair. Sold with conviction.",
      price: Number(packFormData.price),
      specs: {
        cpu: packFormData.cpu,
        gpu: packFormData.gpu,
        ram: packFormData.ram,
        storage: packFormData.storage,
        motherboard: packFormData.motherboard,
        psu: packFormData.psu,
        cooler: packFormData.cooler,
        cabinet: packFormData.cabinet
      },
      image: packFormData.image || "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80"
    };

    const updated = adminStorage.addPack(newPack);
    setPacks(updated);
    setIsPackModalOpen(false);
    confetti({ particleCount: 50, spread: 60 });
    setPackFormData({
      number: '06',
      name: '',
      subtitle: '',
      category: 'gaming',
      badge: 'NEW ARRIVAL',
      price: '',
      quote: '',
      purpose: '',
      cpu: '',
      gpu: '',
      ram: '',
      storage: '',
      motherboard: '',
      psu: '',
      cooler: '',
      cabinet: '',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80'
    });
  };

  const handleUpdatePrice = (id) => {
    const newPrice = inlinePricePack[id];
    if (newPrice && !isNaN(newPrice)) {
      const updated = adminStorage.updatePackPrice(id, newPrice);
      setPacks(updated);
      setInlinePricePack(prev => ({ ...prev, [id]: undefined }));
      confetti({ particleCount: 30, spread: 50 });
    }
  };

  const handleDeletePack = (id) => {
    if (window.confirm('Delete this machine pack? Storefront will no longer display it.')) {
      const updated = adminStorage.deletePack(id);
      setPacks(updated);
    }
  };

  // Part Handlers
  const handleSavePart = (e) => {
    e.preventDefault();
    const updated = adminStorage.addPart(partFormData);
    setParts(updated);
    setIsPartModalOpen(false);
    confetti({ particleCount: 40, spread: 50 });
    setPartFormData({
      name: '',
      category: 'Memory (RAM)',
      brand: '',
      price: '',
      wattage: 15,
      compatibility: ''
    });
  };

  const handleDeletePart = (id) => {
    if (window.confirm('Remove this hardware part?')) {
      const updated = adminStorage.deletePart(id);
      setParts(updated);
    }
  };

  // Offer Handlers
  const handleSaveOffer = (e) => {
    e.preventDefault();
    const updated = adminStorage.addOffer(offerFormData);
    setOffers(updated);
    setIsOfferModalOpen(false);
    confetti({ particleCount: 50, spread: 60 });
    setOfferFormData({
      title: '',
      tagline: '',
      code: '',
      discountAmount: '',
      applicableOn: 'All 5 Machines',
      validUntil: '2026-12-31',
      badgeText: 'LIMITED OFFER'
    });
  };

  const handleToggleOffer = (id) => {
    const updated = adminStorage.toggleOfferActive(id);
    setOffers(updated);
  };

  const handleDeleteOffer = (id) => {
    if (window.confirm('Delete this promotional offer?')) {
      const updated = adminStorage.deleteOffer(id);
      setOffers(updated);
    }
  };

  // Filtered Quotes
  const filteredQuotes = quotes.filter(q => {
    const matchSearch = 
      (q.customerName || '').toLowerCase().includes(quotesSearch.toLowerCase()) ||
      (q.phone || '').toLowerCase().includes(quotesSearch.toLowerCase()) ||
      (q.machinePurpose || '').toLowerCase().includes(quotesSearch.toLowerCase());
    
    const matchType = quoteTypeFilter === 'all' || q.type === quoteTypeFilter;
    const matchStatus = quoteStatusFilter === 'all' || q.status === quoteStatusFilter;

    return matchSearch && matchType && matchStatus;
  });

  // Calculate Pipeline Metric
  const totalPipelineAmount = quotes.reduce((acc, q) => acc + (q.amount || 0), 0);
  const pendingQuotesCount = quotes.filter(q => q.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-mode-black text-soft-mist font-sans pb-24 selection:bg-primary selection:text-white">
      
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToStore}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl animate-glass border border-white/10 hover:border-primary/50 text-xs font-tech font-bold uppercase tracking-wider text-soft-mist hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Storefront</span>
            </button>

            <div className="h-5 w-px bg-white/10 hidden sm:block"></div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
              <div className="font-display tracking-wider text-xl leading-none">
                <span>GAMES WORLD</span> <span className="text-primary">ADMIN CONSOLE</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-tech font-bold uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>LIVE STORE BENCH SYNC</span>
            </div>

            <button
              onClick={onBackToStore}
              className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-hover text-white text-xs font-tech font-bold uppercase tracking-wider shadow-nuke-glow flex items-center gap-1.5"
            >
              <span>View Live Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="p-5 rounded-2xl animate-glass border border-white/[0.08] relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-tech font-bold uppercase tracking-wider text-white/50">Quote Inquiries</span>
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-3xl font-display tracking-wider text-soft-mist">
              {quotes.length} <span className="text-sm font-tech text-amber-400">({pendingQuotesCount} Pending)</span>
            </div>
            <div className="text-[11px] text-white/40 mt-1 font-sans">Active customer requests & orders</div>
          </div>

          <div className="p-5 rounded-2xl animate-glass border border-white/[0.08] relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-tech font-bold uppercase tracking-wider text-white/50">Pipeline Value</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-3xl font-display tracking-wider text-emerald-400">
              ₹{(totalPipelineAmount / 100000).toFixed(2)} Lakhs
            </div>
            <div className="text-[11px] text-white/40 mt-1 font-sans">Total estimated leads value</div>
          </div>

          <div className="p-5 rounded-2xl animate-glass border border-white/[0.08] relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-tech font-bold uppercase tracking-wider text-white/50">Active Machine Packs</span>
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-3xl font-display tracking-wider text-soft-mist">
              {packs.length} Machines
            </div>
            <div className="text-[11px] text-white/40 mt-1 font-sans">Verified purpose-built rigs</div>
          </div>

          <div className="p-5 rounded-2xl animate-glass border border-white/[0.08] relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-tech font-bold uppercase tracking-wider text-white/50">Special Deals</span>
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                <Tag className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-3xl font-display tracking-wider text-primary">
              {offers.filter(o => o.active).length} Active Promos
            </div>
            <div className="text-[11px] text-white/40 mt-1 font-sans">Running coupons & bundles</div>
          </div>

        </div>

        {/* Admin Section Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.08] pb-4 mb-6">
          
          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-4 py-2.5 rounded-xl font-tech text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 border ${
              activeTab === 'quotes'
                ? 'bg-primary text-white border-primary shadow-nuke-glow font-extrabold'
                : 'animate-glass text-white/60 hover:text-white border-white/[0.08]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Quotes & Customer Inquiries</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black text-primary font-bold">
              {quotes.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('packs')}
            className={`px-4 py-2.5 rounded-xl font-tech text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 border ${
              activeTab === 'packs'
                ? 'bg-primary text-white border-primary shadow-nuke-glow font-extrabold'
                : 'animate-glass text-white/60 hover:text-white border-white/[0.08]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Machine Packs & Pricing</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black text-primary font-bold">
              {packs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('parts')}
            className={`px-4 py-2.5 rounded-xl font-tech text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 border ${
              activeTab === 'parts'
                ? 'bg-primary text-white border-primary shadow-nuke-glow font-extrabold'
                : 'animate-glass text-white/60 hover:text-white border-white/[0.08]'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Hardware Parts & Upgrades</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black text-primary font-bold">
              {parts.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            className={`px-4 py-2.5 rounded-xl font-tech text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 border ${
              activeTab === 'offers'
                ? 'bg-primary text-white border-primary shadow-nuke-glow font-extrabold'
                : 'animate-glass text-white/60 hover:text-white border-white/[0.08]'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Special Offers & Deals</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black text-primary font-bold">
              {offers.length}
            </span>
          </button>

        </div>

        {/* ========================================================================= */}
        {/* TAB 1: QUOTES & CUSTOMER INQUIRIES */}
        {/* ========================================================================= */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            
            {/* Control Bar: Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by customer name, phone, or machine..."
                  value={quotesSearch}
                  onChange={(e) => setQuotesSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist placeholder-white/30 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 font-sans"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-tech">
                
                {/* Type Filter */}
                <select
                  value={quoteTypeFilter}
                  onChange={(e) => setQuoteTypeFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#141414] border border-white/10 text-soft-mist text-xs focus:outline-none focus:border-primary"
                >
                  <option value="all">All Inquiry Types</option>
                  <option value="consultation">Consultations</option>
                  <option value="order">Cart Orders</option>
                  <option value="diagnostic">Laptop Diagnostics</option>
                </select>

                {/* Status Filter */}
                <select
                  value={quoteStatusFilter}
                  onChange={(e) => setQuoteStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#141414] border border-white/10 text-soft-mist text-xs focus:outline-none focus:border-primary"
                >
                  <option value="all">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Quote Sent">Quote Sent</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                </select>

                {/* Export Button */}
                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-2 rounded-xl animate-glass border border-white/10 hover:border-primary/40 text-soft-mist text-xs font-tech font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-primary" />
                  <span>Export CSV</span>
                </button>

              </div>

            </div>

            {/* Quotes Table / List */}
            {filteredQuotes.length === 0 ? (
              <div className="p-16 rounded-2xl animate-glass border border-white/[0.08] text-center space-y-3">
                <FileText className="w-12 h-12 text-white/20 mx-auto" />
                <h3 className="text-lg font-tech font-bold text-soft-mist uppercase">No Inquiries Found</h3>
                <p className="text-xs text-white/50">Try adjusting your search query or status filter.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQuotes.map((q) => {
                  const cleanPhone = (q.phone || '').replace(/[^0-9]/g, '');
                  const whatsappMsg = encodeURIComponent(
                    `Hello ${q.customerName}, this is Games World Chennai regarding your ${q.machinePurpose || 'PC build inquiry'}. How can we assist you with your setup?`
                  );

                  return (
                    <div 
                      key={q.id}
                      className="p-5 sm:p-6 rounded-2xl animate-glass border border-white/[0.08] hover:border-primary/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                    >
                      {/* Left: Customer & Inquiry Details */}
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-tech font-bold uppercase border ${getStatusBadge(q.status)}`}>
                            {q.status}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-tech font-bold uppercase bg-white/[0.04] text-white/60 border border-white/[0.08]">
                            {q.type.toUpperCase()}
                          </span>
                          <span className="text-[11px] font-tech text-white/40">
                            {q.date}
                          </span>
                        </div>

                        <div className="flex items-baseline gap-3">
                          <h4 className="text-xl font-display tracking-wider text-soft-mist">
                            {q.customerName}
                          </h4>
                          <span className="text-xs font-tech font-bold text-primary">
                            ₹{(q.amount || 0).toLocaleString('en-IN')}
                          </span>
                        </div>

                        <div className="text-xs text-white/80 font-sans">
                          <span className="text-white/50 font-tech uppercase">Target:</span> <span className="font-semibold text-soft-mist">{q.machinePurpose || q.targetBudget}</span>
                        </div>

                        {q.notes && (
                          <p className="text-xs text-white/60 font-sans italic bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.04] max-w-2xl">
                            "{q.notes}"
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-white/50 pt-1">
                          <div className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-primary" />
                            <span>{q.phone}</span>
                          </div>
                          {q.consultationMode && (
                            <div className="flex items-center gap-1">
                              <span className="text-white/40">Mode:</span>
                              <span className="text-white/80 font-medium">{q.consultationMode}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/[0.08] shrink-0">
                        
                        {/* Status Dropdown */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-tech uppercase text-white/40">Status:</span>
                          <select
                            value={q.status}
                            onChange={(e) => handleStatusChange(q.id, e.target.value)}
                            className="px-2.5 py-1.5 rounded-xl bg-[#141414] border border-white/10 text-xs font-tech text-soft-mist focus:outline-none focus:border-primary"
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Quote Sent">Quote Sent</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>

                        {/* Direct Communication Buttons */}
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/${cleanPhone}?text=${whatsappMsg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-tech font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          <a
                            href={`tel:${q.phone}`}
                            className="px-3 py-1.5 rounded-xl animate-glass border border-white/10 hover:border-primary/40 text-soft-mist text-xs font-tech font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                            title="Direct Call"
                          >
                            <Phone className="w-3.5 h-3.5 text-primary" />
                            <span>Call</span>
                          </a>

                          <button
                            onClick={() => handleDeleteQuote(q.id)}
                            className="p-1.5 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Delete Request"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: MACHINES & PACKS MANAGER */}
        {/* ========================================================================= */}
        {activeTab === 'packs' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-display tracking-wider text-soft-mist">
                  PURPOSE-BUILT MACHINE PACKS
                </h3>
                <p className="text-xs text-white/50 font-sans">
                  Manage pricing, specifications, and add new custom packs that immediately reflect on the live storefront.
                </p>
              </div>

              <button
                onClick={() => setIsPackModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-primary hover:bg-hover text-white text-xs font-tech font-extrabold uppercase tracking-wider shadow-nuke-glow flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Machine Pack</span>
              </button>
            </div>

            {/* Grid of Machines */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packs.map((pack) => (
                <div 
                  key={pack.id}
                  className="rounded-2xl animate-glass border border-white/[0.08] hover:border-primary/40 transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Image Header with Badge */}
                    <div className="relative h-44 bg-black overflow-hidden">
                      <img 
                        src={pack.image} 
                        alt={pack.name} 
                        className="w-full h-full object-cover opacity-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                      
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded bg-primary text-white text-[10px] font-tech font-bold uppercase">
                          {pack.badge || `MACHINE ${pack.number}`}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 text-4xl font-display font-bold text-white/20 select-none">
                        {pack.number}
                      </div>

                      <div className="absolute bottom-3 left-3">
                        <div className="text-xs font-tech text-white/60 uppercase">Current Retail Price:</div>
                        <div className="text-2xl font-display tracking-wider text-primary">
                          ₹{pack.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <div>
                        <div className="text-[10px] font-tech font-bold text-primary uppercase">
                          {pack.subtitle}
                        </div>
                        <h4 className="text-2xl font-display tracking-wider text-soft-mist">
                          {pack.name}
                        </h4>
                        <p className="text-xs text-white/60 font-sans mt-1 line-clamp-2">
                          "{pack.quote}"
                        </p>
                      </div>

                      {/* Specs Summary */}
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5 text-xs font-sans">
                        <div><span className="text-white/40 font-tech">CPU:</span> {pack.specs?.cpu}</div>
                        <div><span className="text-white/40 font-tech">GPU:</span> {pack.specs?.gpu}</div>
                        <div><span className="text-white/40 font-tech">RAM:</span> {pack.specs?.ram}</div>
                        <div><span className="text-white/40 font-tech">Storage:</span> {pack.specs?.storage}</div>
                      </div>
                    </div>
                  </div>

                  {/* Inline Price Update & Actions */}
                  <div className="p-5 pt-0 space-y-3 border-t border-white/[0.06]">
                    <div className="pt-3">
                      <label className="block text-[10px] font-tech uppercase text-white/50 mb-1">
                        Update Machine Price (₹):
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder={pack.price.toString()}
                          value={inlinePricePack[pack.id] ?? ''}
                          onChange={(e) => setInlinePricePack({ ...inlinePricePack, [pack.id]: e.target.value })}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-soft-mist text-xs focus:outline-none focus:border-primary font-mono"
                        />
                        <button
                          onClick={() => handleUpdatePrice(pack.id)}
                          className="px-3 py-1.5 rounded-lg bg-primary hover:bg-hover text-white text-xs font-tech font-bold uppercase transition-colors"
                        >
                          Save
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-white/40 font-tech">
                        Category: {pack.category.toUpperCase()}
                      </span>
                      <button
                        onClick={() => handleDeletePack(pack.id)}
                        className="text-xs text-red-400 hover:text-red-300 font-tech uppercase flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: HARDWARE PARTS & UPGRADES */}
        {/* ========================================================================= */}
        {activeTab === 'parts' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-display tracking-wider text-soft-mist">
                  HARDWARE UPGRADE PARTS & PACKS
                </h3>
                <p className="text-xs text-white/50 font-sans">
                  Manage individual hardware components, upgrade kits, and pricing.
                </p>
              </div>

              <button
                onClick={() => setIsPartModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-primary hover:bg-hover text-white text-xs font-tech font-extrabold uppercase tracking-wider shadow-nuke-glow flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Upgrade Part</span>
              </button>
            </div>

            {/* Parts Table */}
            <div className="rounded-2xl animate-glass border border-white/[0.08] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-white/[0.02] border-b border-white/[0.08] text-white/40 font-tech uppercase text-[11px]">
                    <tr>
                      <th className="p-4">Component Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Brand</th>
                      <th className="p-4">Wattage</th>
                      <th className="p-4">Price (₹)</th>
                      <th className="p-4">Compatibility</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {parts.map((part) => (
                      <tr key={part.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 font-semibold text-soft-mist">
                          {part.name}
                        </td>
                        <td className="p-4 font-tech text-primary">
                          {part.category}
                        </td>
                        <td className="p-4 font-tech text-white/70">
                          {part.brand || 'Retail'}
                        </td>
                        <td className="p-4 font-tech text-white/50">
                          {part.wattage ? `${part.wattage}W` : '—'}
                        </td>
                        <td className="p-4 font-tech font-bold text-soft-mist">
                          ₹{part.price.toLocaleString('en-IN')}
                        </td>
                        <td className="p-4 text-white/50 text-[11px]">
                          {part.compatibility || 'Universal'}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeletePart(part.id)}
                            className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Delete Part"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: SPECIAL OFFERS & DEALS */}
        {/* ========================================================================= */}
        {activeTab === 'offers' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-display tracking-wider text-soft-mist">
                  SPECIAL OFFERS & PROMOTIONAL BANNERS
                </h3>
                <p className="text-xs text-white/50 font-sans">
                  Launch festive coupons, hardware upgrade credits, and announcement banners.
                </p>
              </div>

              <button
                onClick={() => setIsOfferModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-primary hover:bg-hover text-white text-xs font-tech font-extrabold uppercase tracking-wider shadow-nuke-glow flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Offer</span>
              </button>
            </div>

            {/* Offers Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <div 
                  key={offer.id}
                  className={`p-6 rounded-2xl animate-glass border transition-all flex flex-col justify-between ${
                    offer.active 
                      ? 'border-primary/50 shadow-nuke-glow' 
                      : 'border-white/[0.08] opacity-60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-tech font-bold uppercase bg-primary/10 text-primary border border-primary/30">
                        {offer.badgeText || 'PROMO DEAL'}
                      </span>
                      
                      <div className="flex items-center gap-1.5 text-[11px] font-tech">
                        <span className={offer.active ? 'text-emerald-400 font-bold' : 'text-white/40'}>
                          {offer.active ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                        <input
                          type="checkbox"
                          checked={offer.active}
                          onChange={() => handleToggleOffer(offer.id)}
                          className="accent-[#FF5123] cursor-pointer"
                        />
                      </div>
                    </div>

                    <h4 className="text-2xl font-display tracking-wider text-soft-mist">
                      {offer.title}
                    </h4>

                    <div className="text-lg font-tech font-bold text-primary mt-1">
                      {offer.discountAmount}
                    </div>

                    <p className="text-xs text-white/70 font-sans mt-2 leading-relaxed">
                      {offer.tagline}
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-1.5 text-xs font-sans">
                      <div>
                        <span className="text-white/40 font-tech">Coupon Code:</span>{' '}
                        <span className="font-mono font-bold text-soft-mist px-2 py-0.5 rounded bg-black/60 border border-white/10">
                          {offer.code}
                        </span>
                      </div>
                      <div>
                        <span className="text-white/40 font-tech">Applicable:</span>{' '}
                        <span className="text-white/80">{offer.applicableOn}</span>
                      </div>
                      <div>
                        <span className="text-white/40 font-tech">Valid Until:</span>{' '}
                        <span className="text-white/80">{offer.validUntil}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <button
                      onClick={() => handleToggleOffer(offer.id)}
                      className="text-xs font-tech text-white/60 hover:text-white transition-colors"
                    >
                      {offer.active ? 'Pause Campaign' : 'Enable Campaign'}
                    </button>
                    <button
                      onClick={() => handleDeleteOffer(offer.id)}
                      className="text-xs text-red-400 hover:text-red-300 font-tech uppercase flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* MODAL: ADD NEW MACHINE PACK */}
      {/* ========================================================================= */}
      {isPackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0e0e0e] border border-white/10 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsPackModalOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-soft-mist transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-primary mb-1">
              <Layers className="w-4 h-4 text-primary" />
              <span className="text-xs font-tech font-bold tracking-widest-plus uppercase">Machine Pack Configurator</span>
            </div>

            <h3 className="text-2xl font-display tracking-wider text-soft-mist">
              ADD NEW PURPOSE-BUILT MACHINE
            </h3>
            <p className="text-xs text-white/50 font-sans mt-1 mb-6">
              This machine pack will be saved to your catalog and immediately displayed in the 5 Machines grid on the storefront.
            </p>

            <form onSubmit={handleSavePack} className="space-y-4 text-xs font-sans">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Machine Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 06"
                    value={packFormData.number}
                    onChange={(e) => setPackFormData({ ...packFormData, number: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist focus:outline-none focus:border-primary text-xs"
                  />
                </div>

                <div>
                  <label className="block text-white/70 font-semibold mb-1">Machine Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TITAN"
                    value={packFormData.name}
                    onChange={(e) => setPackFormData({ ...packFormData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist focus:outline-none focus:border-primary text-xs"
                  />
                </div>

                <div>
                  <label className="block text-white/70 font-semibold mb-1">Target Retail Price (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 189999"
                    value={packFormData.price}
                    onChange={(e) => setPackFormData({ ...packFormData, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist focus:outline-none focus:border-primary text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Subtitle / Category Focus</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 4K ULTRA RAY-TRACING GAMING"
                    value={packFormData.subtitle}
                    onChange={(e) => setPackFormData({ ...packFormData, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist focus:outline-none focus:border-primary text-xs"
                  />
                </div>

                <div>
                  <label className="block text-white/70 font-semibold mb-1">Category Filter</label>
                  <select
                    value={packFormData.category}
                    onChange={(e) => setPackFormData({ ...packFormData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-soft-mist focus:outline-none focus:border-primary text-xs"
                  >
                    <option value="gaming">Gaming & Esports</option>
                    <option value="hybrid">Hybrid Gaming + Editing</option>
                    <option value="creation">Content Creation & 3D</option>
                    <option value="ai">AI & Workstation</option>
                    <option value="office">Office & Corporate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/70 font-semibold mb-1">Purpose Quote / Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Zero compromises. Ultra settings on every title with locked thermals."
                  value={packFormData.quote}
                  onChange={(e) => setPackFormData({ ...packFormData, quote: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist focus:outline-none focus:border-primary text-xs"
                />
              </div>

              {/* Hardware Specs Inputs */}
              <div className="pt-2 border-t border-white/[0.08]">
                <div className="text-[10px] font-tech font-bold text-primary uppercase tracking-wider mb-2">
                  Hardware Specifications
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/70 font-semibold mb-1">Processor (CPU)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Intel Core i7 14700K / Ryzen 7 7800X3D"
                      value={packFormData.cpu}
                      onChange={(e) => setPackFormData({ ...packFormData, cpu: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 font-semibold mb-1">Graphics Card (GPU)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. NVIDIA GeForce RTX 4070 Ti Super 16GB"
                      value={packFormData.gpu}
                      onChange={(e) => setPackFormData({ ...packFormData, gpu: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 font-semibold mb-1">RAM</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 32GB DDR5 6000MHz RGB"
                      value={packFormData.ram}
                      onChange={(e) => setPackFormData({ ...packFormData, ram: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 font-semibold mb-1">Storage (SSD)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2TB Gen4 7000MB/s NVMe SSD"
                      value={packFormData.storage}
                      onChange={(e) => setPackFormData({ ...packFormData, storage: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 font-semibold mb-1">Motherboard</label>
                    <input
                      type="text"
                      placeholder="e.g. MSI Z790 Gaming Plus WiFi"
                      value={packFormData.motherboard}
                      onChange={(e) => setPackFormData({ ...packFormData, motherboard: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 font-semibold mb-1">Power Supply (PSU)</label>
                    <input
                      type="text"
                      placeholder="e.g. 850W 80+ Gold Modular ATX 3.0"
                      value={packFormData.psu}
                      onChange={(e) => setPackFormData({ ...packFormData, psu: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 font-semibold mb-1">CPU Cooler</label>
                    <input
                      type="text"
                      placeholder="e.g. 360mm ARGB AIO Liquid Cooler"
                      value={packFormData.cooler}
                      onChange={(e) => setPackFormData({ ...packFormData, cooler: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 font-semibold mb-1">Cabinet / Case</label>
                    <input
                      type="text"
                      placeholder="e.g. Panoramic Tempered Glass Dual Chamber"
                      value={packFormData.cabinet}
                      onChange={(e) => setPackFormData({ ...packFormData, cabinet: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-white/70 font-semibold mb-1">Chassis Image URL</label>
                <input
                  type="text"
                  value={packFormData.image}
                  onChange={(e) => setPackFormData({ ...packFormData, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist text-xs font-mono"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-primary hover:bg-hover text-white font-tech font-extrabold uppercase tracking-wider text-xs shadow-nuke-glow flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Machine Pack to Storefront</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD NEW UPGRADE PART */}
      {/* ========================================================================= */}
      {isPartModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0e0e0e] border border-white/10 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsPartModalOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-soft-mist transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-primary mb-1">
              <Cpu className="w-4 h-4 text-primary" />
              <span className="text-xs font-tech font-bold tracking-widest-plus uppercase">Hardware Inventory</span>
            </div>

            <h3 className="text-2xl font-display tracking-wider text-soft-mist">
              ADD NEW HARDWARE PART
            </h3>
            <p className="text-xs text-white/50 font-sans mt-1 mb-6">
              Add individual upgrade components and set retail prices.
            </p>

            <form onSubmit={handleSavePart} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-white/70 font-semibold mb-1">Part / Component Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Corsair Vengeance 32GB DDR5 6000MHz"
                  value={partFormData.name}
                  onChange={(e) => setPartFormData({ ...partFormData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Category</label>
                  <select
                    value={partFormData.category}
                    onChange={(e) => setPartFormData({ ...partFormData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-soft-mist text-xs"
                  >
                    <option>Memory (RAM)</option>
                    <option>Storage (SSD)</option>
                    <option>Cooling</option>
                    <option>Graphics Card (GPU)</option>
                    <option>Processor (CPU)</option>
                    <option>Chassis / Cabinet</option>
                    <option>Power Supply (PSU)</option>
                    <option>Motherboard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 font-semibold mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Corsair / Samsung"
                    value={partFormData.brand}
                    onChange={(e) => setPartFormData({ ...partFormData, brand: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Retail Price (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 11499"
                    value={partFormData.price}
                    onChange={(e) => setPartFormData({ ...partFormData, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist text-xs"
                  />
                </div>

                <div>
                  <label className="block text-white/70 font-semibold mb-1">Power Consumption (W)</label>
                  <input
                    type="number"
                    value={partFormData.wattage}
                    onChange={(e) => setPartFormData({ ...partFormData, wattage: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 font-semibold mb-1">Compatibility Notes</label>
                <input
                  type="text"
                  placeholder="e.g. DDR5 AM5 / LGA1700 Motherboards"
                  value={partFormData.compatibility}
                  onChange={(e) => setPartFormData({ ...partFormData, compatibility: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-primary hover:bg-hover text-white font-tech font-extrabold uppercase tracking-wider text-xs shadow-nuke-glow flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Save Component</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CREATE SPECIAL OFFER */}
      {/* ========================================================================= */}
      {isOfferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0e0e0e] border border-white/10 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsOfferModalOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-soft-mist transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-primary mb-1">
              <Tag className="w-4 h-4 text-primary" />
              <span className="text-xs font-tech font-bold tracking-widest-plus uppercase">Promotional Engine</span>
            </div>

            <h3 className="text-2xl font-display tracking-wider text-soft-mist">
              CREATE PROMOTIONAL OFFER
            </h3>
            <p className="text-xs text-white/50 font-sans mt-1 mb-6">
              Create a new coupon code or flash discount for your machines.
            </p>

            <form onSubmit={handleSaveOffer} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-white/70 font-semibold mb-1">Offer Campaign Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DIWALI STEAM GIFT VOUCHER"
                  value={offerFormData.title}
                  onChange={(e) => setOfferFormData({ ...offerFormData, title: e.target.value.toUpperCase() })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist text-xs"
                />
              </div>

              <div>
                <label className="block text-white/70 font-semibold mb-1">Offer Tagline / Details</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ₹2,000 Free Steam Wallet Code on all gaming machines"
                  value={offerFormData.tagline}
                  onChange={(e) => setOfferFormData({ ...offerFormData, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DIWALI2K"
                    value={offerFormData.code}
                    onChange={(e) => setOfferFormData({ ...offerFormData, code: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-white/70 font-semibold mb-1">Discount / Perk</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹2,000 STEAM CREDIT"
                    value={offerFormData.discountAmount}
                    onChange={(e) => setOfferFormData({ ...offerFormData, discountAmount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Applicable Machine</label>
                  <input
                    type="text"
                    placeholder="e.g. All 5 Machines / 02. Striker"
                    value={offerFormData.applicableOn}
                    onChange={(e) => setOfferFormData({ ...offerFormData, applicableOn: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist text-xs"
                  />
                </div>

                <div>
                  <label className="block text-white/70 font-semibold mb-1">Valid Until</label>
                  <input
                    type="date"
                    value={offerFormData.validUntil}
                    onChange={(e) => setOfferFormData({ ...offerFormData, validUntil: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-soft-mist text-xs"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-primary hover:bg-hover text-white font-tech font-extrabold uppercase tracking-wider text-xs shadow-nuke-glow flex items-center justify-center gap-2"
                >
                  <Tag className="w-4 h-4" />
                  <span>Publish Offer Campaign</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
