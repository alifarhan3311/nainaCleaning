import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import {
  ArrowRight, CheckCircle, Phone, Star, Shield, Leaf,
  Clock, Award, BadgeCheck, Users, MapPin, ChevronDown,
  Home, Building2, Sparkles, Wind, Sun, Wrench,
  CalendarCheck, ThumbsUp, Mail, ChevronRight, Sparkle,
} from 'lucide-react';

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const RESIDENTIAL_SERVICES = [
  {
    id: 'r1',
    icon: Home,
    title: 'Standard Home Cleaning',
    badge: 'Most Popular',
    tagline: 'Regular maintenance for a spotless home',
    description: 'Our standard cleaning covers all the essentials — dusting, vacuuming, mopping, bathroom sanitization, and kitchen cleaning. Perfect for weekly or bi-weekly schedules.',
    includes: [
      'All bedrooms dusted & vacuumed',
      'Bathrooms fully sanitized',
      'Kitchen surfaces & appliance exteriors',
      'Living areas vacuumed & mopped',
      'Trash removal throughout',
      'Window sills & baseboards wiped',
    ],
    ideal: 'Families, homeowners, renters',
    freq: 'Weekly / Bi-weekly / Monthly',
    color: '#1e3a5f',
    iconColor: '#60a5fa',
  },
  {
    id: 'r2',
    icon: Sparkles,
    title: 'Deep Home Cleaning',
    badge: 'Thorough',
    tagline: 'Top-to-bottom intensive clean',
    description: 'A comprehensive deep clean targeting every corner — inside appliances, behind furniture, grout scrubbing, and detailed sanitization. Ideal for seasonal or first-time cleans.',
    includes: [
      'Inside oven, fridge & microwave',
      'Cabinet interiors wiped down',
      'Grout & tile scrubbing',
      'Behind & under all furniture',
      'Interior windows & tracks cleaned',
      'Full bathroom descaling',
    ],
    ideal: 'First-time clients, seasonal refresh',
    freq: 'One-time / Quarterly',
    color: '#3d2914',
    iconColor: '#fb923c',
  },
  {
    id: 'r3',
    icon: Wind,
    title: 'Move-In / Move-Out Cleaning',
    badge: 'Specialized',
    tagline: 'Fresh start for every transition',
    description: "Whether you're moving in or out, we leave the property spotless. We handle everything from top to bottom so you get your deposit back or start fresh in a clean space.",
    includes: [
      'Full interior deep clean',
      'Inside all cabinets & drawers',
      'Appliances cleaned inside & out',
      'Walls spot-cleaned',
      'All floors scrubbed & polished',
      'Garage & storage area swept',
    ],
    ideal: 'Tenants, landlords, property managers',
    freq: 'One-time',
    color: '#0d3d2d',
    iconColor: '#4ade80',
  },
  {
    id: 'r4',
    icon: CalendarCheck,
    title: 'Recurring Maid Service',
    badge: 'Best Value',
    tagline: 'Consistent cleanliness, hassle-free',
    description: "Subscribe to a regular cleaning schedule and never worry about your home again. Same trusted cleaner every visit, tailored to your home's specific needs.",
    includes: [
      'Dedicated assigned cleaner',
      'Customized cleaning checklist',
      'Priority scheduling',
      'Flexible rescheduling',
      'Progress reports & communication',
      'Discounted recurring rates',
    ],
    ideal: 'Busy professionals, families',
    freq: 'Weekly / Bi-weekly',
    color: '#2d1f4d',
    iconColor: '#c084fc',
  },
];

