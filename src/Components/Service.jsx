import React, { useState, useEffect, useRef } from 'react';
import './Service.css';
import { motion, AnimatePresence } from 'framer-motion';
import Images from './ServiceImages';

/* ─────────────── DATA ─────────────── */
const CATEGORIES = [
  { id: 'all', label: 'All Services', icon: 'fa-th-large' },
  { id: 'electrical', label: 'Electrical', icon: 'fa-bolt' },
  { id: 'plumbing', label: 'Plumbing', icon: 'fa-droplet' },
  { id: 'cooling', label: 'Cooling & HVAC', icon: 'fa-snowflake' },
  { id: 'cleaning', label: 'Cleaning', icon: 'fa-broom' },
  { id: 'appliance', label: 'Appliances', icon: 'fa-blender' },
  { id: 'painting', label: 'Painting', icon: 'fa-paintbrush' },
  { id: 'security', label: 'Security', icon: 'fa-shield-halved' },
  { id: 'pest', label: 'Pest Control', icon: 'fa-bug' },
];

const AVAILABILITY_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'Available Now', label: 'Available Now' },
  { id: 'Scheduled', label: 'Scheduled' },
  { id: 'Emergency', label: 'Emergency' },
];

const SERVICES = [
  { id: 1, name: 'Electrician', category: 'electrical', icon: 'fa-bolt', rating: 4.9, reviews: 2340, eta: '15–20 min', availability: 'Available Now', featured: true, badge: 'Most Booked', color: '#FF6B00', image: Images.electric, shortDesc: 'Certified electricians for wiring, panel upgrades, outlets & more.', details: 'Our certified electricians handle everything from faulty wiring and circuit breaker trips to full home rewiring and smart home integrations.', includes: ['Fault diagnosis', 'Wiring & rewiring', 'Panel upgrades', 'Smart switch installation'] },
  { id: 2, name: 'Fan Repair & Installation', category: 'electrical', icon: 'fa-fan', rating: 4.7, reviews: 890, eta: '15–20 min', availability: 'Available Now', featured: false, badge: null, color: '#FF6B00', image: Images.fanRepair, shortDesc: 'Ceiling fan, exhaust fan & wall fan repair and installation.', details: 'Fast fan repair service including regulator issues, noise problems, and new fan installation.', includes: ['Fan repair', 'Regulator replacement', 'New fan installation', 'Noise fixing'] },
  { id: 3, name: 'Light & Switch Repair', category: 'electrical', icon: 'fa-lightbulb', rating: 4.8, reviews: 1450, eta: '10–15 min', availability: 'Available Now', featured: false, badge: null, color: '#FF6B00', image: Images.lightSwitch, shortDesc: 'Flickering lights, dead switches, chandelier & LED installation.', details: 'Fix all lighting issues including tube lights, LEDs, chandeliers, and smart switches.', includes: ['Switch replacement', 'LED installation', 'Chandelier fixing', 'Wiring check'] },
  { id: 4, name: 'Inverter & UPS Repair', category: 'electrical', icon: 'fa-battery-full', rating: 4.6, reviews: 560, eta: '20–25 min', availability: 'Available Now', featured: false, badge: null, color: '#FF6B00', image: Images.inverterRepair, shortDesc: 'Inverter, UPS & battery backup repair and maintenance.', details: 'Expert diagnosis for inverter not charging, battery issues, and UPS failure.', includes: ['Inverter repair', 'Battery replacement', 'UPS service', 'Wiring check'] },
  { id: 5, name: 'Geyser / Water Heater Repair', category: 'electrical', icon: 'fa-temperature-high', rating: 4.7, reviews: 720, eta: '20–25 min', availability: 'Available Now', featured: false, badge: null, color: '#FF6B00', image: Images.geyserRepair, shortDesc: 'Instant & storage geyser repair for all brands.', details: 'Fix water heater issues like no hot water, leaking, slow heating, or strange noises.', includes: ['Heating element repair', 'Thermostat fixing', 'Leak repair', 'Full service'] },
  { id: 6, name: 'Solar Panel Installation', category: 'electrical', icon: 'fa-solar-panel', rating: 4.9, reviews: 340, eta: '2–3 hours', availability: 'Scheduled', featured: true, badge: 'Eco Friendly', color: '#FF6B00', image: Images.solarPanel, shortDesc: 'Solar panel installation for homes & businesses.', details: 'Complete solar solution including panels, inverter, battery, and grid connection.', includes: ['Site survey', 'Panel installation', 'Inverter setup', 'Net metering'] },
  { id: 7, name: 'Smart Home Automation', category: 'electrical', icon: 'fa-microchip', rating: 4.8, reviews: 290, eta: '1–2 hours', availability: 'Scheduled', featured: true, badge: 'New', color: '#FF6B00', image: Images.smartHomeAuto, shortDesc: 'Smart lights, fans, switches & voice control setup.', details: 'Upgrade your home with Alexa/Google Home compatible smart devices.', includes: ['Smart switch install', 'Voice control setup', 'Automation config', 'WiFi integration'] },
  { id: 8, name: 'Short Circuit Repair', category: 'electrical', icon: 'fa-triangle-exclamation', rating: 4.9, reviews: 1100, eta: '15–20 min', availability: 'Emergency', featured: true, badge: 'Emergency', color: '#FF6B00', image: Images.shortCircuit, shortDesc: 'Emergency short circuit & earthing solution.', details: 'Immediate response for short circuits, earthing issues, and tripping MCBs.', includes: ['Short circuit fix', 'Earthing check', 'MCB replacement', 'Wiring audit'] },
  { id: 9, name: 'Plumbing', category: 'plumbing', icon: 'fa-droplet', rating: 4.8, reviews: 1870, eta: '20–25 min', availability: 'Available Now', featured: false, badge: null, color: '#0f8bff', image: Images.plumbing, shortDesc: 'Expert plumbers for leaks, pipe repairs, installation & drainage.', details: 'From dripping faucets to full bathroom plumbing, our experts fix it right.', includes: ['Leak detection', 'Drain cleaning', 'Pipe installation', 'Water heater service'] },
  { id: 10, name: 'Tap & Faucet Repair', category: 'plumbing', icon: 'fa-faucet', rating: 4.7, reviews: 980, eta: '10–15 min', availability: 'Available Now', featured: false, badge: null, color: '#0f8bff', image: Images.tapFaucet, shortDesc: 'Dripping tap, faucet replacement & mixer repair.', details: 'Stop water wastage with quick tap and faucet repair services.', includes: ['Tap washer change', 'Faucet replacement', 'Mixer repair', 'Handle fixing'] },
  { id: 11, name: 'Toilet & Commode Repair', category: 'plumbing', icon: 'fa-toilet', rating: 4.8, reviews: 1250, eta: '20–25 min', availability: 'Available Now', featured: false, badge: null, color: '#0f8bff', image: Images.toiletRepair, shortDesc: 'Flush repair, tank leakage, commode installation.', details: 'Fix all toilet issues including running water, clogged flush, and cracked tanks.', includes: ['Flush repair', 'Tank leakage fix', 'Commode install', 'Clog removal'] },
  { id: 12, name: 'Drainage & Sewage Cleaning', category: 'plumbing', icon: 'fa-sink', rating: 4.6, reviews: 840, eta: '25–30 min', availability: 'Available Now', featured: false, badge: null, color: '#0f8bff', image: Images.drainClean, shortDesc: 'Blocked drain, sewage line & gutter cleaning.', details: 'Heavy-duty drain cleaning using modern equipment for complete unclogging.', includes: ['Drain unblock', 'Sewage line clean', 'Gutter cleaning', 'Pipe inspection'] },
  { id: 13, name: 'Bathroom Fitting', category: 'plumbing', icon: 'fa-bath', rating: 4.7, reviews: 670, eta: '30–40 min', availability: 'Available Now', featured: false, badge: null, color: '#0f8bff', image: Images.bathroomFitting, shortDesc: 'Shower, jet spray, towel rack & mirror installation.', details: 'Complete bathroom fitting and accessory installation service.', includes: ['Shower install', 'Jet spray fitting', 'Towel rack mount', 'Mirror installation'] },
  { id: 14, name: 'Water Tank Cleaning', category: 'plumbing', icon: 'fa-water', rating: 4.5, reviews: 520, eta: '45–60 min', availability: 'Scheduled', featured: false, badge: null, color: '#0f8bff', image: Images.waterTank, shortDesc: 'Overhead & underground water tank cleaning.', details: 'Professional tank cleaning with anti-bacterial treatment for safe drinking water.', includes: ['Tank scrubbing', 'Sediment removal', 'Disinfection', 'Leak check'] },
  { id: 15, name: 'Pipeline Installation', category: 'plumbing', icon: 'fa-screwdriver-wrench', rating: 4.8, reviews: 430, eta: '1–2 hours', availability: 'Scheduled', featured: false, badge: null, color: '#0f8bff', image: Images.pipeline, shortDesc: 'New pipeline installation for kitchen, bathroom & garden.', details: 'Quality PVC/CPVC pipe installation for water supply and drainage.', includes: ['Pipe fitting', 'Joints sealing', 'Pressure test', 'Layout design'] },
  { id: 16, name: 'Gas Pipe Fitting', category: 'plumbing', icon: 'fa-fire', rating: 4.9, reviews: 380, eta: '30–40 min', availability: 'Available Now', featured: true, badge: 'Safety Check', color: '#0f8bff', image: Images.gasPipe, shortDesc: 'Gas pipe installation, leak detection & safety check.', details: 'Certified gas pipe fitting with leak detection and safety certification.', includes: ['Gas pipe install', 'Leak detection', 'Regulator fitting', 'Safety test'] },
  { id: 17, name: 'AC Repair', category: 'cooling', icon: 'fa-snowflake', rating: 4.9, reviews: 3120, eta: '25–30 min', availability: 'Busy', featured: true, badge: 'Top Rated', color: '#4db8ff', image: Images.ac, shortDesc: 'AC servicing, gas refill, installation & repair by certified techs.', details: 'Complete AC solution from gas refill to compressor repair.', includes: ['Gas refill', 'Deep cleaning', 'Compressor repair', 'Installation'] },
  { id: 18, name: 'AC Installation & Uninstallation', category: 'cooling', icon: 'fa-wrench', rating: 4.8, reviews: 980, eta: '1–2 hours', availability: 'Scheduled', featured: false, badge: null, color: '#4db8ff', image: Images.acInstall, shortDesc: 'Split & window AC installation, uninstallation & relocation.', details: 'Professional AC installation with proper bracket fitting and drainage.', includes: ['AC installation', 'Uninstallation', 'Relocation', 'Bracket fitting'] },
  { id: 19, name: 'AC Gas Refill', category: 'cooling', icon: 'fa-wind', rating: 4.9, reviews: 1560, eta: '20–25 min', availability: 'Available Now', featured: false, badge: null, color: '#4db8ff', image: Images.acGas, shortDesc: 'R32, R410A, R22 gas refill for all AC types.', details: 'Quick gas top-up service with leak detection before refilling.', includes: ['Leak detection', 'Gas top-up', 'Pressure check', 'Cooling test'] },
  { id: 20, name: 'AC Deep Cleaning', category: 'cooling', icon: 'fa-broom', rating: 4.8, reviews: 2100, eta: '30–40 min', availability: 'Available Now', featured: false, badge: null, color: '#4db8ff', image: Images.acDeepClean, shortDesc: 'Complete AC disassembly, coil cleaning & filter wash.', details: 'Deep cleaning improves cooling efficiency and air quality.', includes: ['Coil cleaning', 'Filter wash', 'Blower cleaning', 'Disinfection'] },
  { id: 21, name: 'Refrigerator Repair', category: 'cooling', icon: 'fa-thermometer-half', rating: 4.7, reviews: 890, eta: '30–40 min', availability: 'Available Now', featured: false, badge: null, color: '#4db8ff', image: Images.fridgeRepair, shortDesc: 'Fridge not cooling, water leakage, ice maker repair.', details: 'All refrigerator issues fixed including compressor, thermostat, and gas leak.', includes: ['Compressor repair', 'Gas refill', 'Thermostat fix', 'Door seal replace'] },
  { id: 22, name: 'Cooler Repair & Service', category: 'cooling', icon: 'fa-fan', rating: 4.6, reviews: 540, eta: '20–25 min', availability: 'Available Now', featured: false, badge: null, color: '#4db8ff', image: Images.coolerRepair, shortDesc: 'Air cooler motor repair, pump change & pad replacement.', details: 'Get your cooler ready for summer with complete servicing.', includes: ['Motor repair', 'Pump replacement', 'Pad change', 'Full service'] },
  { id: 23, name: 'Deep Cleaning', category: 'cleaning', icon: 'fa-broom', rating: 4.7, reviews: 1560, eta: '30–35 min', availability: 'Available Now', featured: true, badge: 'Most Booked', color: '#FF8C42', image: Images.cleaning, shortDesc: 'Professional deep cleaning for homes, kitchens, bathrooms & sofas.', details: 'Eco-friendly deep cleaning for entire home.', includes: ['Kitchen degreasing', 'Bathroom sanitization', 'Sofa cleaning', 'Window cleaning'] },
  { id: 24, name: 'Sofa & Carpet Cleaning', category: 'cleaning', icon: 'fa-couch', rating: 4.8, reviews: 1120, eta: '40–50 min', availability: 'Available Now', featured: true, badge: 'Trending', color: '#FF8C42', image: Images.sofaClean, shortDesc: 'Steam cleaning for sofa, carpet & mattress.', details: 'Remove stains, dust mites, and allergens with steam cleaning.', includes: ['Sofa steam clean', 'Carpet shampoo', 'Mattress clean', 'Stain removal'] },
  { id: 25, name: 'Bathroom Cleaning', category: 'cleaning', icon: 'fa-bath', rating: 4.7, reviews: 980, eta: '20–25 min', availability: 'Available Now', featured: false, badge: null, color: '#FF8C42', image: Images.bathroomClean, shortDesc: 'Complete bathroom scrubbing, tile cleaning & sanitization.', details: 'Remove limescale, soap scum, and germs from your bathroom.', includes: ['Tile scrubbing', 'Fixture cleaning', 'Mirror polish', 'Disinfection'] },
  { id: 26, name: 'Kitchen Cleaning', category: 'cleaning', icon: 'fa-kitchen-set', rating: 4.8, reviews: 1340, eta: '25–30 min', availability: 'Available Now', featured: false, badge: null, color: '#FF8C42', image: Images.kitchenClean, shortDesc: 'Kitchen degreasing, chimney cleaning & countertop polish.', details: 'Remove grease, oil, and food stains from your kitchen.', includes: ['Degreasing', 'Chimney clean', 'Countertop polish', 'Sink clean'] },
  { id: 27, name: 'Floor Cleaning & Polishing', category: 'cleaning', icon: 'fa-border-all', rating: 4.6, reviews: 670, eta: '30–40 min', availability: 'Scheduled', featured: false, badge: null, color: '#FF8C42', image: Images.floorPolish, shortDesc: 'Marble, tile & wooden floor cleaning and polishing.', details: 'Restore shine to your floors with professional cleaning.', includes: ['Floor scrubbing', 'Polishing', 'Stain removal', 'Sealant apply'] },
  { id: 28, name: 'Window & Glass Cleaning', category: 'cleaning', icon: 'fa-window-maximize', rating: 4.7, reviews: 540, eta: '20–25 min', availability: 'Available Now', featured: false, badge: null, color: '#FF8C42', image: Images.windowClean, shortDesc: 'Streak-free window, glass door & mirror cleaning.', details: 'Professional equipment for spotless glass surfaces.', includes: ['Window clean', 'Glass door wipe', 'Mirror shine', 'Frame wipe'] },
  { id: 29, name: 'Balcony & Garden Cleaning', category: 'cleaning', icon: 'fa-tree', rating: 4.5, reviews: 320, eta: '25–30 min', availability: 'Available Now', featured: false, badge: null, color: '#FF8C42', image: Images.gardenClean, shortDesc: 'Balcony, patio & garden area cleaning.', details: 'Remove dust, leaves, and debris from outdoor areas.', includes: ['Floor wash', 'Railing wipe', 'Plant area clean', 'Debris removal'] },
  { id: 30, name: 'Water Tank Cleaning', category: 'cleaning', icon: 'fa-water', rating: 4.6, reviews: 780, eta: '45–60 min', availability: 'Scheduled', featured: false, badge: null, color: '#FF8C42', image: Images.waterTankClean, shortDesc: 'Overhead & underground tank cleaning with disinfection.', details: 'Safe drinking water with professional tank cleaning.', includes: ['Scrubbing', 'Sediment removal', 'Disinfection', 'Leak check'] },
  { id: 31, name: 'Chimney Cleaning', category: 'cleaning', icon: 'fa-smog', rating: 4.8, reviews: 890, eta: '20–25 min', availability: 'Available Now', featured: false, badge: null, color: '#FF8C42', image: Images.chimneyClean, shortDesc: 'Kitchen chimney filter & duct cleaning.', details: 'Remove grease buildup for better suction and safety.', includes: ['Filter clean', 'Duct cleaning', 'Motor check', 'Oil removal'] },
  { id: 32, name: 'Move-In / Move-Out Cleaning', category: 'cleaning', icon: 'fa-truck', rating: 4.8, reviews: 450, eta: '2–3 hours', availability: 'Scheduled', featured: false, badge: null, color: '#FF8C42', image: Images.moveClean, shortDesc: 'Complete home cleaning before moving in or out.', details: 'Deep clean every corner of your home for new occupants.', includes: ['Full home deep clean', 'Cabinet wipe', 'Appliance clean', 'Floor wash'] },
  { id: 33, name: 'Appliance Repair', category: 'appliance', icon: 'fa-blender', rating: 4.8, reviews: 2100, eta: '20–25 min', availability: 'Available Now', featured: false, badge: null, color: '#FF6E4A', image: Images.appliance, shortDesc: 'Repair for all home appliances.', details: 'Expert repair for all major appliances with genuine parts.', includes: ['Diagnosis', 'Parts replacement', 'Testing', 'Warranty'] },
  { id: 34, name: 'Washing Machine Repair', category: 'appliance', icon: 'fa-jug-detergent', rating: 4.8, reviews: 1670, eta: '25–30 min', availability: 'Available Now', featured: true, badge: 'Popular', color: '#FF6E4A', image: Images.washingMachine, shortDesc: 'Front load & top load washing machine repair.', details: 'Fix draining issues, noise, not spinning, or water leakage.', includes: ['Motor repair', 'Drum fix', 'Drain pump', 'PCB repair'] },
  { id: 35, name: 'Refrigerator Repair', category: 'appliance', icon: 'fa-icicles', rating: 4.7, reviews: 1430, eta: '30–40 min', availability: 'Available Now', featured: false, badge: null, color: '#FF6E4A', image: Images.fridgeRepairApp, shortDesc: 'Single door, double door & side-by-side fridge repair.', details: 'Fix cooling issues, water leakage, ice maker problems.', includes: ['Compressor check', 'Gas refill', 'Thermostat fix', 'Door seal'] },
  { id: 36, name: 'Microwave Repair', category: 'appliance', icon: 'fa-fire-burner', rating: 4.7, reviews: 890, eta: '20–25 min', availability: 'Available Now', featured: false, badge: null, color: '#FF6E4A', image: Images.microwaveRepair, shortDesc: 'Solo, grill & convection microwave repair.', details: 'Fix not heating, sparking, turntable issues, or display problems.', includes: ['Magnetron fix', 'Diode replace', 'Turntable motor', 'Panel repair'] },
  { id: 37, name: 'TV Repair', category: 'appliance', icon: 'fa-tv', rating: 4.6, reviews: 720, eta: '30–40 min', availability: 'Available Now', featured: false, badge: null, color: '#FF6E4A', image: Images.tvRepair, shortDesc: 'LED, LCD, Smart TV & OLED repair.', details: 'Fix display issues, sound problems, power failure, or motherboard issues.', includes: ['Screen repair', 'Motherboard fix', 'Power supply', 'Software update'] },
  { id: 38, name: 'Water Purifier Repair', category: 'appliance', icon: 'fa-filter', rating: 4.8, reviews: 950, eta: '20–25 min', availability: 'Available Now', featured: false, badge: null, color: '#FF6E4A', image: Images.waterPurifierRepair, shortDesc: 'RO, UV & UF water purifier service and repair.', details: 'Fix leaking, slow flow, bad taste, or no power issues.', includes: ['Filter change', 'Membrane replace', 'Leak fix', 'Full service'] },
  { id: 39, name: 'Geyser Repair', category: 'appliance', icon: 'fa-temperature-high', rating: 4.7, reviews: 680, eta: '20–25 min', availability: 'Available Now', featured: false, badge: null, color: '#FF6E4A', image: Images.geyserRepairApp, shortDesc: 'Instant & storage water heater repair.', details: 'Fix no hot water, leakage, slow heating, or thermostat issues.', includes: ['Element change', 'Thermostat fix', 'Leak repair', 'Safety valve'] },
  { id: 40, name: 'Chimney Repair', category: 'appliance', icon: 'fa-wind', rating: 4.7, reviews: 560, eta: '20–25 min', availability: 'Available Now', featured: false, badge: null, color: '#FF6E4A', image: Images.chimneyRepair, shortDesc: 'Kitchen chimney motor, filter & control panel repair.', details: 'Fix suction issues, noise, or auto-clean problems.', includes: ['Motor repair', 'Filter change', 'Panel fix', 'Deep clean'] },
  { id: 41, name: 'Inverter Repair', category: 'appliance', icon: 'fa-bolt', rating: 4.6, reviews: 490, eta: '25–30 min', availability: 'Available Now', featured: false, badge: null, color: '#FF6E4A', image: Images.inverterRepairApp, shortDesc: 'Home inverter & UPS repair and battery replacement.', details: 'Fix inverter not charging, beeping, or short backup issues.', includes: ['PCB repair', 'Battery check', 'Fan fix', 'Full service'] },
  { id: 42, name: 'Vacuum Cleaner Repair', category: 'appliance', icon: 'fa-broom-ball', rating: 4.6, reviews: 340, eta: '20–25 min', availability: 'Available Now', featured: false, badge: null, color: '#FF6E4A', image: Images.vacuumCleaner, shortDesc: 'All brands vacuum cleaner repair and service.', details: 'Fix suction loss, motor issues, or broken parts.', includes: ['Motor fix', 'Filter clean', 'Belt replace', 'Full service'] },
  { id: 43, name: 'Painting', category: 'painting', icon: 'fa-paintbrush', rating: 4.7, reviews: 980, eta: '35–40 min', availability: 'Scheduled', featured: false, badge: null, color: '#FFB347', image: Images.painting, shortDesc: 'Interior & exterior painting with premium finishes.', details: 'Transform your space with professional painting.', includes: ['Interior paint', 'Exterior paint', 'Texture finish', 'Waterproofing'] },
  { id: 44, name: 'Wallpaper Installation', category: 'painting', icon: 'fa-palette', rating: 4.8, reviews: 430, eta: '1–2 hours', availability: 'Scheduled', featured: false, badge: null, color: '#FFB347', image: Images.wallpaperInstall, shortDesc: 'Designer wallpaper installation & removal.', details: 'Professional wallpaper application with bubble-free finish.', includes: ['Wall prep', 'Wallpaper paste', 'Seam matching', 'Old removal'] },
  { id: 45, name: 'Texture Painting', category: 'painting', icon: 'fa-brush', rating: 4.8, reviews: 290, eta: '2–3 hours', availability: 'Scheduled', featured: false, badge: null, color: '#FFB347', image: Images.texturePaint, shortDesc: 'Designer texture & stucco painting for walls.', details: 'Give your walls a modern, luxurious texture finish.', includes: ['Design consultation', 'Texture apply', 'Stucco finish', 'Sealant coat'] },
  { id: 46, name: 'Waterproofing', category: 'painting', icon: 'fa-shield', rating: 4.7, reviews: 560, eta: '2–3 hours', availability: 'Scheduled', featured: false, badge: null, color: '#FFB347', image: Images.waterproofingPaint, shortDesc: 'Wall, terrace & bathroom waterproofing solution.', details: 'Stop wall dampness and water leakage permanently.', includes: ['Crack fill', 'Waterproof coat', 'Terrace treatment', 'Bathroom seal'] },
  { id: 47, name: 'Furniture Polishing', category: 'painting', icon: 'fa-chair', rating: 4.6, reviews: 380, eta: '1–2 hours', availability: 'Scheduled', featured: false, badge: null, color: '#FFB347', image: Images.furniturePolish, shortDesc: 'Wooden furniture polishing & restoration.', details: 'Restore old furniture shine with professional polishing.', includes: ['Sanding', 'Putty fill', 'Polish apply', 'Buff finish'] },
  { id: 48, name: 'Wall Crack & Plaster Repair', category: 'painting', icon: 'fa-grip-lines', rating: 4.7, reviews: 620, eta: '1–2 hours', availability: 'Scheduled', featured: false, badge: null, color: '#FFB347', image: Images.wallCrackRepair, shortDesc: 'Wall crack filling, plastering & putty work.', details: 'Fix wall cracks and uneven surfaces before painting.', includes: ['Crack filling', 'Plaster repair', 'Putty apply', 'Surface smooth'] },
  { id: 49, name: 'CCTV Installation', category: 'security', icon: 'fa-camera', rating: 4.8, reviews: 760, eta: '30–40 min', availability: 'Available Now', featured: true, badge: 'New', color: '#0f8bff', image: Images.cctv, shortDesc: 'HD CCTV cameras, DVR setup & remote monitoring.', details: 'Complete security system installation for home & office.', includes: ['Camera install', 'DVR config', 'Remote access', 'Cabling'] },
  { id: 50, name: 'Smart Door Lock Installation', category: 'security', icon: 'fa-door-open', rating: 4.9, reviews: 340, eta: '30–40 min', availability: 'Available Now', featured: false, badge: null, color: '#0f8bff', image: Images.smartLock, shortDesc: 'Biometric, PIN & WiFi smart lock installation.', details: 'Upgrade your home security with smart locks.', includes: ['Lock fitting', 'App setup', 'Fingerprint config', 'Key backup'] },
  { id: 51, name: 'Video Doorbell Installation', category: 'security', icon: 'fa-door-closed', rating: 4.8, reviews: 280, eta: '20–25 min', availability: 'Available Now', featured: false, badge: null, color: '#0f8bff', image: Images.videoDoorbell, shortDesc: 'Smart video doorbell with camera & two-way audio.', details: 'See and speak to visitors from your phone.', includes: ['Doorbell install', 'App config', 'Motion setup', 'WiFi connect'] },
  { id: 52, name: 'Security Alarm Installation', category: 'security', icon: 'fa-bell', rating: 4.7, reviews: 210, eta: '30–40 min', availability: 'Scheduled', featured: false, badge: null, color: '#0f8bff', image: Images.securityAlarm, shortDesc: 'Burglar alarm, PIR sensor & magnetic contact installation.', details: 'Protect your home from intruders with alarm systems.', includes: ['Sensor install', 'Control panel', 'Mobile alert', 'Battery backup'] },
  { id: 53, name: 'Intercom Installation', category: 'security', icon: 'fa-phone', rating: 4.6, reviews: 190, eta: '30–40 min', availability: 'Scheduled', featured: false, badge: null, color: '#0f8bff', image: Images.intercom, shortDesc: 'Wired & wireless intercom system installation.', details: 'Easy communication between rooms or main gate.', includes: ['Unit install', 'Wiring', 'Testing', 'User training'] },
  { id: 54, name: 'Pest Control', category: 'pest', icon: 'fa-bug', rating: 4.6, reviews: 1240, eta: '40–50 min', availability: 'Available Now', featured: false, badge: null, color: '#FF6B00', image: Images.pest, shortDesc: 'Safe pest treatments for cockroaches, termites & rodents.', details: 'Eco-friendly pest control safe for family and pets.', includes: ['General pest spray', 'Termite treatment', 'Rodent control', 'Bed bug treat'] },
  { id: 55, name: 'Cockroach Treatment', category: 'pest', icon: 'fa-biohazard', rating: 4.7, reviews: 890, eta: '20–25 min', availability: 'Available Now', featured: false, badge: null, color: '#FF6B00', image: Images.cockroach, shortDesc: 'Gel & spray treatment for complete cockroach elimination.', details: 'German cockroach treatment with long-lasting gel.', includes: ['Gel application', 'Spray treatment', 'Nest removal', 'Prevention tips'] },
  { id: 56, name: 'Termite Treatment', category: 'pest', icon: 'fa-tree', rating: 4.8, reviews: 670, eta: '1–2 hours', availability: 'Scheduled', featured: false, badge: null, color: '#FF6B00', image: Images.termite, shortDesc: 'Pre-construction & post-construction termite control.', details: 'Protect your wooden furniture and structure from termites.', includes: ['Chemical treatment', 'Soil injection', 'Wood injection', 'Annual warranty'] },
  { id: 57, name: 'Bed Bug Treatment', category: 'pest', icon: 'fa-bed', rating: 4.6, reviews: 540, eta: '30–40 min', availability: 'Available Now', featured: false, badge: null, color: '#FF6B00', image: Images.bedBug, shortDesc: 'Steam & chemical treatment for bed bugs.', details: 'Eliminate bed bugs from mattress, sofa, and cracks.', includes: ['Inspection', 'Steam treatment', 'Chemical spray', 'Follow-up visit'] },
  { id: 58, name: 'Mosquito Control', category: 'pest', icon: 'fa-mosquito', rating: 4.7, reviews: 720, eta: '20–25 min', availability: 'Available Now', featured: false, badge: null, color: '#FF6B00', image: Images.mosquito, shortDesc: 'Mosquito fogging & larvae control treatment.', details: 'Reduce mosquito population around your home.', includes: ['Fogging', 'Larvae control', 'Breeding check', 'Prevention advice'] },
  { id: 59, name: 'Rodent Control', category: 'pest', icon: 'fa-bug', rating: 4.7, reviews: 480, eta: '30–40 min', availability: 'Available Now', featured: false, badge: null, color: '#FF6B00', image: Images.rodent, shortDesc: 'Rat & mouse trapping and proofing service.', details: 'Complete rodent elimination with bait stations.', includes: ['Trapping', 'Bait station', 'Entry sealing', 'Cleanup'] },
  { id: 60, name: 'Carpentry', category: 'all', icon: 'fa-hammer', rating: 4.7, reviews: 890, eta: '30–40 min', availability: 'Available Now', featured: false, badge: null, color: '#FFB347', image: Images.carpentryWork, shortDesc: 'Furniture repair, door fixing & custom woodwork.', details: 'Expert carpenters for all your woodwork needs.', includes: ['Furniture repair', 'Door fixing', 'Cabinet install', 'Custom work'] },
  { id: 61, name: 'Locksmith', category: 'all', icon: 'fa-key', rating: 4.8, reviews: 620, eta: '15–20 min', availability: 'Emergency', featured: true, badge: 'Emergency', color: '#FF6B00', image: Images.locksmithService, shortDesc: 'Lockout service, key replacement & lock repair.', details: '24/7 emergency locksmith service for homes.', includes: ['Lockout help', 'Key making', 'Lock repair', 'Security advice'] },
  { id: 62, name: 'WiFi & Network Setup', category: 'all', icon: 'fa-wifi', rating: 4.8, reviews: 450, eta: '20–25 min', availability: 'Available Now', featured: false, badge: null, color: '#0f8bff', image: Images.wifiSetup, shortDesc: 'Router setup, WiFi extenders & network cabling.', details: 'Get fast, reliable WiFi throughout your home.', includes: ['Router config', 'Extender setup', 'Cabling', 'Speed test'] },
  { id: 63, name: 'Furniture Assembly', category: 'all', icon: 'fa-cube', rating: 4.7, reviews: 780, eta: '30–40 min', availability: 'Available Now', featured: false, badge: null, color: '#FFB347', image: Images.furnitureAssembly, shortDesc: 'DIY furniture assembly from IKEA, Amazon, Flipkart.', details: 'Professional assembly of flat-pack furniture.', includes: ['Unpacking', 'Assembly', 'Mounting', 'Area cleanup'] },
  { id: 64, name: 'Glass & Mirror Repair', category: 'all', icon: 'fa-glass-water', rating: 4.6, reviews: 310, eta: '20–25 min', availability: 'Available Now', featured: false, badge: null, color: '#4db8ff', image: Images.glassMirror, shortDesc: 'Broken glass, mirror & glass door replacement.', details: 'Quick glass replacement for windows, doors, and tables.', includes: ['Glass cutting', 'Frame fitting', 'Mirror install', 'Silicone seal'] },
];

