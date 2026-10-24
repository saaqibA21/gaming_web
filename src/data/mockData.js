export const COMPANY_INFO = {
  name: "GAMES WORLD",
  tagline: "PLAY • CONNECT • COMPETE",
  slogan: "GAMES WORLD – YOUR TECH, OUR PRIORITY",
  address: "No -1, Athipatten Street, 3rd Floor, Landmark - Bharat Petroleum Back Side, Chennai",
  hours: "Monday – Sunday: 10:30 AM – 9:30 PM",
  logo: "/images/games_world_emblem.png"
};

export const PILLARS = [
  {
    id: "pc-build",
    title: "CUSTOM PC BUILD",
    sub: "ZERO ASSEMBLY FEE • 100% GENUINE",
    icon: "Cpu",
    desc: "Built with sealed brand-new components. Every build includes cable grooming, BIOS flashing, memory EXPO/XMP tuning, and 24-hour FurMark stress testing.",
  },
  {
    id: "laptop-service",
    title: "CHIP-LEVEL LAPTOP SERVICE",
    sub: "SAME-DAY REPAIRS • 90-DAY WARRANTY",
    icon: "Laptop",
    desc: "Thermal Grizzly Kryonaut repasting, dead motherboard diagnosis, power rail troubleshooting, dedicated GPU reballing, and screen replacements.",
  },
  {
    id: "trusted-partner",
    title: "OFFICIAL WARRANTY & SUPPORT",
    sub: "LOCAL SUPPORT • PAN-INDIA CRATE SHIPPING",
    icon: "ShieldCheck",
    desc: "Direct brand warranties (up to 10 years on RAM & PSUs), 3-year Games World build protection, free consultation, and zero-bottleneck matching.",
  }
];

