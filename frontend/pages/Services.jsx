import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import {
  ArrowRight, CheckCircle, Phone, Star, Shield, Leaf,
  Clock, Award, BadgeCheck, Users, MapPin, ChevronDown,
  Home, Building2, Sparkles, Wind, Sun, Wrench,
  CalendarCheck, ThumbsUp, Mail, ChevronRight,
} from 'lucide-react';

/* ══════════════════════════════════════
   DESIGN TOKENS
══════════════════════════════════════ */
const C = {
  red: '#c0392b',
  redDark: '#96281b',
  redLight: '#fdecea',
  dark: '#1a1a2e',
  text: '#2d2d2d',
  muted: '#6b7280',
  border: '#e5e7eb',
  white: '#ffffff',
  off: '#f9fafb',
};

const container = { maxWidth: 1140, margin: '0 auto', padding: '0 24px' };

const pill = (bg = C.redLight, color = C.red) => ({
  display: 'inline-flex', alignItems: 'center', gap: 6,
  background: bg, color, borderRadius: 999,
  padding: '6px 16px', fontSize: 11, fontWeight: 700,
  letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 16,
});

const btn = (bg, color, border) => ({
  display: 'inline-flex', alignItems: 'center', gap: 8,
  background: bg, color, border: border || 'none',
  borderRadius: 8, padding: '13px 26px', fontWeight: 700,
  fontSize: 14, cursor: 'pointer', textDecoration: 'none',
  transition: 'all .18s', whiteSpace: 'nowrap',
});

const sectionTitle = {
  fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 900,
  lineHeight: 1.15, color: C.dark, margin: '0 0 14px',
};

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
    color: '#e8f0ff',
    iconColor: '#3b82f6',
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
    color: '#fff0e8',
    iconColor: '#f97316',
  },
  {
    id: 'r3',
    icon: Wind,
    title: 'Move-In / Move-Out Cleaning',
    badge: 'Specialized',
    tagline: 'Fresh start for every transition',
    description: 'Whether you\'re moving in or out, we leave the property spotless. We handle everything from top to bottom so you get your deposit back or start fresh in a clean space.',
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
    color: '#e8fff0',
    iconColor: '#22c55e',
  },
  {
    id: 'r4',
    icon: CalendarCheck,
    title: 'Recurring Maid Service',
    badge: 'Best Value',
    tagline: 'Consistent cleanliness, hassle-free',
    description: 'Subscribe to a regular cleaning schedule and never worry about your home again. Same trusted cleaner every visit, tailored to your home\'s specific needs.',
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
    color: '#f0e8ff',
    iconColor: '#a855f7',
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
    color: '#e8f0ff',
    iconColor: '#3b82f6',
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
    color: '#fff0e8',
    iconColor: '#f97316',
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
    color: '#e8fff0',
    iconColor: '#22c55e',
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
    color: '#f0e8ff',
    iconColor: '#a855f7',
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
    color: '#fff8e8',
    iconColor: '#eab308',
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
    color: '#e8f8ff',
    iconColor: '#06b6d4',
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
  { q: 'Can I customize which rooms or areas get cleaned?', a: 'Yes. Every cleaning plan is customized. We\'ll discuss exactly which areas you want included, frequency, and any specific requirements during your free consultation.' },
  { q: 'What if I\'m not satisfied with the cleaning?', a: 'We offer a 100% satisfaction guarantee. If you\'re not happy with any aspect of the service, contact us within 24 hours and we\'ll return to re-clean the area at no extra charge.' },
  { q: 'Do you offer one-time cleans or only recurring contracts?', a: 'We offer both. Whether you need a one-time deep clean, a post-construction cleanup, or a recurring weekly program — we can accommodate your needs.' },
  { q: 'How far in advance do I need to book?', a: 'We recommend booking 48–72 hours in advance. However, we do our best to accommodate urgent requests. For large commercial projects, earlier planning is recommended.' },
];