/* ─────────────── HELPERS ─────────────── */
const Stars = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="srv-stars">
      {[...Array(full)].map((_, i) => <i key={i} className="fas fa-star" />)}
      {half && <i className="fas fa-star-half-stroke" />}
      {[...Array(5 - full - (half ? 1 : 0))].map((_, i) => <i key={`e${i}`} className="far fa-star" />)}
    </span>
  );
};

/* ─────────────── MODAL ─────────────── */
const ServiceModal = ({ service, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div className="srv-modal-overlay" onClick={onClose}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="srv-modal"
          onClick={e => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.88, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 40 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}>
          {/* Modal content remains same */}
          <div className="srv-modal-img-wrap">
            <img src={service.image} alt={service.name} className="srv-modal-img" />
            <div className="srv-modal-img-overlay" style={{ background: `linear-gradient(to top, ${service.color}55, transparent)` }} />
            {service.badge && <span className="srv-modal-badge" style={{ background: service.color }}>{service.badge}</span>}
          </div>
          <div className="srv-modal-body">
            <div className="srv-modal-header">
              <div className="srv-modal-icon" style={{ background: `${service.color}22`, color: service.color }}>
                <i className={`fas ${service.icon}`} />
              </div>
              <div>
                <h2 className="srv-modal-title">{service.name}</h2>
                <div className="srv-modal-meta">
                  <Stars rating={service.rating} />
                  <span>{service.rating} ({service.reviews.toLocaleString()} reviews)</span>
                </div>
              </div>
              <button className="srv-modal-close" onClick={onClose}><i className="fas fa-xmark" /></button>
            </div>
            <p className="srv-modal-desc">{service.details}</p>
            <div className="srv-modal-includes">
              <h4>What's Included</h4>
              <ul>
                {service.includes.map((item, i) => (
                  <li key={i}><i className="fas fa-check-circle" style={{ color: service.color }} /> {item}</li>
                ))}
              </ul>
            </div>
            <div className="srv-modal-info-row">
              <div className="srv-modal-info-chip"><i className="fas fa-clock" /> ETA: {service.eta}</div>
              <div className={`srv-modal-info-chip avail-${service.availability === 'Available Now' ? 'yes' : service.availability === 'Busy' ? 'busy' : 'sch'}`}>
                <i className={`fas ${service.availability === 'Available Now' ? 'fa-circle-check' : service.availability === 'Busy' ? 'fa-circle-exclamation' : 'fa-calendar-check'}`} />
                {service.availability}
              </div>
            </div>
            <div className="srv-modal-actions">
              <button className="srv-btn-book" style={{ background: `linear-gradient(135deg, ${service.color}, #FF8C42)` }}>
                <i className="fas fa-bolt" /> Book Now
              </button>
              <button className="srv-btn-secondary" onClick={onClose}>Close</button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ─────────────── CARD ─────────────── */
const ServiceCard = ({ service, onDetails, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`srv-card${service.featured ? ' srv-card--featured' : ''}`}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
      transition={{ duration: 0.36, ease: 'easeOut', delay: Math.min(index * 0.035, 0.4) }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      layout
      style={{ '--accent': service.color }}
    >
      <div className="srv-card-img-wrap">
        <img src={service.image} alt={service.name} className={`srv-card-img${hovered ? ' srv-card-img--zoom' : ''}`} />
        <div className="srv-card-img-overlay" />
        {service.badge && (
          <span className="srv-card-ribbon" style={{ background: service.color }}>
            {service.badge}
          </span>
        )}
        <div className="srv-card-avail" data-status={
          service.availability === 'Available Now' ? 'yes' :
            service.availability === 'Busy' ? 'busy' : 'sch'
        }>
          <span className="avail-dot" />
          {service.availability}
        </div>
      </div>
      <div className="srv-card-body">
        <div className="srv-card-top">
          <div className="srv-card-icon-wrap" style={{ background: `${service.color}18`, color: service.color }}>
            <i className={`fas ${service.icon}`} />
          </div>
          <div className="srv-card-meta-right">
            <div className="srv-card-rating">
              <Stars rating={service.rating} />
              <span>{service.rating}</span>
              <span className="srv-card-reviews">({service.reviews.toLocaleString()})</span>
            </div>
            <div className="srv-card-eta"><i className="fas fa-clock" /> {service.eta}</div>
          </div>
        </div>
        <h3 className="srv-card-name">{service.name}</h3>
        <p className="srv-card-desc">{service.shortDesc}</p>
        <div className="srv-card-actions">
          <button className="srv-btn-details" onClick={() => onDetails(service)}>
            <i className="fas fa-info-circle" /> Details
          </button>
          <button className="srv-btn-book-sm" style={{ background: `linear-gradient(135deg, ${service.color}, #FF8C42)` }}>
            <i className="fas fa-bolt" /> Book Now
          </button>
        </div>
      </div>
      <div className="srv-card-glow" style={{ boxShadow: `0 0 28px ${service.color}40` }} />
    </motion.div>
  );
};

/* ─────────────── PAGE ─────────────── */
export const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [availFilter, setAvailFilter] = useState('all');
  const [modalService, setModalService] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('serviceSearchQuery');
    if (stored) {
      setSearchQuery(stored);
      sessionStorage.removeItem('serviceSearchQuery');
      setTimeout(() => searchRef.current?.focus(), 300);
    }
  }, []);

  const filtered = SERVICES.filter(s => {
    const catMatch = activeCategory === 'all' || s.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const searchMatch = !q ||
      s.name.toLowerCase().includes(q) ||
      s.shortDesc.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q);
    const availMatch = availFilter === 'all' || s.availability === availFilter;
    return catMatch && searchMatch && availMatch;
  });

  const hasFilters = searchQuery || activeCategory !== 'all' || availFilter !== 'all';

  const clearAll = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setAvailFilter('all');
  };

  return (
    <div className="srv-page">
      <div className="srv-bg-orb srv-bg-orb--1" />
      <div className="srv-bg-orb srv-bg-orb--2" />

      {/* Header Section */}
      <section className="srv-header-section">
        <motion.div
          className="srv-header-inner"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
        </motion.div>
      </section>

      {/* Main Layout */}
      <div className="srv-layout">

      {/* Mobile Filter Toggle Button - Fixed at bottom */}
        <button
          className="srv-mobile-filter-btn"
          onClick={() => setMobileSidebarOpen(prev => !prev)}
        >
          <i className={`fas ${mobileSidebarOpen ? 'fa-times' : 'fa-sliders-h'}`} />
          {hasFilters && !mobileSidebarOpen && <span className="srv-filter-dot" />}
        </button>

        {/* Mobile Overlay */}
        {mobileSidebarOpen && (
          <div className="srv-mobile-overlay" onClick={() => setMobileSidebarOpen(false)} />
        )}

        {/* LEFT SIDEBAR - Fixed Position */}
        <aside
          className={`srv-sidebar ${mobileSidebarOpen ? 'srv-sidebar--open' : ''}`}
        >
          <div className="srv-sidebar-sticky">
            <div className="srv-sidebar-top-label">
              <span><i className="fas fa-sliders-h" /> Filters</span>
              <button
                className="srv-sidebar-close-btn"
                onClick={() => setMobileSidebarOpen(false)}
                aria-label="Close filters"
              >
                <i className="fas fa-xmark" />
              </button>
            </div>

            {/* Search */}
            <div className="srv-sidebar-block">
              <div className="srv-sidebar-block-title">Search</div>
              <div className="srv-sb-search-wrap">
                <i className="fas fa-search srv-sb-search-icon" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setActiveCategory('all'); }}
                  className="srv-sb-search-input"
                />
                {searchQuery && (
                  <button className="srv-sb-search-clear" onClick={() => setSearchQuery('')}>
                    <i className="fas fa-times" />
                  </button>
                )}
              </div>
            </div>

            <div className="srv-sb-divider" />

            {/* Categories - Scrollable */}
            <div className="srv-sidebar-block srv-sidebar-block--scroll">
              <div className="srv-sidebar-block-title">Categories</div>
              <div className="srv-sb-cats">
                {CATEGORIES.map(cat => (
                  <motion.button
                    key={cat.id}
                    className={`srv-sb-cat ${activeCategory === cat.id ? 'srv-sb-cat--active' : ''}`}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setSearchQuery('');
                      setMobileSidebarOpen(false);
                    }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="srv-sb-cat-icon">
                      <i className={`fas ${cat.icon}`} />
                    </span>
                    <span className="srv-sb-cat-label">{cat.label}</span>
                    {activeCategory === cat.id && (
                      <motion.span className="srv-sb-cat-check" layoutId="activeCheck">
                        <i className="fas fa-check" />
                      </motion.span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="srv-sb-divider" />

            {/* Availability */}
            <div className="srv-sidebar-block">
              <div className="srv-sidebar-block-title">Availability</div>
              <div className="srv-sb-avail">
                {AVAILABILITY_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    className={`srv-sb-avail-chip ${availFilter === opt.id ? 'srv-sb-avail-chip--active' : ''}`}
                    onClick={() => setAvailFilter(opt.id)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {hasFilters && (
              <>
                <div className="srv-sb-divider" />
                <div className="srv-sidebar-block">
                  <motion.button
                    className="srv-sb-clear-btn"
                    onClick={clearAll}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fas fa-undo-alt" /> Clear All Filters
                  </motion.button>
                </div>
              </>
            )}

            <div className="srv-sb-divider" />

            {/* Stats */}
            <div className="srv-sb-stats">
              <div className="srv-sb-stat">
                <span className="srv-sb-stat-num">{filtered.length}</span>
                <span className="srv-sb-stat-lbl">Results</span>
              </div>
              <div className="srv-sb-stat-sep" />
              <div className="srv-sb-stat">
                <span className="srv-sb-stat-num">64</span>
                <span className="srv-sb-stat-lbl">Total</span>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN CONTENT */}
        <main className="srv-main">
          <div className="srv-main-topbar">
            <div className="srv-main-title-group">
              <h2 className="srv-main-title">Available Services</h2>
              <span className="srv-main-count">
                {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                {searchQuery && <> for "<strong>{searchQuery}</strong>"</>}
              </span>
            </div>
            {hasFilters && (
              <motion.button
                className="srv-clear-filters"
                onClick={clearAll}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <i className="fas fa-times-circle" /> Clear
              </motion.button>
            )}
          </div>

          {/* Cards Grid */}
          {filtered.length > 0 ? (
            <motion.div className="srv-grid" layout>
              <AnimatePresence mode="popLayout">
                {filtered.map((service, i) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onDetails={setModalService}
                    index={i}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              className="srv-empty"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <i className="fas fa-search-minus" />
              <h3>No services found</h3>
              <p>Try adjusting your filters or search term.</p>
              <button
                className="srv-btn-book-sm"
                style={{ background: 'linear-gradient(135deg,#FF6B00,#FF8C42)', marginTop: '1rem' }}
                onClick={clearAll}
              >
                Browse All Services
              </button>
            </motion.div>
          )}

          {/* FOOTER - Inside right main content */}
          <footer className="srv-footer">
            <div className="srv-footer-trust">
              {[
                { icon: 'fa-shield-alt', label: 'Verified Experts', sub: 'Background checked & insured' },
                { icon: 'fa-star', label: '4.9★ Avg Rating', sub: 'From 50,000+ reviews' },
                { icon: 'fa-bolt', label: 'Same-Day Service', sub: 'Book in under 60 seconds' },
                { icon: 'fa-headset', label: '24/7 Support', sub: 'Always here to help' },
                { icon: 'fa-undo', label: '100% Satisfaction', sub: 'Money-back guarantee' },
              ].map((t, i) => (
                <motion.div key={i} className="srv-footer-trust-item"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}>
                  <div className="srv-footer-trust-icon">
                    <i className={`fas ${t.icon}`} />
                  </div>
                  <div>
                    <div className="srv-footer-trust-label">{t.label}</div>
                    <div className="srv-footer-trust-sub">{t.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </footer>
        </main>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalService && (
          <ServiceModal service={modalService} onClose={() => setModalService(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};