export const PC_PARTS = {
  processors: [
    { id: "cpu-1", name: "AMD Ryzen 5 7600X", brand: "AMD", socket: "AM5", cores: "6 Cores / 12 Threads (5.3GHz Boost)", price: 19800, wattage: 105, tier: "mid", image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&auto=format&fit=crop&q=80" },
    { id: "cpu-2", name: "AMD Ryzen 7 7800X3D", brand: "AMD", socket: "AM5", cores: "8 Cores / 16 Threads (96MB 3D V-Cache)", price: 38900, wattage: 120, tier: "high", popular: true, image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&auto=format&fit=crop&q=80" },
    { id: "cpu-3", name: "AMD Ryzen 7 9800X3D", brand: "AMD", socket: "AM5", cores: "8 Cores / 16 Threads (Next-Gen 3D V-Cache)", price: 47990, wattage: 120, tier: "ultra", image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&auto=format&fit=crop&q=80" },
    { id: "cpu-4", name: "AMD Ryzen 9 7950X", brand: "AMD", socket: "AM5", cores: "16 Cores / 32 Threads (5.7GHz Boost)", price: 52500, wattage: 170, tier: "workstation", image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&auto=format&fit=crop&q=80" },
    { id: "cpu-5", name: "Intel Core i5 14400F", brand: "Intel", socket: "LGA1700", cores: "10 Cores / 16 Threads (4.7GHz Boost)", price: 18200, wattage: 65, tier: "budget", image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&auto=format&fit=crop&q=80" },
    { id: "cpu-6", name: "Intel Core i7 14700K", brand: "Intel", socket: "LGA1700", cores: "20 Cores / 28 Threads (5.6GHz Boost)", price: 37900, wattage: 125, tier: "high", image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&auto=format&fit=crop&q=80" },
    { id: "cpu-7", name: "Intel Core i9 14900K", brand: "Intel", socket: "LGA1700", cores: "24 Cores / 32 Threads (6.0GHz Boost)", price: 54900, wattage: 253, tier: "ultra", image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&auto=format&fit=crop&q=80" }
  ],
  motherboards: [
    { id: "mb-1", name: "MSI B650 Gaming Plus WiFi", brand: "MSI", socket: "AM5", formFactor: "ATX", price: 16900, wattage: 35, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80" },
    { id: "mb-2", name: "ASUS ROG STRIX B650-A Gaming WiFi", brand: "ASUS", socket: "AM5", formFactor: "ATX", price: 23800, wattage: 40, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80" },
    { id: "mb-3", name: "Gigabyte X670E AORUS Master", brand: "Gigabyte", socket: "AM5", formFactor: "E-ATX", price: 44500, wattage: 50, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80" },
    { id: "mb-4", name: "MSI PRO B760M-A WiFi DDR5", brand: "MSI", socket: "LGA1700", formFactor: "Micro-ATX", price: 15400, wattage: 35, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80" },
    { id: "mb-5", name: "ASUS ROG STRIX Z790-F Gaming WiFi II", brand: "ASUS", socket: "LGA1700", formFactor: "ATX", price: 38900, wattage: 45, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80" }
  ],
  graphicsCards: [
    { id: "gpu-1", name: "NVIDIA GeForce RTX 4060 8GB", brand: "NVIDIA", vram: "8GB GDDR6", price: 28990, wattage: 115, tier: "budget", fpsMultiplier: 1.0, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" },
    { id: "gpu-2", name: "NVIDIA GeForce RTX 4060 Ti 16GB", brand: "NVIDIA", vram: "16GB GDDR6", price: 44500, wattage: 165, tier: "mid", fpsMultiplier: 1.25, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" },
    { id: "gpu-3", name: "NVIDIA GeForce RTX 4070 Super 12GB", brand: "NVIDIA", vram: "12GB GDDR6X", price: 59900, wattage: 220, tier: "high", popular: true, fpsMultiplier: 1.6, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" },
    { id: "gpu-4", name: "NVIDIA GeForce RTX 4070 Ti Super 16GB", brand: "NVIDIA", vram: "16GB GDDR6X", price: 79900, wattage: 285, tier: "high", fpsMultiplier: 1.9, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" },
    { id: "gpu-5", name: "NVIDIA GeForce RTX 4080 Super 16GB", brand: "NVIDIA", vram: "16GB GDDR6X", price: 104900, wattage: 320, tier: "ultra", fpsMultiplier: 2.3, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" },
    { id: "gpu-6", name: "NVIDIA GeForce RTX 4090 24GB", brand: "NVIDIA", vram: "24GB GDDR6X", price: 198000, wattage: 450, tier: "extreme", fpsMultiplier: 3.0, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" },
    { id: "gpu-7", name: "AMD Radeon RX 7800 XT 16GB", brand: "AMD", vram: "16GB GDDR6", price: 51200, wattage: 263, tier: "mid", fpsMultiplier: 1.55, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" }
  ],
  rams: [
    { id: "ram-1", name: "16GB (1x16GB) Corsair Vengeance DDR5 5200MHz", brand: "Corsair", capacity: "16GB", type: "DDR5", price: 4600, wattage: 10, image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&auto=format&fit=crop&q=80" },
    { id: "ram-2", name: "32GB (2x16GB) G.Skill Ripjaws S5 DDR5 6000MHz CL30", brand: "G.Skill", capacity: "32GB (Dual Channel)", type: "DDR5 Low Latency", price: 9800, wattage: 15, popular: true, image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&auto=format&fit=crop&q=80" },
    { id: "ram-3", name: "32GB (2x16GB) Corsair Dominator Titanium RGB 6000MHz", brand: "Corsair", capacity: "32GB", type: "DDR5 RGB", price: 14500, wattage: 18, image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&auto=format&fit=crop&q=80" },
    { id: "ram-4", name: "64GB (2x32GB) Kingston Fury Beast DDR5 6000MHz", brand: "Kingston", capacity: "64GB", type: "DDR5 High Capacity", price: 19500, wattage: 20, image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&auto=format&fit=crop&q=80" }
  ],
  storages: [
    { id: "ssd-1", name: "1TB Kingston NV2 PCIe 4.0 NVMe M.2 (3500MB/s Read)", brand: "Kingston", capacity: "1TB", price: 5400, wattage: 5, image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&auto=format&fit=crop&q=80" },
    { id: "ssd-2", name: "1TB Samsung 980 Pro PCIe 4.0 NVMe (7000MB/s Read)", brand: "Samsung", capacity: "1TB", price: 8900, wattage: 8, popular: true, image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&auto=format&fit=crop&q=80" },
    { id: "ssd-3", name: "2TB Crucial T500 Gen4 NVMe M.2 (7400MB/s Read)", brand: "Crucial", capacity: "2TB", price: 14500, wattage: 9, image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&auto=format&fit=crop&q=80" },
    { id: "ssd-4", name: "2TB Samsung 990 PRO Gen4 NVMe (7450MB/s Read)", brand: "Samsung", capacity: "2TB", price: 17800, wattage: 10, image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&auto=format&fit=crop&q=80" }
  ],
  coolers: [
    { id: "clr-1", name: "DeepCool AG400 ARGB Single Tower Cooler (4 Heatpipes)", brand: "DeepCool", type: "Air Cooler", price: 2100, wattage: 10, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" },
    { id: "clr-2", name: "DeepCool AK620 Digital Dual Tower (260W TDP Rating)", brand: "DeepCool", type: "Dual Tower Air", price: 6200, wattage: 15, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" },
    { id: "clr-3", name: "DeepCool LS720 SE 360mm ARGB Liquid Cooler", brand: "DeepCool", type: "360mm AIO", price: 9200, wattage: 25, popular: true, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" },
    { id: "clr-4", name: "Lian Li Galahad II LCD 360mm Liquid Cooler", brand: "Lian Li", type: "360mm LCD AIO", price: 22500, wattage: 30, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" },
    { id: "clr-5", name: "Lian Li UNI FAN SL-Infinity 120 RGB (3-Fan Pack + Controller)", brand: "Lian Li", type: "Triple ARGB Fans", price: 8900, wattage: 15, popular: true, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" },
    { id: "clr-6", name: "Corsair iCUE LINK QX120 RGB 120mm PWM (3-Fan Starter Kit)", brand: "Corsair", type: "Magnetic Link Fans", price: 12500, wattage: 20, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" },
    { id: "clr-7", name: "Ant Esports Superflow 120 Auto RGB V2 (3-Fan Pack)", brand: "Ant Esports", type: "Budget 120mm Fans", price: 1200, wattage: 10, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" }
  ],
  powerSupplies: [
    { id: "psu-1", name: "DeepCool PK650D 650W (80 Plus Bronze)", brand: "DeepCool", wattageOutput: 650, cert: "80 Plus Bronze", price: 4400, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" },
    { id: "psu-2", name: "Corsair RM750e 750W (80 Plus Gold Fully Modular, ATX 3.0)", brand: "Corsair", wattageOutput: 750, cert: "80 Plus Gold", price: 8900, popular: true, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" },
    { id: "psu-3", name: "Corsair RM850x 850W (80 Plus Gold Fully Modular, Japanese Caps)", brand: "Corsair", wattageOutput: 850, cert: "80 Plus Gold", price: 11800, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" },
    { id: "psu-4", name: "MSI MAG A1000GL 1000W (80 Plus Gold PCIe 5.0 12VHPWR)", brand: "MSI", wattageOutput: 1000, cert: "80 Plus Gold", price: 14900, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" }
  ],
  cabinets: [
    { id: "case-1", name: "Ant Esports ICE-112 Mid-Tower (Mesh Front, 4 ARGB Fans)", brand: "Ant Esports", type: "Airflow Mesh", price: 3400, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" },
    { id: "case-2", name: "Lian Li O11 Dynamic EVO (Dual Chamber Tempered Glass)", brand: "Lian Li", type: "Panoramic Glass", price: 13900, popular: true, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" },
    { id: "case-3", name: "NZXT H6 Flow RGB Dual Chamber (Angled Front Airflow)", brand: "NZXT", type: "Dual Chamber Mesh", price: 11900, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" },
    { id: "case-4", name: "Antec C8 Curve Dual Chamber (Curved Seamless Glass)", brand: "Antec", type: "Curved Glass", price: 10500, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" }
  ],
  monitors: [
    { id: "mon-0", name: "Tower Only (No Monitor Included)", brand: "None", size: "N/A", resolution: "N/A", refreshRate: "N/A", panel: "N/A", price: 0, wattage: 0, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" },
    { id: "mon-1", name: "LG UltraGear 27GR83Q-B (27\" 1440p 240Hz 1ms IPS)", brand: "LG", size: "27 Inch", resolution: "2560x1440 QHD", refreshRate: "240Hz", panel: "Fast IPS", price: 28990, wattage: 45, popular: true, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=80" },
    { id: "mon-2", name: "Samsung Odyssey G7 G70B (28\" 4K UHD 144Hz 1ms IPS HDR400)", brand: "Samsung", size: "28 Inch", resolution: "3840x2160 4K", refreshRate: "144Hz", panel: "IPS", price: 44990, wattage: 65, popular: true, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=80" },
    { id: "mon-3", name: "BenQ ZOWIE XL2546K (24.5\" 1080p 240Hz DyAc+ Esports)", brand: "BenQ", size: "24.5 Inch", resolution: "1920x1080 FHD", refreshRate: "240Hz", panel: "Fast TN DyAc+", price: 34500, wattage: 40, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=80" },
    { id: "mon-4", name: "ASUS ROG Swift OLED PG27AQDM (27\" 1440p 240Hz 0.03ms)", brand: "ASUS", size: "27 Inch", resolution: "2560x1440 QHD", refreshRate: "240Hz", panel: "OLED", price: 79990, wattage: 50, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=80" },
    { id: "mon-5", name: "Acer Nitro VG270 S (27\" 1080p 165Hz 0.5ms IPS)", brand: "Acer", size: "27 Inch", resolution: "1920x1080 FHD", refreshRate: "165Hz", panel: "IPS", price: 12490, wattage: 30, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=80" }
  ]
};

export const DECLARATION_INFO = {
  title: "A DECLARATION, NOT A BUSINESS PLAN",
  tagline: "Somewhere between a soldering iron and a dream, an empire gets built one machine at a time.",
  mantra: "FIVE MACHINES. FIVE PURPOSES. ONE VISION.",
  author: "WRITTEN & BUILT BY RAAKESH · SEPTEMBER 2026",
  quotePrimary: "Everyone sells a computer. Nobody sells a purpose.",
  manifestoBody: "A box of silicon means nothing until it means something to the person carrying it home. Games World does not move components. It hands people the tool their ambition has been waiting for -- whether that ambition is a spreadsheet, a scoreboard, a timeline, or a model that thinks.",
  corePillars: [
    "Five machines. Five identities. Zero confusion.",
    "Every build named, not numbered -- tools with names get trusted.",
    "Built local. Priced fair. Sold with conviction."
  ],
  quoteSecondary: "A machine sells itself the moment the customer understands what it's for.",
  principles: [
    "No jargon at the counter. Just five names and five purposes.",
    "Let the work speak -- reels, benchmarks, builds filmed start to finish.",
    "Every custom order beyond these five is proof the shop can build anything.",
    "Trust compounds faster than any advertisement."
  ],
  closingWord: "This is not a shop that assembles parts. This is a shop that assembles ambition -- one build, one customer, one purpose at a time.",
  authorSignature: "— RAAKESH"
};

export const PREBUILT_PCS = [
  {
    id: "pb-workhorse",
    number: "01",
    name: "WORKHORSE",
    category: "office",
    badge: "01 // OFFICE & CORPORATE",
    subtitle: "OFFICE & CORPORATE",
    purpose: "Billing, Office, Corporate Management & Multi-Display Productivity",
    quote: "Not every soldier carries a sword. Some carry the numbers that keep the empire funded.",
    price: 49999,
    displayPrice: "Rs. 49,999",
    specs: {
      cpu: "AMD Ryzen 5 5600G (6C / 12T with Radeon Graphics)",
      gpu: "Integrated AMD Radeon Vega Graphics",
      ram: "16GB DDR4 High-Frequency Memory",
      storage: "500GB NVMe Ultra-Fast SSD",
      motherboard: "A520M / B450 Ultra Durable Motherboard",
      psu: "450W 80+ Certified Power Supply",
      cooler: "AMD Wraith Stealth Silent Thermal Solution",
      cabinet: "Compact Acoustic-Dampened Black Chassis"
    },
    tableSpecs: [
      { label: "PROCESSOR", value: "Ryzen 5 5600G" },
      { label: "MEMORY", value: "16GB DDR4" },
      { label: "STORAGE", value: "500GB NVMe" },
      { label: "BUILT FOR", value: "Billing, Office, Calls" }
    ],
    fps: {
      "Office & ERP Workflows": "Instant Snappiness",
      "Multi-Tab Chrome & Excel": "Smooth Zero-Lag",
      "Dual Display Video Calls": "1080p Crystal Clear",
      "System Cold Boot": "6 Seconds"
    },
    warranty: "3 Years Games World Local Warranty",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pb-striker",
    number: "02",
    name: "STRIKER",
    category: "gaming",
    badge: "02 // ENTRY GAMING & ESPORTS",
    subtitle: "ENTRY GAMING & ESPORTS",
    purpose: "Esports Domination, High Refresh Rates & Competitive Gaming",
    quote: "First blood belongs to the fast. Every frame is a fraction of a second you refuse to lose.",
    price: 72999,
    displayPrice: "Rs. 72,999",
    specs: {
      cpu: "AMD Ryzen 5 5600 (6C / 12T 4.4GHz Boost)",
      gpu: "NVIDIA GeForce RTX 4060 8GB GDDR6",
      ram: "16GB DDR4 High-Performance Gaming RAM",
      storage: "1TB NVMe PCIe 4.0 Fast SSD",
      motherboard: "B550M Gaming Motherboard with PCIe 4.0",
      psu: "550W 80+ Bronze Certified PSU",
      cooler: "DeepCool High-Efficiency Tower Air Cooler",
      cabinet: "Airflow Mesh Case with 4 ARGB Fans"
    },
    tableSpecs: [
      { label: "PROCESSOR", value: "Ryzen 5 5600" },
      { label: "GRAPHICS", value: "RTX 4060 8GB" },
      { label: "MEMORY", value: "16GB DDR4" },
      { label: "BUILT FOR", value: "Valorant, BGMI, CS2" }
    ],
    fps: {
      "Valorant (1080p Competitive)": "320+ FPS",
      "CS2 (1080p High)": "220+ FPS",
      "BGMI / Emulator (120FPS)": "Locked 120 FPS",
      "Apex Legends (1080p Max)": "145+ FPS"
    },
    warranty: "3 Years Comprehensive Hardware Warranty",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pb-monster",
    number: "03",
    name: "MONSTER",
    category: "hybrid",
    badge: "03 // GAMING + EDITING HYBRID",
    subtitle: "GAMING + EDITING HYBRID",
    purpose: "1440p High-FPS Gaming, Video Editing & Creative Multitasking",
    quote: "It does not choose between war and art. It commands both before breakfast.",
    price: 119999,
    displayPrice: "Rs. 1,19,999",
    popular: true,
    specs: {
      cpu: "AMD Ryzen 5 9600 (Next-Gen Zen 5 Architecture)",
      gpu: "NVIDIA GeForce RTX 5060 Ti 16GB (or RTX 4060 Ti 16GB)",
      ram: "32GB DDR5 High-Speed Memory",
      storage: "1TB Gen4 NVMe M.2 SSD",
      motherboard: "AMD B650 / B850 Next-Gen Motherboard",
      psu: "650W 80+ Gold Certified Modular PSU",
      cooler: "240mm ARGB Liquid AIO Thermal System",
      cabinet: "Dual Chamber Panoramic Tempered Glass Chassis"
    },
    tableSpecs: [
      { label: "PROCESSOR", value: "Ryzen 5 9600" },
      { label: "GRAPHICS", value: "RTX 5060 Ti 16GB" },
      { label: "MEMORY", value: "32GB DDR5" },
      { label: "BUILT FOR", value: "1440p Gaming, Editing" }
    ],
    fps: {
      "1440p Ultra Gaming": "110+ FPS",
      "Premiere Pro 4K Editing": "Real-Time Playback",
      "DaVinci Resolve Color Grade": "60 FPS Fluid",
      "Valorant / CS2": "450+ FPS"
    },
    warranty: "3 Years Games World VIP Build Warranty",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pb-forge",
    number: "04",
    name: "FORGE",
    category: "creation",
    badge: "04 // CONTENT CREATION & 3D",
    subtitle: "CONTENT CREATION & 3D",
    purpose: "Heavy Video Editing, Blender 3D Rendering, Unreal Engine & Architectural Viz",
    quote: "Where raw ideas get hammered into something the world remembers.",
    price: 154999,
    displayPrice: "Rs. 1,54,999",
    specs: {
      cpu: "AMD Ryzen 7 9700X (8C / 16T High-Frequency Zen 5)",
      gpu: "NVIDIA GeForce RTX 4070 12GB GDDR6X Studio",
      ram: "32GB DDR5 Low Latency High-Speed RAM",
      storage: "2TB Gen4 Ultra-Speed NVMe SSD",
      motherboard: "Creator Pro B650-A WiFi Motherboard",
      psu: "750W 80+ Gold Certified Modular ATX 3.0",
      cooler: "360mm High-Performance Liquid AIO Cooler",
      cabinet: "Creator Acoustically-Tuned High-Airflow Studio Tower"
    },
    tableSpecs: [
      { label: "PROCESSOR", value: "Ryzen 7 9700X" },
      { label: "GRAPHICS", value: "RTX 4070 12GB" },
      { label: "MEMORY", value: "32GB DDR5" },
      { label: "BUILT FOR", value: "Editing, Blender, Viz" }
    ],
    fps: {
      "Blender 4.0 OptiX Cycles": "Lightning Fast Renders",
      "4K 10-bit Video Timeline": "Zero Dropped Frames",
      "Unreal Engine 5 Viewport": "90+ FPS Realtime",
      "Cyberpunk 2077 (1440p RT)": "120+ FPS (DLSS 3.5)"
    },
    warranty: "3 Years Comprehensive Hardware Warranty",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pb-oracle",
    number: "05",
    name: "ORACLE",
    category: "ai",
    badge: "05 // LOCAL AI & LLM WORKSTATION",
    subtitle: "LOCAL AI & LLM WORKSTATION",
    purpose: "Local LLM Inference, Deep Learning, AI Engineering & Extreme Workstation Workloads",
    quote: "It does not wait for the future. It computes it, locally, on your desk.",
    price: 209999,
    displayPrice: "Rs. 2,09,999",
    specs: {
      cpu: "AMD Ryzen 9 9900X (12C / 24T Multi-Thread Workstation)",
      gpu: "NVIDIA GeForce RTX 4070 Ti Super 16GB GDDR6X (Tensor Cores)",
      ram: "64GB DDR5 High-Capacity Workstation Memory",
      storage: "2TB Samsung 990 PRO Gen4 NVMe (7450MB/s)",
      motherboard: "Workstation Grade X670E / B650 Studio Board",
      psu: "850W 80+ Gold Fully Modular ATX 3.0 PCIe 5.0",
      cooler: "Flagship 360mm Liquid Cooler with Realtime Telemetry",
      cabinet: "Dual Chamber Stealth Blackout AI Workstation Chassis"
    },
    tableSpecs: [
      { label: "PROCESSOR", value: "Ryzen 9 9900X" },
      { label: "GRAPHICS", value: "RTX 4070 Ti Super 16GB" },
      { label: "MEMORY", value: "64GB DDR5" },
      { label: "BUILT FOR", value: "Local LLMs, AI Dev" }
    ],
    fps: {
      "Local LLM Inference (Llama-3 8B / 70B)": "45+ Tokens/Sec",
      "Stable Diffusion XL Image Gen": "1.2s per 1024x1024 Image",
      "PyTorch Model Fine-Tuning": "Full Tensor FP16/BF16 Support",
      "4K Gaming Max Settings": "140+ FPS Ultra"
    },
    warranty: "3 Years Priority On-Site & Direct Replacement Support",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80"
  }
];

export const LAPTOP_SERVICES = [
  {
    id: "ls-1",
    title: "Thermal Grizzly Kryonaut Repasting & Dusting",
    time: "2 Hours",
    price: "From ₹799",
    desc: "Complete teardown, heatsink ultrasonic de-dusting, and application of genuine Thermal Grizzly Kryonaut to eliminate thermal throttling and drop core temps by 15°C–25°C.",
    icon: "Flame"
  },
  {
    id: "ls-2",
    title: "Chip-Level Motherboard & Power IC Repair",
    time: "24–48 Hours",
    price: "Diagnosis Free • From ₹1,499",
    desc: "Microscopic repair for dead laptops, no-display, shorted capacitor rails, liquid damage, and MOSFET/super I/O controller replacements.",
    icon: "CircuitBoard"
  },
  {
    id: "ls-3",
    title: "Dedicated GPU & VRAM Reballing / Repair",
    time: "2–3 Days",
    price: "From ₹2,499",
    desc: "BGA rework station repair for artifacting graphics, BSOD code 43 errors, and corrupted GDDR6 VRAM chips on ASUS ROG, Legion, Alienware, and Predator laptops.",
    icon: "Cpu"
  },
  {
    id: "ls-4",
    title: "144Hz / 165Hz / 240Hz Screen Replacement",
    time: "Same Day",
    price: "From ₹2,999",
    desc: "Direct replacement of cracked, dead, or bleeding laptop screens with genuine high-refresh rate IPS panels. Zero dead-pixel check.",
    icon: "Monitor"
  },
  {
    id: "ls-5",
    title: "Hinge Reconstruction & Body Repair",
    time: "Same Day",
    price: "From ₹999",
    desc: "Structural reinforcement of broken laptop hinges and cracked chassis brass inserts using industrial high-strength epoxy compound.",
    icon: "Wrench"
  },
  {
    id: "ls-6",
    title: "Instant RAM & Gen4 NVMe SSD Upgrades",
    time: "30 Minutes",
    price: "Parts Cost + ₹299",
    desc: "DDR4 / DDR5 memory upgrades up to 64GB and high-speed Gen4 NVMe SSD expansion with complete OS cloning without losing personal files.",
    icon: "Zap"
  }
];

export const TESTIMONIALS = [
  {
    name: "Karthik Subramanian",
    role: "CS2 & Valorant Player",
    rating: 5,
    text: "Had terrible thermal throttling on my ASUS ROG Strix (CPU hitting 96°C in CS2). Brought it to Games World Chennai; their technicians repasted it with Thermal Grizzly Kryonaut and cleaned the copper fins. Temps dropped to 72°C flat. Collected the laptop in 2 hours.",
    build: "Laptop Thermal Overhaul",
    city: "Chennai"
  },
  {
    name: "Vignesh Murugan",
    role: "Full-Time Gamer & Editor",
    rating: 5,
    text: "Ordered a custom Ryzen 7 7800X3D + RTX 4070 Super build with 32GB DDR5. Tested Cyberpunk and Valorant on bench before taking delivery. Cable routing behind the Lian Li glass is razor sharp, and no bloatware was installed.",
    build: "Custom 7800X3D + RTX 4070 Super",
    city: "Anna Nagar, Chennai"
  },
  {
    name: "Arvind Raghavan",
    role: "Creative Professional",
    rating: 5,
    text: "Ordered a custom workstation for 3D animation and Unreal Engine 5. High-grade VRM heatsinks, zero thermal throttling under full render load, and rock-solid stability.",
    build: "Production Rig",
    city: "Chennai"
  }
];
