export const COMPANY_INFO = {
  name: "GAMES WORLD",
  tagline: "PLAY • CONNECT • COMPETE",
  slogan: "GAMES WORLD – YOUR TECH, OUR PRIORITY",
  founder: "PRADHAAN RAGAVA",
  phones: ["+91 9087290225", "+91 9381218111"],
  primaryPhone: "+91 9087290225",
  whatsappNumber: "919087290225",
  emails: ["gamesworldsathya@gmail.com", "pradhaanragava@gmail.com"],
  address: "No -1, Athipatten Street, 3rd Floor, Landmark - Bharat Petroleum Back Side, Chennai",
  hours: "Monday – Sunday: 10:30 AM – 9:30 PM",
  logo: "/images/games_world_logo.png",
  cardImages: [
    "/images/card_front_back.jpg",
    "/images/card_details_pillars.jpg"
  ]
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
    id: "gaming-zone",
    title: "ESPORTS GAMING ZONE",
    sub: "240HZ RIGS • PS5 4K VIP LOUNGE",
    icon: "Gamepad2",
    desc: "Tournament-ready 240Hz gaming monitors, RTX 40-series machines, gigabit fiber, and private 65\" 4K 120Hz PlayStation 5 couch booths.",
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
    { id: "clr-4", name: "Lian Li Galahad II LCD 360mm Liquid Cooler", brand: "Lian Li", type: "360mm LCD AIO", price: 22500, wattage: 30, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80" }
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
  ]
};

export const PREBUILT_PCS = [
  {
    id: "pb-1",
    name: "GAMES WORLD CYBER-X1",
    category: "budget",
    badge: "1080p Esports Starter",
    subtitle: "Solid 240+ FPS Competitive Rig",
    price: 64990,
    originalPrice: 72000,
    specs: {
      cpu: "Intel Core i5 14400F",
      gpu: "NVIDIA GeForce RTX 4060 8GB",
      ram: "16GB DDR5 5200MHz Corsair",
      storage: "1TB NVMe PCIe 4.0 SSD",
      motherboard: "MSI B760M-A WiFi DDR5",
      cooler: "DeepCool AG400 ARGB",
      psu: "DeepCool 650W 80+ Bronze",
      cabinet: "Ant Esports ICE-112 Mesh (4 Fans)"
    },
    fps: {
      "Valorant (1080p High)": "380+ FPS",
      "CS2 (1080p Competitive)": "260+ FPS",
      "GTA V (1080p Ultra)": "145+ FPS",
      "Cyberpunk 2077 (1080p DLSS)": "85+ FPS"
    },
    warranty: "3 Years Hardware Warranty",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pb-2",
    name: "GAMES WORLD VALKYRIE 1440P",
    category: "mid",
    badge: "Most Popular 1440p",
    subtitle: "High-Refresh 1440p Ray-Tracing Gaming Rig",
    price: 124990,
    originalPrice: 139000,
    popular: true,
    specs: {
      cpu: "AMD Ryzen 7 7800X3D (3D V-Cache)",
      gpu: "NVIDIA GeForce RTX 4070 Super 12GB GDDR6X",
      ram: "32GB (2x16GB) G.Skill DDR5 6000MHz CL30",
      storage: "1TB Samsung 980 Pro Gen4 NVMe (7000MB/s)",
      motherboard: "MSI B650 Gaming Plus WiFi",
      cooler: "DeepCool LS720 SE 360mm Liquid AIO",
      psu: "Corsair RM750e 750W 80+ Gold ATX 3.0",
      cabinet: "NZXT H6 Flow Dual Chamber"
    },
    fps: {
      "Cyberpunk 2077 (1440p Ultra RT)": "110+ FPS",
      "Black Myth: Wukong (1440p High)": "95+ FPS",
      "Call of Duty Warzone (1440p)": "165+ FPS",
      "Valorant (1440p Max)": "550+ FPS"
    },
    warranty: "3 Years Comprehensive Warranty",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pb-3",
    name: "GAMES WORLD DOMINATOR 4K",
    category: "high",
    badge: "Native 4K Ultra",
    subtitle: "Ultra High Settings 4K Beast",
    price: 219990,
    originalPrice: 245000,
    specs: {
      cpu: "AMD Ryzen 7 9800X3D / 7800X3D",
      gpu: "NVIDIA GeForce RTX 4080 Super 16GB GDDR6X",
      ram: "32GB Corsair Dominator Titanium DDR5 6000MHz",
      storage: "2TB Samsung 990 PRO Gen4 NVMe (7450MB/s)",
      motherboard: "ASUS ROG STRIX B650-A Gaming WiFi",
      cooler: "Lian Li Galahad II 360mm ARGB AIO",
      psu: "Corsair RM850x 850W Gold Fully Modular",
      cabinet: "Lian Li O11 Dynamic EVO Tempered Glass"
    },
    fps: {
      "Cyberpunk 2077 (4K Ultra Path Tracing)": "85+ FPS (DLSS 3.5)",
      "Forza Horizon 5 (4K Extreme)": "140+ FPS",
      "Red Dead Redemption 2 (4K Ultra)": "115+ FPS",
      "Apex Legends (4K Max)": "220+ FPS"
    },
    warranty: "3 Years Priority Support",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pb-4",
    name: "GAMES WORLD TITAN RTX 4090",
    category: "ultra",
    badge: "Flagship 24GB VRAM",
    subtitle: "Heavy 4K Gaming, 3D Rendering & Local AI",
    price: 349900,
    originalPrice: 380000,
    specs: {
      cpu: "Intel Core i9 14900K (24C / 32T Up to 6.0GHz)",
      gpu: "NVIDIA GeForce RTX 4090 24GB GDDR6X",
      ram: "64GB (2x32GB) Kingston Fury Beast DDR5 6000MHz",
      storage: "4TB (2x 2TB) Samsung 990 PRO Gen4 NVMe",
      motherboard: "ASUS ROG STRIX Z790-F Gaming WiFi II",
      cooler: "Lian Li Galahad II LCD 360mm Liquid Cooler",
      psu: "MSI 1000W 80+ Gold PCIe 5.0 ATX 3.0",
      cabinet: "Lian Li O11 Dynamic EVO RGB Dual Chamber"
    },
    fps: {
      "Cyberpunk 2077 (4K Psycho RT)": "115+ FPS",
      "Alan Wake 2 (4K Max Ray Tracing)": "100+ FPS",
      "GTA V (4K Ultra Enhanced)": "180+ FPS",
      "Blender 4.0 Classroom Render": "8.4 Seconds"
    },
    warranty: "3 Years Direct VIP Replacement Support",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80"
  }
];