const COMMERCIAL_SERVICES = [
  {
    id: 'c1',
    icon: Building2,
    title: 'Office Cleaning',
    badge: 'Core Service',
    tagline: 'Professional spaces, professional results',
    description: 'Regular and thorough cleaning to maintain a professional environment. We work around your office hours with minimal disruption — evenings, weekends, or early mornings.',
    includes: [
      'Workstations & desks sanitized',
      'Common areas vacuumed & mopped',
      'Kitchenette & break room cleaned',
      'Washrooms fully sanitized',
      'Trash & recycling emptied',
      'Reception & lobby maintained',
    ],
    ideal: 'Corporate offices, startups, law firms',
    freq: 'Daily / Weekly / Custom',
    color: '#1e3a5f',
    iconColor: '#60a5fa',
  },
  {
    id: 'c2',
    icon: Wrench,
    title: 'Janitorial Services',
    badge: 'Comprehensive',
    tagline: 'Full-service facility maintenance',
    description: 'Complete day-porter and janitorial programs for commercial facilities. Our trained staff maintain your building throughout the day — restrooms, common areas, and more.',
    includes: [
      'Day porter & after-hours programs',
      'Restroom restocking & sanitization',
      'High-traffic area maintenance',
      'Elevator & lobby upkeep',
      'Waste management',
      'Dedicated account manager',
    ],
    ideal: 'Large facilities, malls, schools',
    freq: 'Daily / On-demand',
    color: '#3d2914',
    iconColor: '#fb923c',
  },
  {
    id: 'c3',
    icon: Sun,
    title: 'Post-Construction Cleaning',
    badge: 'Specialized',
    tagline: 'Ready for occupancy — guaranteed',
    description: 'After renovations or new builds, dust and debris are everywhere. We do a complete clean-up so your space is safe, presentable, and ready for clients or employees.',
    includes: [
      'Dust removal from all surfaces',
      'Construction debris disposal',
      'Window & frame cleaning',
      'Floor scrubbing & polishing',
      'HVAC vent dusting',
      'Final inspection walkthrough',
    ],
    ideal: 'Contractors, developers, businesses',
    freq: 'One-time / Project-based',
    color: '#0d3d2d',
    iconColor: '#4ade80',
  },
  {
    id: 'c4',
    icon: Wind,
    title: 'Carpet Steam Cleaning',
    badge: 'Deep Clean',
    tagline: 'Restore your carpets to like-new condition',
    description: 'Hot-water extraction deep cleaning removes embedded dirt, allergens, bacteria, and stains. Commercial-grade equipment for superior results — dry in 2–4 hours.',
    includes: [
      'Pre-treatment of stains & spots',
      'Hot-water extraction process',
      'Deodorizing treatment',
      'Rapid drying (2–4 hrs)',
      'High-traffic lane restoration',
      'Protective coating available',
    ],
    ideal: 'Hotels, offices, rental properties',
    freq: 'Quarterly / As needed',
    color: '#2d1f4d',
    iconColor: '#c084fc',
  },
  {
    id: 'c5',
    icon: Home,
    title: 'Floor Maintenance',
    badge: 'Floor Care',
    tagline: 'Strip, wax, and restore any floor type',
    description: 'Professional floor care including stripping, waxing, hardwood varnishing, tile & grout restoration. We keep your floors gleaming and protected year-round.',
    includes: [
      'Strip & wax VCT/vinyl floors',
      'Hardwood buffing & varnishing',
      'Tile & grout deep cleaning',
      'Marble & stone polishing',
      'Anti-slip coating',
      'Scheduled maintenance programs',
    ],
    ideal: 'Retail, healthcare, schools',
    freq: 'Monthly / Quarterly',
    color: '#3d3d1a',
    iconColor: '#facc15',
  },
  {
    id: 'c6',
    icon: Sparkles,
    title: 'Window Cleaning',
    badge: 'Crystal Clear',
    tagline: 'Streak-free inside and out',
    description: 'Interior and exterior commercial window cleaning using professional squeegee systems and eco-safe solutions. High-rise and multi-story buildings welcome.',
    includes: [
      'Interior & exterior panes',
      'Frame & sill cleaning',
      'Screen removal & cleaning',
      'High-rise rope access',
      'Storefront glass polishing',
      'Seasonal programs available',
    ],
    ideal: 'High-rises, storefronts, offices',
    freq: 'Monthly / Bi-annual',
    color: '#0d3d4d',
    iconColor: '#22d3ee',
  },
];

