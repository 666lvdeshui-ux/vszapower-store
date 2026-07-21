// High Resolution Vector SVG Data URLs for VSZAPOWER Coin Cell Chargers & Batteries
// Guarantees 100% fast, reliable image loading across all browsers and networks without third-party dependencies

export const SVG_IMAGES = {
  // 1. Dual Slot Starter Kit
  dual_charger_starter_kit: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%23060a12"/>
        <stop offset="100%" stop-color="%23111827"/>
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%2310b981"/>
        <stop offset="100%" stop-color="%23059669"/>
      </linearGradient>
      <linearGradient id="silver" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%23e2e8f0"/>
        <stop offset="50%" stop-color="%23cbd5e1"/>
        <stop offset="100%" stop-color="%2394a3b8"/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="6" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>
    <rect width="800" height="600" fill="url(%23bg)"/>
    <g transform="translate(180, 100)">
      <!-- Main Dock Body -->
      <rect x="0" y="40" width="440" height="340" rx="32" fill="%230f172a" stroke="%231e293b" stroke-width="4"/>
      <rect x="20" y="60" width="400" height="300" rx="24" fill="%231e293b" opacity="0.6"/>
      <!-- Brand Logo -->
      <text x="220" y="95" text-anchor="middle" fill="%2310b981" font-family="Arial, sans-serif" font-weight="900" font-size="22" letter-spacing="2">VSZAPOWER</text>
      <text x="220" y="115" text-anchor="middle" fill="%2394a3b8" font-family="Arial, sans-serif" font-size="12">SMART COIN CELL DUAL DOCK</text>

      <!-- Slot 1 -->
      <circle cx="130" cy="220" r="75" fill="%23090d16" stroke="%23334155" stroke-width="4"/>
      <!-- Slot 1 Battery Inserted -->
      <circle cx="130" cy="220" r="65" fill="url(%23silver)" stroke="%2310b981" stroke-width="3"/>
      <text x="130" y="215" text-anchor="middle" fill="%230f172a" font-family="Arial, sans-serif" font-weight="bold" font-size="18">LIR2032</text>
      <text x="130" y="235" text-anchor="middle" fill="%23059669" font-family="Arial, sans-serif" font-weight="bold" font-size="14">3.7V 45mAh</text>
      <!-- LED Indicator 1 (Red Charging) -->
      <circle cx="130" cy="320" r="8" fill="%23ef4444" filter="url(%23glow)"/>
      <text x="130" y="342" text-anchor="middle" fill="%23ef4444" font-family="Arial, sans-serif" font-size="10" font-weight="bold">CHARGING</text>

      <!-- Slot 2 -->
      <circle cx="310" cy="220" r="75" fill="%23090d16" stroke="%23334155" stroke-width="4"/>
      <!-- Slot 2 Battery Inserted -->
      <circle cx="310" cy="220" r="65" fill="url(%23silver)" stroke="%2310b981" stroke-width="3"/>
      <text x="310" y="215" text-anchor="middle" fill="%230f172a" font-family="Arial, sans-serif" font-weight="bold" font-size="18">LIR2032</text>
      <text x="310" y="235" text-anchor="middle" fill="%23059669" font-family="Arial, sans-serif" font-weight="bold" font-size="14">3.7V 45mAh</text>
      <!-- LED Indicator 2 (Green Full) -->
      <circle cx="310" cy="320" r="8" fill="%2310b981" filter="url(%23glow)"/>
      <text x="310" y="342" text-anchor="middle" fill="%2310b981" font-family="Arial, sans-serif" font-size="10" font-weight="bold">READY 100%</text>

      <!-- USB Type C Cable -->
      <path d="M 220 380 L 220 440" stroke="%23475569" stroke-width="12" stroke-linecap="round"/>
      <rect x="200" y="430" width="40" height="30" rx="6" fill="%23334155"/>
    </g>
    <!-- Extra 2 Spare LIR2032 Batteries on Side -->
    <g transform="translate(620, 360)">
      <circle cx="0" cy="0" r="45" fill="url(%23silver)" stroke="%2394a3b8" stroke-width="2"/>
      <text x="0" y="-5" text-anchor="middle" fill="%230f172a" font-family="Arial, sans-serif" font-weight="bold" font-size="12">LIR2032</text>
      <text x="0" y="12" text-anchor="middle" fill="%23475569" font-family="Arial, sans-serif" font-size="10">3.7V</text>
    </g>
    <g transform="translate(100, 360)">
      <circle cx="0" cy="0" r="45" fill="url(%23silver)" stroke="%2394a3b8" stroke-width="2"/>
      <text x="0" y="-5" text-anchor="middle" fill="%230f172a" font-family="Arial, sans-serif" font-weight="bold" font-size="12">LIR2032</text>
      <text x="0" y="12" text-anchor="middle" fill="%23475569" font-family="Arial, sans-serif" font-size="10">3.7V</text>
    </g>
  </svg>`,

  // 2. 4-Slot Pro Type-C Charger
  quad_pro_charger: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <defs>
      <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%23040d1a"/>
        <stop offset="100%" stop-color="%230f172a"/>
      </linearGradient>
      <linearGradient id="cyan" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%2306b6d4"/>
        <stop offset="100%" stop-color="%232563eb"/>
      </linearGradient>
      <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%23f1f5f9"/>
        <stop offset="100%" stop-color="%2394a3b8"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(%23bg2)"/>
    <g transform="translate(100, 120)">
      <!-- Main Dock Body (Wide 4 Slot) -->
      <rect x="0" y="0" width="600" height="320" rx="28" fill="%230f172a" stroke="%231e293b" stroke-width="4"/>
      <text x="300" y="50" text-anchor="middle" fill="%2306b6d4" font-family="Arial, sans-serif" font-weight="900" font-size="24" letter-spacing="3">VSZAPOWER 4-SLOT PRO</text>
      <text x="300" y="72" text-anchor="middle" fill="%2364748b" font-family="Arial, sans-serif" font-size="12">MCU INDEPENDENT TYPE-C FAST CHARGER</text>

      <!-- Slot 1 -->
      <g transform="translate(85, 170)">
        <circle cx="0" cy="0" r="50" fill="%23020617" stroke="%23334155" stroke-width="3"/>
        <circle cx="0" cy="0" r="42" fill="url(%23metal)"/>
        <text x="0" y="4" text-anchor="middle" fill="%230f172a" font-family="Arial" font-weight="bold" font-size="12">LIR2032</text>
        <circle cx="0" cy="70" r="6" fill="%2310b981"/>
      </g>
      <!-- Slot 2 -->
      <g transform="translate(228, 170)">
        <circle cx="0" cy="0" r="50" fill="%23020617" stroke="%23334155" stroke-width="3"/>
        <circle cx="0" cy="0" r="42" fill="url(%23metal)"/>
        <text x="0" y="4" text-anchor="middle" fill="%230f172a" font-family="Arial" font-weight="bold" font-size="12">LIR2025</text>
        <circle cx="0" cy="70" r="6" fill="%23ef4444"/>
      </g>
      <!-- Slot 3 -->
      <g transform="translate(371, 170)">
        <circle cx="0" cy="0" r="50" fill="%23020617" stroke="%23334155" stroke-width="3"/>
        <circle cx="0" cy="0" r="42" fill="url(%23metal)"/>
        <text x="0" y="4" text-anchor="middle" fill="%230f172a" font-family="Arial" font-weight="bold" font-size="12">LIR2016</text>
        <circle cx="0" cy="70" r="6" fill="%2310b981"/>
      </g>
      <!-- Slot 4 -->
      <g transform="translate(515, 170)">
        <circle cx="0" cy="0" r="50" fill="%23020617" stroke="%23334155" stroke-width="3"/>
        <circle cx="0" cy="0" r="46" fill="url(%23metal)" stroke="%2306b6d4" stroke-width="2"/>
        <text x="0" y="4" text-anchor="middle" fill="%230f172a" font-family="Arial" font-weight="bold" font-size="12">LIR2450</text>
        <circle cx="0" cy="70" r="6" fill="%2310b981"/>
      </g>
    </g>
  </svg>`,

  // 3. LIR2450 High Capacity Charger
  lir2450_heavy_duty: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <defs>
      <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%23111827"/>
        <stop offset="100%" stop-color="%2306101e"/>
      </linearGradient>
      <linearGradient id="steel" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%23f8fafc"/>
        <stop offset="100%" stop-color="%2394a3b8"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(%23bg3)"/>
    <g transform="translate(220, 100)">
      <!-- Main Dock Body -->
      <rect x="0" y="30" width="360" height="360" rx="36" fill="%230f172a" stroke="%23334155" stroke-width="4"/>
      <text x="180" y="80" text-anchor="middle" fill="%23f59e0b" font-family="Arial" font-weight="900" font-size="22">LIR2450 PRO DOCK</text>
      <text x="180" y="102" text-anchor="middle" fill="%2394a3b8" font-family="Arial" font-size="12">120mAh HIGH DRAIN POWER</text>
      
      <!-- Big LIR2450 Battery Slot -->
      <circle cx="180" cy="220" r="95" fill="%23020617" stroke="%23f59e0b" stroke-width="4"/>
      <circle cx="180" cy="220" r="85" fill="url(%23steel)"/>
      <text x="180" y="210" text-anchor="middle" fill="%230f172a" font-family="Arial" font-weight="bold" font-size="24">LIR2450</text>
      <text x="180" y="238" text-anchor="middle" fill="%23d97706" font-family="Arial" font-weight="bold" font-size="16">3.7V 120mAh</text>
      
      <!-- Indicator -->
      <circle cx="180" cy="340" r="10" fill="%2310b981"/>
    </g>
  </svg>`,

  // 4. Ultra Compact Portable Charger
  portable_usb_charger: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <defs>
      <linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%23090d16"/>
        <stop offset="100%" stop-color="%231e293b"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(%23bg4)"/>
    <g transform="translate(250, 140)">
      <!-- Compact Body -->
      <rect x="0" y="80" width="300" height="240" rx="20" fill="%230f172a" stroke="%23334155" stroke-width="4"/>
      <rect x="110" y="20" width="80" height="60" rx="8" fill="%2394a3b8"/>
      
      <text x="150" y="130" text-anchor="middle" fill="%2310b981" font-family="Arial" font-weight="900" font-size="18">PORTABLE USB</text>
      
      <!-- Slot 1 & 2 -->
      <circle cx="90" cy="210" r="45" fill="%23f1f5f9"/>
      <text x="90" y="215" text-anchor="middle" fill="%230f172a" font-size="12" font-weight="bold">LIR2032</text>
      
      <circle cx="210" cy="210" r="45" fill="%23f1f5f9"/>
      <text x="210" y="215" text-anchor="middle" fill="%230f172a" font-size="12" font-weight="bold">LIR2025</text>
    </g>
  </svg>`,

  // 5. 4-Pack LIR2032 Batteries
  lir2032_4pack_batteries: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <defs>
      <linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%23060a12"/>
        <stop offset="100%" stop-color="%23111827"/>
      </linearGradient>
      <linearGradient id="shiny" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%23ffffff"/>
        <stop offset="50%" stop-color="%23cbd5e1"/>
        <stop offset="100%" stop-color="%2364748b"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(%23bg5)"/>
    <g transform="translate(160, 120)">
      <!-- Card Pack Container -->
      <rect x="0" y="0" width="480" height="360" rx="24" fill="%231e293b" stroke="%23334155" stroke-width="4"/>
      <text x="240" y="45" text-anchor="middle" fill="%2310b981" font-family="Arial" font-weight="900" font-size="20">VSZAPOWER ECO PACK</text>
      <text x="240" y="68" text-anchor="middle" fill="%2394a3b8" font-family="Arial" font-size="12">4x LIR2032 RECHARGEABLE 3.7V LITHIUM CELLS</text>

      <!-- 4 Batteries Grid -->
      <g transform="translate(130, 140)">
        <circle cx="0" cy="0" r="52" fill="url(%23shiny)" stroke="%2310b981" stroke-width="3"/>
        <text x="0" y="-4" text-anchor="middle" fill="%230f172a" font-family="Arial" font-weight="bold" font-size="14">LIR2032</text>
        <text x="0" y="14" text-anchor="middle" fill="%23059669" font-family="Arial" font-weight="bold" font-size="12">3.7V</text>
      </g>
      <g transform="translate(350, 140)">
        <circle cx="0" cy="0" r="52" fill="url(%23shiny)" stroke="%2310b981" stroke-width="3"/>
        <text x="0" y="-4" text-anchor="middle" fill="%230f172a" font-family="Arial" font-weight="bold" font-size="14">LIR2032</text>
        <text x="0" y="14" text-anchor="middle" fill="%23059669" font-family="Arial" font-weight="bold" font-size="12">3.7V</text>
      </g>
      <g transform="translate(130, 270)">
        <circle cx="0" cy="0" r="52" fill="url(%23shiny)" stroke="%2310b981" stroke-width="3"/>
        <text x="0" y="-4" text-anchor="middle" fill="%230f172a" font-family="Arial" font-weight="bold" font-size="14">LIR2032</text>
        <text x="0" y="14" text-anchor="middle" fill="%23059669" font-family="Arial" font-weight="bold" font-size="12">3.7V</text>
      </g>
      <g transform="translate(350, 270)">
        <circle cx="0" cy="0" r="52" fill="url(%23shiny)" stroke="%2310b981" stroke-width="3"/>
        <text x="0" y="-4" text-anchor="middle" fill="%230f172a" font-family="Arial" font-weight="bold" font-size="14">LIR2032</text>
        <text x="0" y="14" text-anchor="middle" fill="%23059669" font-family="Arial" font-weight="bold" font-size="12">3.7V</text>
      </g>
    </g>
  </svg>`,

  // 6. German LIR2025 30-Min Fast Charger
  lir2025_30min_fast_charger: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <defs>
      <linearGradient id="bgg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%23020617"/>
        <stop offset="100%" stop-color="%230f172a"/>
      </linearGradient>
      <linearGradient id="neon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%2310b981"/>
        <stop offset="100%" stop-color="%2306b6d4"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(%23bgg)"/>
    <g transform="translate(200, 100)">
      <rect x="0" y="0" width="400" height="380" rx="32" fill="%23090d16" stroke="%2310b981" stroke-width="4"/>
      <text x="200" y="55" text-anchor="middle" fill="%2310b981" font-family="Arial" font-weight="900" font-size="22">VSZAPOWER 30-MIN ULTRA FAST</text>
      <text x="200" y="80" text-anchor="middle" fill="%2394a3b8" font-family="Arial" font-size="12">CR2025 / CR2032 RECHARGEABLE REPLACEMENT DOCK</text>
      
      <!-- Charger Slots -->
      <circle cx="120" cy="200" r="70" fill="%230f172a" stroke="%23334155" stroke-width="3"/>
      <circle cx="120" cy="200" r="60" fill="%23cbd5e1" stroke="%2310b981" stroke-width="3"/>
      <text x="120" y="195" text-anchor="middle" fill="%230f172a" font-family="Arial" font-weight="bold" font-size="16">LIR2025</text>
      <text x="120" y="215" text-anchor="middle" fill="%23059669" font-family="Arial" font-weight="bold" font-size="12">30 MIN FAST</text>
      <circle cx="120" cy="300" r="8" fill="%2310b981"/>

      <circle cx="280" cy="200" r="70" fill="%230f172a" stroke="%23334155" stroke-width="3"/>
      <circle cx="280" cy="200" r="60" fill="%23cbd5e1" stroke="%2310b981" stroke-width="3"/>
      <text x="280" y="195" text-anchor="middle" fill="%230f172a" font-family="Arial" font-weight="bold" font-size="16">LIR2032</text>
      <text x="280" y="215" text-anchor="middle" fill="%23059669" font-family="Arial" font-weight="bold" font-size="12">30 MIN FAST</text>
      <circle cx="280" cy="300" r="8" fill="%2310b981"/>

      <text x="200" y="345" text-anchor="middle" fill="%2338bdf8" font-family="Arial" font-weight="bold" font-size="14">支持 Autoschlüssel • Fernbedienungen • Waagen</text>
    </g>
  </svg>`
};