export const GAMING_ZONE_PLANS = [
  {
    id: "gz-1",
    title: "1-HOUR ESPORTS SESSION",
    price: "₹99",
    unit: "/ hour",
    popular: false,
    features: [
      "240Hz Gaming Monitors",
      "NVIDIA RTX 40-Series Powered Rigs",
      "Mechanical Keyboards & High-DPI Esports Mouse",
      "Low-Ping Gigabit Fiber Connection",
      "Valorant, CS2, Apex, Fortnite Pre-Installed"
    ]
  },
  {
    id: "gz-2",
    title: "3-HOUR BATTLE PASS",
    price: "₹249",
    unit: "/ 3 hours",
    popular: true,
    badge: "Best Value",
    features: [
      "3 Continuous hours of competitive gameplay",
      "Seat reservation on preferred tournament rig",
      "Esports noise-cancelling headset included",
      "Save ₹48 over hourly rate",
      "Cold beverage included"
    ]
  },
  {
    id: "gz-3",
    title: "VIP PS5 4K COUCH LOUNGE",
    price: "₹399",
    unit: "/ hour (up to 4 friends)",
    popular: false,
    badge: "Squad VIP",
    features: [
      "Private luxury recliner couch booth",
      "PlayStation 5 on 65\" 4K 120Hz OLED Screen",
      "4 DualSense wireless controllers",
      "FC 24, WWE 2K24, Tekken 8, Mortal Kombat 1",
      "Logitech G29 Racing Rig Access"
    ]
  },
  {
    id: "gz-4",
    title: "NIGHT LOCK-IN (10 PM - 7 AM)",
    price: "₹699",
    unit: "/ 9 full hours",
    popular: false,
    features: [
      "9 Hours non-stop night gaming session",
      "Dedicated high-FPS tournament station",
      "Midnight energy drink + snack combo",
      "Advance slot booking recommended"
    ]
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
    text: "Had terrible thermal throttling on my ASUS ROG Strix (CPU hitting 96°C in CS2). Brought it to Games World Chennai; Pradhaan personally repasted it with Thermal Grizzly Kryonaut and cleaned the copper fins. Temps dropped to 72°C flat. Collected the laptop in 2 hours.",
    build: "Laptop Thermal Overhaul",
    city: "Chennai"
  },
  {
    name: "Vignesh Murugan",
    role: "Full-Time Gamer & Editor",
    rating: 5,
    text: "Ordered a custom Ryzen 7 7800X3D + RTX 4070 Super build with 32GB DDR5. Tested Cyberpunk and Valorant on their 240Hz monitors before taking delivery. Cable routing behind the Lian Li glass is razor sharp, and no bloatware was installed.",
    build: "Custom 7800X3D + RTX 4070 Super",
    city: "Anna Nagar, Chennai"
  },
  {
    name: "Arvind Raghavan",
    role: "Weekend Gamer",
    rating: 5,
    text: "Hands down the best gaming cafe in Chennai. 240Hz BenQ monitors, zero ping issues, and their private PS5 couch booth is unbeatable for FIFA and Tekken weekends with the squad.",
    build: "Gaming Zone Regular",
    city: "Triplicane, Chennai"
  }
];