const PROCESS = [
  { num: '01', title: 'Free Consultation', desc: 'We assess your space, understand your specific needs, and discuss your schedule and budget.' },
  { num: '02', title: 'Custom Cleaning Plan', desc: 'We build a tailored cleaning plan with a clear scope of work — no cookie-cutter packages.' },
  { num: '03', title: 'Professional Execution', desc: 'Our certified, insured team arrives on time and completes the job to our high standards.' },
  { num: '04', title: 'Quality Inspection', desc: 'A supervisor reviews the work before we leave. Your satisfaction is our guarantee.' },
];

const FAQS = [
  { q: 'Do you bring your own cleaning supplies and equipment?', a: 'Yes — we supply all professional-grade cleaning products and commercial equipment. We use eco-certified, WHMIS-compliant products that are safe for employees, clients, and the environment.' },
  { q: 'Are your staff insured and background-checked?', a: 'Absolutely. All team members are fully insured, bonded, and have passed thorough background checks. We carry $5M liability insurance for complete peace of mind.' },
  { q: 'Can I customize which rooms or areas get cleaned?', a: "Yes. Every cleaning plan is customized. We'll discuss exactly which areas you want included, frequency, and any specific requirements during your free consultation." },
  { q: "What if I'm not satisfied with the cleaning?", a: 'We offer a 100% satisfaction guarantee. If you\'re not happy with any aspect of the service, contact us within 24 hours and we\'ll return to re-clean the area at no extra charge.' },
  { q: 'Do you offer one-time cleans or only recurring contracts?', a: 'We offer both. Whether you need a one-time deep clean, a post-construction cleanup, or a recurring weekly program — we can accommodate your needs.' },
  { q: 'How far in advance do I need to book?', a: 'We recommend booking 48–72 hours in advance. However, we do our best to accommodate urgent requests. For large commercial projects, earlier planning is recommended.' },
];

const TESTIMONIALS = [
  { name: 'Sarah M.', role: 'Office Manager', txt: 'The office cleaning team is incredible. Always on time, thorough, and they really listen to our specific needs. Our workplace has never been this clean!', rating: 5, init: 'S' },
  { name: 'David K.', role: 'Property Manager', txt: 'Used them for move-out cleaning on 3 units. Every single time, spotless results. Got all our tenant deposits back. Will continue using them.', rating: 5, init: 'D' },
  { name: 'Linda T.', role: 'Homeowner', txt: "The deep home cleaning was worth every penny. They cleaned things I didn't even think to ask for. Felt like a brand new house when they were done.", rating: 5, init: 'L' },
];

/* ══════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════ */