const TESTIMONIALS = [
  { name: 'Sarah M.', role: 'Office Manager', txt: 'The office cleaning team is incredible. Always on time, thorough, and they really listen to our specific needs. Our workplace has never been this clean!', rating: 5, init: 'S' },
  { name: 'David K.', role: 'Property Manager', txt: 'Used them for move-out cleaning on 3 units. Every single time, spotless results. Got all our tenant deposits back. Will continue using them.', rating: 5, init: 'D' },
  { name: 'Linda T.', role: 'Homeowner', txt: 'The deep home cleaning was worth every penny. They cleaned things I didn\'t even think to ask for. Felt like a brand new house when they were done.', rating: 5, init: 'L' },
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
    <div style={{ borderBottom: `1px solid ${C.border}` }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}
      >
        <span style={{ fontWeight: 700, fontSize: 15, color: C.dark }}>{q}</span>
        <ChevronDown size={18} color={C.red} style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
      </button>
      {open && (
        <div style={{ paddingBottom: 20, color: C.muted, fontSize: 14, lineHeight: 1.8 }}>{a}</div>
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
      style={{
        background: C.white, borderRadius: 20, overflow: 'hidden',
        border: `1px solid ${hovered ? C.red + '40' : C.border}`,
        boxShadow: hovered ? '0 16px 48px rgba(192,57,43,.12)' : '0 2px 12px rgba(0,0,0,.04)',
        transition: 'all .25s', transform: hovered ? 'translateY(-4px)' : 'none',
      }}
    >
      {/* Card top color block */}
      <div style={{ height: 130, background: svc.color, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ width: 64, height: 64, borderRadius: 18, background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,.08)' }}>
          <svc.icon size={30} color={svc.iconColor} strokeWidth={1.8} />
        </div>
        {svc.badge && (
          <div style={{ position: 'absolute', top: 14, right: 14, background: C.red, color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 999, padding: '4px 10px', letterSpacing: .8, textTransform: 'uppercase' }}>
            {svc.badge}
          </div>
        )}
      </div>
      {/* Card body */}
      <div style={{ padding: '24px 24px 20px' }}>
        <h3 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 800, color: C.dark }}>{svc.title}</h3>
        <p style={{ margin: '0 0 14px', fontSize: 12, color: C.red, fontWeight: 600 }}>{svc.tagline}</p>
        <p style={{ margin: '0 0 18px', fontSize: 14, lineHeight: 1.7, color: C.muted }}>{svc.description}</p>

        {/* Includes list */}
        <div style={{ background: C.off, borderRadius: 12, padding: '14px 16px', marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>What's Included</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {svc.includes.map(item => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: C.text }}>
                <CheckCircle size={14} color={C.red} style={{ flexShrink: 0, marginTop: 2 }} /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Meta */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
          <div style={{ fontSize: 12, background: '#f0fdf4', color: '#16a34a', borderRadius: 6, padding: '4px 10px', fontWeight: 600 }}>
            👤 {svc.ideal}
          </div>
          <div style={{ fontSize: 12, background: '#eff6ff', color: '#2563eb', borderRadius: 6, padding: '4px 10px', fontWeight: 600 }}>
            🗓 {svc.freq}
          </div>
        </div>

        <Link to="/contact" style={{ ...btn(hovered ? C.red : 'transparent', hovered ? '#fff' : C.red, `2px solid ${C.red}`), width: '100%', justifyContent: 'center', borderRadius: 10, padding: '12px' }}>
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
    { id: 'residential', label: '🏠 Residential' },
    { id: 'commercial', label: '🏢 Commercial' },
  ];

  const residentialRef = useRef();
  const commercialRef = useRef();

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, background: C.white }}>

      <Navbar />

      {/* ── HERO ── */}
      <section style={{ background: `linear-gradient(120deg, ${C.dark} 55%, #2c1810)`, padding: '80px 0 0', position: 'relative', overflow: 'hidden' }}>
        {/* BG blobs */}
        <div style={{ position: 'absolute', top: '-10%', right: '5%', width: 500, height: 500, borderRadius: '50%', background: 'rgba(192,57,43,.12)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '0', left: '0', width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,.03)', filter: 'blur(60px)' }} />

        <div style={{ ...container, position: 'relative' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, fontSize: 13, color: '#8892a0' }}>
            <Link to="/" style={{ color: '#8892a0', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={14} />
            <span style={{ color: '#fff' }}>Services</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 60, alignItems: 'end', paddingBottom: 64 }}>
            <div>
              <div style={{ ...pill('rgba(192,57,43,.25)', '#f87171'), border: '1px solid rgba(192,57,43,.4)' }}>
                <Sparkles size={12} /> OUR SERVICES
              </div>
              <h1 style={{ fontSize: 'clamp(34px,4.5vw,58px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, margin: '0 0 18px' }}>
                Residential & Commercial<br />
                <span style={{ color: C.red }}>Cleaning Services</span>
              </h1>
              <p style={{ color: '#b0bac8', fontSize: 17, lineHeight: 1.7, marginBottom: 36, maxWidth: 520 }}>
                From spotless homes to pristine offices — we deliver professional cleaning solutions tailored to your space, schedule, and budget. Fully insured. Satisfaction guaranteed.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 48 }}>
                <button onClick={() => scrollTo(residentialRef)} style={{ ...btn('#fff', C.red), fontSize: 15 }}>
                  <Home size={17} /> Residential Services
                </button>
                <button onClick={() => scrollTo(commercialRef)} style={{ ...btn('transparent', '#fff', '2px solid rgba(255,255,255,.25)'), fontSize: 15 }}>
                  <Building2 size={17} /> Commercial Services
                </button>
              </div>
              {/* Trust row */}
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {[
                  { icon: Shield, t: 'Fully Insured & Bonded' },
                  { icon: Leaf, t: 'Eco-Friendly Products' },
                  { icon: BadgeCheck, t: '100% Satisfaction Guarantee' },
                ].map(item => (
                  <div key={item.t} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8892a0', fontSize: 13 }}>
                    <item.icon size={15} color={C.red} /> {item.t}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats panel */}
            <div style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 20, padding: '32px 28px', backdropFilter: 'blur(8px)' }}>
              <div style={{ fontSize: 13, color: '#8892a0', fontWeight: 600, marginBottom: 24, textTransform: 'uppercase', letterSpacing: 1 }}>Trusted By Hundreds</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                {[
                  { v: '25+', l: 'Years Experience' },
                  { v: '500+', l: 'Happy Clients' },
                  { v: '50+', l: 'Team Members' },
                  { v: '98%', l: 'Satisfaction Rate' },
                ].map(s => (
                  <div key={s.l} style={{ background: 'rgba(255,255,255,.06)', borderRadius: 12, padding: '16px' }}>
                    <div style={{ fontSize: 28, fontWeight: 900, color: '#fff' }}><AnimCounter target={s.v} /></div>
                    <div style={{ fontSize: 12, color: '#8892a0', marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 20 }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f39c12" color="#f39c12" />)}
                  <span style={{ color: '#f39c12', fontSize: 13, fontWeight: 700, marginLeft: 6 }}>5.0</span>
                </div>
                <p style={{ color: '#b0bac8', fontSize: 13, lineHeight: 1.6, margin: '0 0 12px' }}>"Absolutely the best cleaning service we've used. Professional, thorough, and always on time."</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 15 }}>S</div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>Sarah M.</div>
                    <div style={{ color: '#8892a0', fontSize: 12 }}>Office Manager</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab bar pinned to bottom of hero */}
        <div style={{ background: C.white, borderTop: '1px solid rgba(255,255,255,.1)' }}>
          <div style={{ ...container, display: 'flex', gap: 0 }}>
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                  if (t.id === 'residential') scrollTo(residentialRef);
                  else if (t.id === 'commercial') scrollTo(commercialRef);
                }}
                style={{
                  padding: '18px 28px', fontWeight: 700, fontSize: 14,
                  border: 'none', background: 'none', cursor: 'pointer',
                  color: activeTab === t.id ? C.red : C.muted,
                  borderBottom: activeTab === t.id ? `3px solid ${C.red}` : '3px solid transparent',
                  transition: 'all .18s',
                }}
              >
                {t.label}
              </button>
            ))}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
              <a href="tel:+15551234567" style={{ display: 'flex', alignItems: 'center', gap: 6, color: C.red, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                <Phone size={14} /> Call for Instant Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESIDENTIAL SERVICES ── */}
      <section ref={residentialRef} style={{ padding: '90px 0', background: C.off }}>
        <div style={{ ...container }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 52, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={pill()}><Home size={12} /> RESIDENTIAL CLEANING</div>
              <h2 style={sectionTitle}>Home Cleaning Services</h2>
              <p style={{ color: C.muted, fontSize: 16, maxWidth: 520, lineHeight: 1.6, margin: 0 }}>
                Tailored cleaning solutions for every home — from weekly maintenance to one-time deep cleans and move-in/out services.
              </p>
            </div>
            <Link to="/contact" style={{ ...btn(C.red, '#fff'), fontSize: 14 }}>
              Book Home Cleaning <ArrowRight size={15} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 24 }}>
            {RESIDENTIAL_SERVICES.map((svc, i) => <ServiceCard key={svc.id} svc={svc} index={i} />)}
          </div>

          {/* Residential CTA strip */}
          <div style={{ marginTop: 40, background: `linear-gradient(120deg,${C.dark},#2c3e6b)`, borderRadius: 18, padding: '36px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <h3 style={{ color: '#fff', margin: '0 0 8px', fontSize: 20, fontWeight: 800 }}>Not sure which home service is right for you?</h3>
              <p style={{ color: '#8892a0', fontSize: 14, margin: 0 }}>Our team will assess your home and recommend the best plan at no cost.</p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ ...btn(C.red, '#fff'), fontSize: 14 }}>Get Free Home Assessment <ArrowRight size={15} /></Link>
              <a href="tel:+15551234567" style={{ ...btn('transparent', '#fff', '2px solid rgba(255,255,255,.25)'), fontSize: 14 }}>
                <Phone size={15} /> Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMERCIAL SERVICES ── */}
      <section ref={commercialRef} style={{ padding: '90px 0', background: C.white }}>
        <div style={{ ...container }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 52, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={pill()}><Building2 size={12} /> COMMERCIAL CLEANING</div>
              <h2 style={sectionTitle}>Commercial Cleaning Services</h2>
              <p style={{ color: C.muted, fontSize: 16, maxWidth: 520, lineHeight: 1.6, margin: 0 }}>
                Professional cleaning programs for offices, facilities, and commercial spaces of all sizes — tailored to your operations and schedule.
              </p>
            </div>
            <Link to="/contact" style={{ ...btn(C.red, '#fff'), fontSize: 14 }}>
              Get Commercial Quote <ArrowRight size={15} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {COMMERCIAL_SERVICES.map((svc, i) => <ServiceCard key={svc.id} svc={svc} index={i} />)}
          </div>

          {/* Commercial CTA strip */}
          <div style={{ marginTop: 40, background: `linear-gradient(120deg,${C.red},#e74c3c)`, borderRadius: 18, padding: '36px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <h3 style={{ color: '#fff', margin: '0 0 8px', fontSize: 20, fontWeight: 800 }}>Ready to keep your business spotless?</h3>
              <p style={{ color: 'rgba(255,255,255,.8)', fontSize: 14, margin: 0 }}>Get a custom commercial cleaning plan with a free on-site walkthrough.</p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ ...btn('#fff', C.red), fontSize: 14 }}>Get a Free Quote <ArrowRight size={15} /></Link>
              <a href="tel:+15551234567" style={{ ...btn('transparent', '#fff', '2px solid rgba(255,255,255,.3)'), fontSize: 14 }}>
                <Phone size={15} /> +1 (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '90px 0', background: C.off }}>
        <div style={{ ...container, textAlign: 'center' }}>
          <div style={pill()}><BadgeCheck size={12} /> OUR PROCESS</div>
          <h2 style={{ ...sectionTitle, marginBottom: 12 }}>How It Works</h2>
          <p style={{ color: C.muted, fontSize: 16, maxWidth: 520, margin: '0 auto 56px', lineHeight: 1.6 }}>
            From first contact to spotless results — here's what to expect when you work with us.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {PROCESS.map((step, i) => (
              <div key={i} style={{ position: 'relative' }}>
                {i < PROCESS.length - 1 && (
                  <div style={{ position: 'absolute', top: 28, left: '60%', width: '80%', height: 2, background: `linear-gradient(to right, ${C.red}, ${C.border})`, zIndex: 0 }} />
                )}
                <div style={{ background: C.white, borderRadius: 18, padding: '32px 24px', border: `1px solid ${C.border}`, position: 'relative', zIndex: 1 }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: C.red, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, margin: '0 auto 18px' }}>
                    {step.num}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, margin: '0 0 10px', color: C.dark }}>{step.title}</h3>
                  <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section style={{ padding: '90px 0', background: C.white }}>
        <div style={{ ...container }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={pill()}><ThumbsUp size={12} /> WHY CHOOSE US</div>
              <h2 style={{ ...sectionTitle, marginBottom: 20 }}>The Standard Others Get Measured Against</h2>
              <p style={{ color: C.muted, fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
                We're not just another cleaning company. We're a partner invested in keeping your home or business at its best — every single visit.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: Shield, title: 'Fully Insured & Bonded', desc: '$5M liability coverage. All staff background-checked and bonded.' },
                  { icon: Leaf, title: 'Eco-Certified Products', desc: 'WHMIS-compliant, green-certified products safe for families and workplaces.' },
                  { icon: Users, title: 'Dedicated Account Manager', desc: 'One point of contact who knows your property and standards.' },
                  { icon: Clock, title: 'Flexible Scheduling', desc: 'Morning, evening, weekends — we work around your life.' },
                  { icon: Award, title: '100% Satisfaction Guarantee', desc: 'Not happy? We return within 24hrs and re-clean at no charge.' },
                ].map(item => (
                  <div key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: C.redLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <item.icon size={20} color={C.red} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: C.dark }}>{item.title}</div>
                      <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.6 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} style={{ background: i === 0 ? C.dark : C.off, borderRadius: 18, padding: '24px 28px', border: `1px solid ${i === 0 ? 'transparent' : C.border}` }}>
                  <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
                    {[...Array(t.rating)].map((_, j) => <Star key={j} size={14} fill="#f39c12" color="#f39c12" />)}
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.7, fontStyle: 'italic', color: i === 0 ? '#dce4f0' : C.text, margin: '0 0 16px' }}>"{t.txt}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 14 }}>{t.init}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: i === 0 ? '#fff' : C.dark }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: i === 0 ? '#8892a0' : C.muted }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '90px 0', background: C.off }}>
        <div style={{ ...container }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'start' }}>
            <div>
              <div style={pill()}><BadgeCheck size={12} /> FAQ</div>
              <h2 style={{ ...sectionTitle, marginBottom: 16 }}>Frequently Asked Questions</h2>
              <p style={{ color: C.muted, fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
                Have more questions? Our team is always happy to help. Reach out anytime.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Link to="/contact" style={{ ...btn(C.red, '#fff'), justifyContent: 'center' }}>
                  <Mail size={16} /> Send Us a Message
                </Link>
                <a href="tel:+15551234567" style={{ ...btn('transparent', C.red, `2px solid ${C.red}`), justifyContent: 'center' }}>
                  <Phone size={16} /> Call +1 (555) 123-4567
                </a>
              </div>
              {/* Quick facts */}
              <div style={{ marginTop: 32, background: C.redLight, borderRadius: 16, padding: '24px' }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: C.red, marginBottom: 14 }}>Quick Facts</div>
                {[
                  '24-hour response guarantee',
                  '100% satisfaction or we return',
                  'No lock-in contracts',
                  'Same-day quotes available',
                ].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.text, marginBottom: 8 }}>
                    <CheckCircle size={14} color={C.red} /> {f}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: C.white, borderRadius: 20, padding: '32px', border: `1px solid ${C.border}` }}>
              {FAQS.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '90px 0', background: `linear-gradient(135deg,${C.dark},#2c1810)` }}>
        <div style={{ ...container, textAlign: 'center' }}>
          <div style={{ ...pill('rgba(192,57,43,.25)', '#f87171'), border: '1px solid rgba(192,57,43,.4)' }}>
            <Sparkles size={12} /> GET STARTED TODAY
          </div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,46px)', fontWeight: 900, color: '#fff', margin: '0 0 16px', lineHeight: 1.2 }}>
            Ready for a Cleaner Space?
          </h2>
          <p style={{ color: '#8892a0', fontSize: 18, maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.6 }}>
            Get your free, no-obligation quote today. We'll assess your space and create a custom plan that fits your needs and budget.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 48 }}>
            <Link to="/contact" style={{ ...btn(C.red, '#fff'), fontSize: 16, padding: '16px 36px' }}>
              Get Free Quote <ArrowRight size={18} />
            </Link>
            <a href="tel:+15551234567" style={{ ...btn('transparent', '#fff', '2px solid rgba(255,255,255,.25)'), fontSize: 16, padding: '16px 36px' }}>
              <Phone size={18} /> Call Us Now
            </a>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            {[
              { icon: CheckCircle, t: 'No Obligation' },
              { icon: Clock, t: '24hr Response' },
              { icon: Shield, t: 'Fully Insured' },
              { icon: Award, t: 'Satisfaction Guaranteed' },
            ].map(item => (
              <div key={item.t} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8892a0', fontSize: 13 }}>
                <item.icon size={16} color={C.red} /> {item.t}
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