function AnimCounter({ target }) {
  const [val, setVal] = useState(0);
  const ref = useRef();
  const num = parseInt(target);
  const suffix = target.replace(/[0-9]/g, '');

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let cur = 0;
        const step = Math.ceil(num / 60);
        const t = setInterval(() => {
          cur += step;
          if (cur >= num) { setVal(num); clearInterval(t); }
          else setVal(cur);
        }, 20);
        obs.disconnect();
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [num]);

  return <span ref={ref}>{val}{suffix}</span>;
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-surface/20">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-5 bg-none border-none cursor-pointer text-left gap-4"
      >
        <span className="font-semibold text-white text-sm">{q}</span>
        <ChevronDown size={18} className={`text-primary flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pb-5 text-surface-muted text-sm leading-relaxed">{a}</div>
      )}
    </div>
  );
}

function ServiceCard({ svc, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1 ${hovered ? 'border-primary/30' : ''}`}
    >
      {/* Card top color block */}
      <div style={{ height: 130, background: svc.color, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ width: 64, height: 64, borderRadius: 18, background: '#0B1220', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,.3)' }}>
          <svc.icon size={30} color={svc.iconColor} strokeWidth={1.8} />
        </div>
        {svc.badge && (
          <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold rounded-full px-3 py-1 tracking-wide uppercase">
            {svc.badge}
          </div>
        )}
      </div>
      {/* Card body */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-1">{svc.title}</h3>
        <p className="text-primary text-xs font-semibold mb-3">{svc.tagline}</p>
        <p className="text-surface-muted text-sm leading-relaxed mb-4">{svc.description}</p>

        {/* Includes list */}
        <div className="bg-surface/50 rounded-xl p-4 mb-4">
          <div className="text-[11px] font-bold text-surface-muted uppercase tracking-wider mb-3">What's Included</div>
          <ul className="flex flex-col gap-2">
            {svc.includes.map(item => (
              <li key={item} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle size={14} className="text-primary flex-shrink-0 mt-0.5" /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Meta */}
        <div className="flex gap-2 flex-wrap mb-4">
          <div className="text-xs bg-teal/20 text-teal rounded-md px-3 py-1.5 font-semibold">
            {svc.ideal}
          </div>
          <div className="text-xs bg-blue-500/20 text-blue-400 rounded-md px-3 py-1.5 font-semibold">
            {svc.freq}
          </div>
        </div>

        <Link to="/contact" className={`w-full justify-center flex items-center gap-2 font-bold text-sm px-4 py-3 rounded-xl border-2 transition-all duration-200 ${hovered ? 'bg-primary border-primary text-white' : 'border-primary text-primary hover:bg-primary/10'}`}>
          Get a Free Quote <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN SERVICES PAGE
══════════════════════════════════════ */
const Services = () => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Services' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
  ];

  const residentialRef = useRef();
  const commercialRef = useRef();

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="min-h-screen bg-midnight">

      <Navbar />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(120deg, #0B1220 55%, #2c1810)', padding: '80px 0 0' }}>
        {/* BG blobs */}
        <div className="absolute top-0 right-[5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-white/5 blur-[60px]" />

        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-7 text-sm text-surface-muted">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">Services</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-end pb-16">
            <div>
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-[11px] font-bold tracking-wider uppercase mb-4">
                <Sparkle size={12} /> OUR SERVICES
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
                Residential & Commercial<br />
                <span className="text-primary">Cleaning Services</span>
              </h1>
              <p className="text-surface-muted text-lg leading-relaxed mb-8 max-w-xl">
                From spotless homes to pristine offices — we deliver professional cleaning solutions tailored to your space, schedule, and budget. Fully insured. Satisfaction guaranteed.
              </p>
              <div className="flex gap-4 flex-wrap mb-10">
                <button onClick={() => scrollTo(residentialRef)} className="btn-primary inline-flex items-center gap-2">
                  <Home size={17} /> Residential Services
                </button>
                <button onClick={() => scrollTo(commercialRef)} className="btn-secondary inline-flex items-center gap-2">
                  <Building2 size={17} /> Commercial Services
                </button>
              </div>
              {/* Trust row */}
              <div className="flex gap-6 flex-wrap">
                {[
                  { icon: Shield, t: 'Fully Insured & Bonded' },
                  { icon: Leaf, t: 'Eco-Friendly Products' },
                  { icon: BadgeCheck, t: '100% Satisfaction Guarantee' },
                ].map(item => (
                  <div key={item.t} className="flex items-center gap-2 text-surface-muted text-sm">
                    <item.icon size={15} className="text-primary" /> {item.t}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats panel */}
            <div className="glass p-8 rounded-2xl">
              <div className="text-[13px] text-surface-muted font-bold uppercase tracking-wider mb-6">Trusted By Hundreds</div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { v: '25+', l: 'Years Experience' },
                  { v: '500+', l: 'Happy Clients' },
                  { v: '50+', l: 'Team Members' },
                  { v: '98%', l: 'Satisfaction Rate' },
                ].map(s => (
                  <div key={s.l} className="glass-light rounded-xl p-4">
                    <div className="text-2xl font-black text-white"><AnimCounter target={s.v} /></div>
                    <div className="text-xs text-surface-muted mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-5">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />)}
                  <span className="text-amber-400 text-sm font-bold ml-1">5.0</span>
                </div>
                <p className="text-surface-muted text-sm leading-relaxed mb-3">"Absolutely the best cleaning service we've used. Professional, thorough, and always on time."</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center text-white font-bold text-sm">S</div>
                  <div>
                    <div className="text-white font-bold text-sm">Sarah M.</div>
                    <div className="text-surface-muted text-xs">Office Manager</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div className="bg-card border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 flex">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                  if (t.id === 'residential') scrollTo(residentialRef);
                  else if (t.id === 'commercial') scrollTo(commercialRef);
                }}
                className={`px-7 py-5 font-bold text-sm border-b-2 transition-all duration-200 ${activeTab === t.id ? 'text-primary border-primary' : 'text-surface-muted border-transparent hover:text-white'}`}
              >
                {t.label}
              </button>
            ))}
            <div className="ml-auto flex items-center">
              <a href="tel:6479736745" className="flex items-center gap-1.5 text-primary font-bold text-sm hover:text-primary-400 transition-colors">
                <Phone size={14} /> Call for Instant Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESIDENTIAL SERVICES ── */}
      <section ref={residentialRef} className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold tracking-wider uppercase mb-4">
                <Home size={12} /> RESIDENTIAL CLEANING
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">Home Cleaning Services</h2>
              <p className="text-surface-muted text-base max-w-xl leading-relaxed">
                Tailored cleaning solutions for every home — from weekly maintenance to one-time deep cleans and move-in/out services.
              </p>
            </div>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Book Home Cleaning <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {RESIDENTIAL_SERVICES.map((svc, i) => <ServiceCard key={svc.id} svc={svc} index={i} />)}
          </div>

          {/* Residential CTA strip */}
          <div className="mt-10 rounded-2xl p-8 flex items-center justify-between flex-wrap gap-6" style={{ background: 'linear-gradient(120deg, #0B1220, #1e3a5f)' }}>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Not sure which home service is right for you?</h3>
              <p className="text-surface-muted text-sm">Our team will assess your home and recommend the best plan at no cost.</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">Get Free Home Assessment <ArrowRight size={15} /></Link>
              <a href="tel:6479736745" className="btn-secondary inline-flex items-center gap-2">
                <Phone size={15} /> Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMERCIAL SERVICES ── */}
      <section ref={commercialRef} className="py-20 bg-midnight">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal text-[11px] font-bold tracking-wider uppercase mb-4">
                <Building2 size={12} /> COMMERCIAL CLEANING
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">Commercial Cleaning Services</h2>
              <p className="text-surface-muted text-base max-w-xl leading-relaxed">
                Professional cleaning programs for offices, facilities, and commercial spaces of all sizes — tailored to your operations and schedule.
              </p>
            </div>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Get Commercial Quote <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMMERCIAL_SERVICES.map((svc, i) => <ServiceCard key={svc.id} svc={svc} index={i} />)}
          </div>

          {/* Commercial CTA strip */}
          <div className="mt-10 rounded-2xl p-8 flex items-center justify-between flex-wrap gap-6 bg-gradient-to-r from-primary to-primary-700">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Ready to keep your business spotless?</h3>
              <p className="text-white/80 text-sm">Get a custom commercial cleaning plan with a free on-site walkthrough.</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-primary font-bold text-sm px-6 py-3 rounded-xl hover:bg-white/90 transition-colors">
                Get a Free Quote <ArrowRight size={15} />
              </Link>
              <a href="tel:6479736745" className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">
                <Phone size={15} /> 647-973-6745
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-bold tracking-wider uppercase mb-4">
            <BadgeCheck size={12} /> OUR PROCESS
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">How It Works</h2>
          <p className="text-surface-muted text-base max-w-xl mx-auto leading-relaxed mb-12">
            From first contact to spotless results — here's what to expect when you work with us.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((step, i) => (
              <div key={i} className="relative">
                {i < PROCESS.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-surface/30 z-0" />
                )}
                <div className="glass-card p-8 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-700 text-white flex items-center justify-center font-black text-xl mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-surface-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 bg-midnight">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal text-[11px] font-bold tracking-wider uppercase mb-4">
                <ThumbsUp size={12} /> WHY CHOOSE US
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-5">The Standard Others Get Measured Against</h2>
              <p className="text-surface-muted text-base leading-relaxed mb-8">
                We're not just another cleaning company. We're a partner invested in keeping your home or business at its best — every single visit.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: Shield, title: 'Fully Insured & Bonded', desc: '$5M liability coverage. All staff background-checked and bonded.' },
                  { icon: Leaf, title: 'Eco-Certified Products', desc: 'WHMIS-compliant, green-certified products safe for families and workplaces.' },
                  { icon: Users, title: 'Dedicated Account Manager', desc: 'One point of contact who knows your property and standards.' },
                  { icon: Clock, title: 'Flexible Scheduling', desc: 'Morning, evening, weekends — we work around your life.' },
                  { icon: Award, title: '100% Satisfaction Guarantee', desc: "Not happy? We return within 24hrs and re-clean at no charge." },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">{item.title}</div>
                      <div className="text-surface-muted text-sm leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`rounded-2xl p-6 ${i === 0 ? 'glass' : 'glass-light'}`}>
                  <div className="flex gap-1 mb-3">
                    {[...Array(t.rating)].map((_, j) => <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />)}
                  </div>
                  <p className="text-sm leading-relaxed italic mb-4" style={{ color: i === 0 ? '#dce4f0' : 'inherit' }}>"{t.txt}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center text-white font-bold text-sm">{t.init}</div>
                    <div>
                      <div className="font-bold text-white text-sm">{t.name}</div>
                      <div className="text-surface-muted text-xs">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-bold tracking-wider uppercase mb-4">
                <BadgeCheck size={12} /> FAQ
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-surface-muted text-base leading-relaxed mb-8">
                Have more questions? Our team is always happy to help. Reach out anytime.
              </p>
              <div className="flex flex-col gap-3">
                <Link to="/contact" className="btn-primary justify-center inline-flex items-center gap-2">
                  <Mail size={16} /> Send Us a Message
                </Link>
                <a href="tel:6479736745" className="btn-secondary justify-center inline-flex items-center gap-2">
                  <Phone size={16} /> Call 647-973-6745
                </a>
              </div>
              {/* Quick facts */}
              <div className="mt-8 rounded-2xl p-6" style={{ background: 'rgba(185,28,28,0.15)', border: '1px solid rgba(185,28,28,0.3)' }}>
                <div className="font-bold text-primary mb-3">Quick Facts</div>
                {[
                  '24-hour response guarantee',
                  '100% satisfaction or we return',
                  'No lock-in contracts',
                  'Same-day quotes available',
                ].map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-white mb-2">
                    <CheckCircle size={14} className="text-primary flex-shrink-0" /> {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-8">
              {FAQS.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-midnight via-card to-midnight"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal/10 rounded-full blur-[120px]"></div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-[11px] font-bold tracking-wider uppercase mb-4">
            <Sparkle size={12} /> GET STARTED TODAY
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
            Ready for a Cleaner Space?
          </h2>
          <p className="text-surface-muted text-lg max-w-xl mx-auto leading-relaxed mb-10">
            Get your free, no-obligation quote today. We'll assess your space and create a custom plan that fits your needs and budget.
          </p>
          <div className="flex justify-center gap-4 flex-wrap mb-12">
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
              Get Free Quote <ArrowRight size={18} />
            </Link>
            <a href="tel:6479736745" className="btn-secondary inline-flex items-center gap-2 text-base px-8 py-4">
              <Phone size={18} /> Call Us Now
            </a>
          </div>
          <div className="flex justify-center gap-8 flex-wrap">
            {[
              { icon: CheckCircle, t: 'No Obligation' },
              { icon: Clock, t: '24hr Response' },
              { icon: Shield, t: 'Fully Insured' },
              { icon: Award, t: 'Satisfaction Guaranteed' },
            ].map(item => (
              <div key={item.t} className="flex items-center gap-2 text-surface-muted text-sm">
                <item.icon size={16} className="text-primary" /> {item.t}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;

