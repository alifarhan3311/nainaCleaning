import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import api from '../services/api';
import { serviceService } from '../services/serviceService';
import {
  Sparkles, Shield, Clock, Award, CheckCircle, ArrowRight, Star,
  Phone, Mail, MapPin, ChevronDown, Play, Users, Building2,
  Leaf, BadgeCheck, Wrench, Calendar, ThumbsUp, Quote,
  Sun, Snowflake, Home as HomeIcon, Briefcase, Store, Factory, Wind
} from 'lucide-react';
 
/* ─────────────────────────────────────────────
   MOCK SERVICES (replace with real API call)
───────────────────────────────────────────── */
const MOCK_SERVICES = [
  { id: 1, title: 'Residential Cleaning', icon: HomeIcon, description: 'Professional home cleaning services for houses, apartments, and condos. We ensure your living space is spotless and comfortable.', color: '#e8f0ff' },
  { id: 2, title: 'Commercial Cleaning', icon: Building2, description: 'Comprehensive cleaning solutions for offices, retail spaces, and commercial properties. Maintain a professional environment for your business.', color: '#fff0e8' },
];
 
/* ─────────────────────────────────────────────
   STATS
───────────────────────────────────────────── */
const STATS = [
  { value: '25+', label: 'Years Experience' },
  { value: '500+', label: 'Happy Clients' },
  { value: '50+', label: 'Team Members' },
  { value: '98%', label: 'Satisfaction Rate' },
];
 
/* ─────────────────────────────────────────────
   FEATURES
───────────────────────────────────────────── */
const FEATURES = [
  { icon: BadgeCheck, title: 'The Right Clean for Your Site', desc: 'Every building is different. We assess your space, understand your operations, and build a custom cleaning plan that fits - no cookie-cutter packages.' },
  { icon: Briefcase, title: 'Focus on Your Business', desc: 'Stop worrying about cleaning. We show up on time, every time - so you can focus on running your business while we handle the rest.' },
  { icon: Users, title: 'A Real Partnership', desc: "We're not just a vendor - we're an extension of your team. Your dedicated account manager knows your building, your people, and your standards." },
  { icon: Shield, title: 'Problems Solved, Not Created', desc: 'Missed cleanings, poor quality, no communication - we have heard it all. With us, those problems disappear. Guaranteed.' },
  { icon: Leaf, title: 'Eco-Friendly Products', desc: 'We use certified green cleaning products safe for your employees, clients, and the environment - without compromising cleaning power.' },
  { icon: BadgeCheck, title: 'Fully Insured & Bonded', desc: 'Complete peace of mind with comprehensive insurance coverage. Our entire team is background-checked, bonded, and professionally trained.' },
];
 
/* ─────────────────────────────────────────────
   WHY CHOOSE (bottom icons)
───────────────────────────────────────────── */
const WHY = [
  { icon: Wrench, title: 'Pro Equipment', sub: 'Commercial-grade tools' },
  { icon: Clock, title: 'Flexible Hours', sub: 'Morning, evening, weekend' },
  { icon: Users, title: 'Trained Team', sub: 'Qualified and insured staff' },
  { icon: Award, title: 'Quality Assured', sub: 'Consistent high standards' },
];
 
/* ─────────────────────────────────────────────
   SPACES
───────────────────────────────────────────── */
const SPACES = [
  { icon: Building2, label: 'Offices' },
  { icon: Store, label: 'Retail' },
  { icon: Factory, label: 'Industrial' },
  { icon: HomeIcon, label: 'Residential' },
  { icon: Briefcase, label: 'Corporate' },
];
 
/* ─────────────────────────────────────────────
   LOCATIONS
───────────────────────────────────────────── */
const LOCATIONS = [
  { name: 'Downtown Core', areas: 'Financial District • Civic Quarter • Sparks St', desc: 'Professional cleaning for high-rise offices, law firms, and government buildings.' },
  { name: 'West End', areas: 'Merivale Rd • Baseline Rd • Bells Corners', desc: 'Reliable janitorial and commercial services for suburban business parks.' },
  { name: 'East Side', areas: 'St. Joseph Blvd • Innes Rd • Trim Rd', desc: 'Office cleaning for residential communities, shopping plazas, and more.' },
];
 
/* ─────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────── */
const TESTIMONIALS = [
  { name: 'Sarah Johnson', role: 'Office Manager', content: 'Canada Maintenance has transformed our office. Their team is professional, reliable, and always goes above and beyond. We highly recommend them!', rating: 5, initial: 'S' },
  { name: 'Michael Chen', role: 'Business Owner', content: "Best cleaning service for our office. They're reliable, efficient, and always leave our workspace spotless. Been with them 3 years now.", rating: 5, initial: 'M' },
  { name: 'Emily Rodriguez', role: 'Property Manager', content: "I've been using their services for years. Consistent quality and excellent customer service. Switching to them was the best decision.", rating: 5, initial: 'E' },
];
 
/* ─────────────────────────────────────────────
   BEFORE/AFTER GALLERY
───────────────────────────────────────────── */
const GALLERY = [
  { label: 'Carpet Steam Cleaning', sub: 'Deep steam cleaning restoration' },
  { label: 'Floor Maintenance', sub: 'Strip and wax restoration' },
  { label: 'Window Cleaning', sub: 'High-rise streak-free cleaning' },
  { label: 'Industrial Cleaning', sub: 'Heavy duty warehouse scrubbing' },
];
 
/* ══════════════════════════════════════════════
   INLINE STYLES — no Tailwind dependency needed
══════════════════════════════════════════════ */
const S = {
  /* tokens */
  red: '#c0392b',
  redDark: '#96281b',
  redLight: '#fdecea',
  dark: '#1a1a2e',
  text: '#2d2d2d',
  muted: '#6b7280',
  border: '#e5e7eb',
  white: '#ffffff',
  offWhite: '#f9fafb',
 
  /* helpers */
  container: { maxWidth: 1140, margin: '0 auto', padding: '0 24px' },
  pill: { display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff0ee', color: '#c0392b', borderRadius: 999, padding: '6px 16px', fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 16 },
  sectionTitle: { fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, lineHeight: 1.15, color: '#1a1a2e', margin: '0 0 16px' },
  sectionSub: { color: '#6b7280', fontSize: 17, maxWidth: 560, margin: '0 auto 56px', lineHeight: 1.6 },
  btn: (bg, color, border) => ({
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: bg, color, border: border || 'none',
    borderRadius: 8, padding: '14px 28px', fontWeight: 700,
    fontSize: 15, cursor: 'pointer', textDecoration: 'none',
    transition: 'all .2s',
  }),
};
 
/* ─────────────────────────────────────────────
   REUSABLE: AnimCounter
───────────────────────────────────────────── */
function AnimCounter({ target }) {
  const [val, setVal] = useState(0);
  const ref = useRef();
  const num = parseInt(target);
  const suffix = target.replace(/[0-9]/g, '');
 
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = Math.ceil(num / 60);
        const timer = setInterval(() => {
          start += step;
          if (start >= num) { setVal(num); clearInterval(timer); }
          else setVal(start);
        }, 20);
        obs.disconnect();
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [num]);
 
  return <span ref={ref}>{val}{suffix}</span>;
}
 
/* ─────────────────────────────────────────────
   BEFORE/AFTER SLIDER (CSS drag simulation)
───────────────────────────────────────────── */
function BeforeAfterCard({ label, sub }) {
  const [pos, setPos] = useState(50);
  const drag = useRef(false);
  const cardRef = useRef();
 
  const move = (clientX) => {
    if (!drag.current || !cardRef.current) return;
    const { left, width } = cardRef.current.getBoundingClientRect();
    const p = Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
    setPos(p);
  };
 
  return (
    <div
      ref={cardRef}
      style={{ borderRadius: 16, overflow: 'hidden', background: '#111', position: 'relative', cursor: 'ew-resize', userSelect: 'none', boxShadow: '0 4px 24px rgba(0,0,0,.12)' }}
      onMouseDown={() => { drag.current = true; }}
      onMouseUp={() => { drag.current = false; }}
      onMouseLeave={() => { drag.current = false; }}
      onMouseMove={e => move(e.clientX)}
      onTouchMove={e => move(e.touches[0].clientX)}
    >
      {/* BEFORE */}
      <div style={{ width: '100%', height: 200, background: 'linear-gradient(135deg,#555,#888)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#fff', opacity: .4, fontSize: 13, fontWeight: 600 }}>BEFORE</span>
      </div>
      {/* AFTER overlay */}
      <div style={{ position: 'absolute', inset: 0, width: `${pos}%`, overflow: 'hidden' }}>
        <div style={{ width: cardRef.current?.offsetWidth || 400, height: 200, background: 'linear-gradient(135deg,#1a6e3c,#2ecc71)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', opacity: .5, fontSize: 13, fontWeight: 600 }}>AFTER</span>
        </div>
      </div>
      {/* divider */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, width: 3, background: '#fff', transform: 'translateX(-50%)' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 36, height: 36, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,.3)' }}>
          <span style={{ fontSize: 14 }}>⇔</span>
        </div>
      </div>
      {/* labels */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: 'linear-gradient(transparent,rgba(0,0,0,.7))', color: '#fff' }}>
        <div style={{ fontWeight: 700, fontSize: 15 }}>{label}</div>
        <div style={{ fontSize: 12, opacity: .7 }}>{sub}</div>
        <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
          <span style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#e74c3c', display: 'inline-block' }}></span>BEFORE</span>
          <span style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2ecc71', display: 'inline-block' }}></span>AFTER</span>
        </div>
      </div>
    </div>
  );
}
 
/* ══════════════════════════════════════════════
   MAIN HOME COMPONENT
══════════════════════════════════════════════ */
const Home = () => {
  const [postalCode, setPostalCode] = useState('');
  const [areaResult, setAreaResult] = useState(null);

  // Hero quote form state
  const [quoteForm, setQuoteForm] = useState({
    name: '', company: '', email: '', phone: '', service: '', frequency: '', sqft: '', message: '',
  });
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  const handleQuoteChange = (e) => {
    const { name, value } = e.target;
    setQuoteForm(prev => ({ ...prev, [name]: value }));
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    if (!quoteForm.name || !quoteForm.email || !quoteForm.phone) {
      alert('Please fill in your name, email and phone number.');
      return;
    }
    setQuoteSubmitting(true);
    try {
      const messageText = `Service: ${quoteForm.service || 'N/A'} | Frequency: ${quoteForm.frequency || 'N/A'} | Size: ${quoteForm.sqft || 'N/A'} | Company: ${quoteForm.company || 'N/A'}${quoteForm.message ? ` | Notes: ${quoteForm.message}` : ''}`;
      await api.post('/messages', {
        name: quoteForm.name,
        email: quoteForm.email,
        phone: quoteForm.phone,
        service: quoteForm.service,
        message: messageText,
      });
      setQuoteSuccess(true);
      setQuoteForm({ name: '', company: '', email: '', phone: '', service: '', frequency: '', sqft: '', message: '' });
    } catch (err) {
      alert('Failed to send request. Please try again or call us directly.');
    } finally {
      setQuoteSubmitting(false);
    }
  };

  // Load real services from API
  const [apiServices, setApiServices] = useState(MOCK_SERVICES);
  useEffect(() => {
    serviceService.getServices({ active: 'true', limit: 20 })
      .then(res => {
        if (res.success && res.data.services && res.data.services.length > 0) {
          const mapped = res.data.services.map((s, i) => ({
            id: s._id,
            title: s.title,
            icon: i % 2 === 0 ? HomeIcon : Building2,
            description: s.description,
            color: i % 2 === 0 ? '#e8f0ff' : '#fff0e8',
          }));
          setApiServices(mapped);
        }
      })
      .catch(() => {});
  }, []);
 
  const checkArea = () => {
    if (postalCode.trim()) {
      setAreaResult(`Great news! We serve your area (${postalCode.toUpperCase()}). Our team is ready to provide a free estimate.`);
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: S.text, background: S.white }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ background: 'linear-gradient(120deg,#1a1a2e 60%,#2c1810)', minHeight: '92vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* BG circles */}
        {[['top:10%,left:60%', '#c0392b22', 500], ['bottom:5%,left:5%', '#ffffff08', 300]].map(([pos, bg, size], i) => (
          <div key={i} style={{ position: 'absolute', width: size, height: size, borderRadius: '50%', background: bg, filter: 'blur(80px)', ...Object.fromEntries(pos.split(',').map(p => p.split(':'))) }} />
        ))}
 
        <div style={{ ...S.container, display: 'grid', gridTemplateColumns: '1fr 420px', gap: 60, alignItems: 'center', padding: '80px 24px' }}>
          {/* Left */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(192,57,43,.2)', border: '1px solid rgba(192,57,43,.4)', borderRadius: 999, padding: '6px 14px', marginBottom: 24 }}>
              <Star size={13} fill="#f39c12" color="#f39c12" />
              <span style={{ color: '#f1c40f', fontSize: 12, fontWeight: 700 }}>Rated 5.0 • Mississauga's Most Trusted Cleaning Service</span>
            </div>
            <h1 style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, margin: '0 0 20px' }}>
              Residential &<br />
              <span style={{ color: S.red }}>Commercial</span><br />
              Cleaning Services
            </h1>
            <p style={{ color: '#bdc3d0', fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 500 }}>
              Welcome to Naina Cleaning Services — your trusted provider of professional residential and commercial cleaning in Mississauga. We deliver exceptional results for homes and businesses.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 48 }}>
              <Link to="/contact" style={{ ...S.btn(S.red, '#fff'), fontSize: 16, padding: '16px 32px' }}>
                Get Free Quote <ArrowRight size={18} />
              </Link>
              <a href="tel:6479736745" style={{ ...S.btn('transparent', '#fff', '2px solid rgba(255,255,255,.3)'), fontSize: 16, padding: '16px 32px' }}>
                <Phone size={18} /> Call Us
              </a>
            </div>
            {/* Stats */}
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              {STATS.map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: '#fff' }}><AnimCounter target={s.value} /></div>
                  <div style={{ color: '#8892a0', fontSize: 13, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
            {/* Badges */}
            <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
              {['ISSA Member', 'Ottawa Board of Trade', '100% Canadian Owned'].map(b => (
                <div key={b} style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, padding: '6px 14px', color: '#ccc', fontSize: 12, fontWeight: 600 }}>{b}</div>
              ))}
            </div>
          </div>
 
          {/* Quote Form */}
          <div style={{ background: '#fff', borderRadius: 20, padding: 36, boxShadow: '0 24px 80px rgba(0,0,0,.4)' }}>
            {quoteSuccess ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#e8f8ee', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <CheckCircle size={32} color="#27ae60" />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: S.dark, margin: '0 0 8px' }}>Request Sent!</h3>
                <p style={{ color: S.muted, fontSize: 14, margin: '0 0 24px' }}>We'll get back to you within 24 hours.</p>
                <button onClick={() => setQuoteSuccess(false)} style={{ ...S.btn(S.red, '#fff'), fontSize: 14, padding: '10px 24px' }}>
                  Send Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit}>
                <h3 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: S.dark }}>Request a Quote</h3>
                <p style={{ color: S.muted, fontSize: 14, margin: '0 0 24px' }}>Fill out the form and we'll get back to you promptly.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[['Full Name *', 'name', 'John Doe'], ['Company', 'company', 'Company Ltd.'], ['Email *', 'email', 'email@example.com'], ['Phone *', 'phone', '(555) 555-0123']].map(([label, fieldName, ph]) => (
                    <div key={fieldName}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: S.muted, display: 'block', marginBottom: 4 }}>{label}</label>
                      <input
                        name={fieldName}
                        value={quoteForm[fieldName]}
                        onChange={handleQuoteChange}
                        placeholder={ph}
                        type={fieldName === 'email' ? 'email' : fieldName === 'phone' ? 'tel' : 'text'}
                        style={{ width: '100%', padding: '10px 12px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 12 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: S.muted, display: 'block', marginBottom: 4 }}>Service Type *</label>
                  <select name="service" value={quoteForm.service} onChange={handleQuoteChange} style={{ width: '100%', padding: '10px 12px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 14, outline: 'none' }}>
                    <option value="">Select a service</option>
                    {apiServices.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: S.muted, display: 'block', marginBottom: 4 }}>Frequency</label>
                    <select name="frequency" value={quoteForm.frequency} onChange={handleQuoteChange} style={{ width: '100%', padding: '10px 12px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 14, outline: 'none' }}>
                      {['Select frequency', 'Daily', 'Weekly', 'Bi-weekly', 'Monthly'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: S.muted, display: 'block', marginBottom: 4 }}>Square Footage</label>
                    <select name="sqft" value={quoteForm.sqft} onChange={handleQuoteChange} style={{ width: '100%', padding: '10px 12px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 14, outline: 'none' }}>
                      {['Approx. size', '< 1,000 sq ft', '1,000–5,000', '5,000–20,000', '20,000+'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginTop: 12 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: S.muted, display: 'block', marginBottom: 4 }}>Additional Details</label>
                  <textarea name="message" value={quoteForm.message} onChange={handleQuoteChange} placeholder="Tell us about your specific cleaning needs..." rows={3} style={{ width: '100%', padding: '10px 12px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                </div>
                <button type="submit" disabled={quoteSubmitting} style={{ ...S.btn(S.red, '#fff'), width: '100%', justifyContent: 'center', marginTop: 16, padding: '14px', fontSize: 15, borderRadius: 10, opacity: quoteSubmitting ? 0.7 : 1 }}>
                  {quoteSubmitting ? 'Sending...' : (<>Get My Free Estimate <ArrowRight size={16} /></>)}
                </button>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 12 }}>
                  {['24h Response', 'No Obligation'].map(t => (
                    <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#27ae60', fontWeight: 600 }}>
                      <CheckCircle size={13} /> {t}
                    </span>
                  ))}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
 
      {/* ── YOUR CLEANING SOLUTIONS ── */}
      <section style={{ background: S.offWhite, padding: '100px 0' }}>
        <div style={{ ...S.container, textAlign: 'center' }}>
          <div style={S.pill}><Sparkles size={12} /> YOUR CLEANING SOLUTIONS</div>
          <h2 style={S.sectionTitle}>Janitorial & Commercial Cleaning —<br /><span style={{ color: S.red }}>You've Come to the Right Place.</span></h2>
          <p style={S.sectionSub}>Looking for a reliable cleaning company that understands your needs? We're your trusted partner. Here's what you get when you work with us.</p>
 
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '32px 28px', textAlign: 'left', border: `1px solid ${S.border}`, transition: 'box-shadow .2s', boxShadow: '0 2px 12px rgba(0,0,0,.04)' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(192,57,43,.12)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,.04)'}
              >
                <div style={{ width: 52, height: 52, borderRadius: 14, background: S.redLight, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <f.icon size={24} color={S.red} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 10px', color: S.dark }}>{f.title}</h3>
                <p style={{ color: S.muted, fontSize: 14, lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
 
          <div style={{ marginTop: 48, background: `linear-gradient(135deg,${S.red},#e74c3c)`, borderRadius: 20, padding: '40px 48px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <h3 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800 }}>CleanService — Your janitorial & commercial cleaning solutions.</h3>
              <p style={{ margin: 0, opacity: .85, fontSize: 15 }}>Since 2000, we've been helping businesses keep their spaces spotless.</p>
            </div>
            <Link to="/contact" style={{ ...S.btn('#fff', S.red), fontSize: 15, padding: '14px 28px', whiteSpace: 'nowrap' }}>
              Get Your Free Quote <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
 
      {/* ── WHY CHOOSE US ── */}
      <section style={{ padding: '100px 0', background: S.white }}>
        <div style={{ ...S.container, textAlign: 'center' }}>
          <div style={S.pill}><ThumbsUp size={12} /> WHY CHOOSE US</div>
          <h2 style={S.sectionTitle}>The Trusted Choice for<br /><span style={{ color: S.red }}>Your Business</span></h2>
          <p style={S.sectionSub}>For over 25 years, local businesses have trusted us to keep their spaces spotless. Here's why.</p>
 
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 40, alignItems: 'center', textAlign: 'left', marginBottom: 64 }}>
            {/* Left copy */}
            <div>
              <h3 style={{ fontSize: 28, fontWeight: 800, color: S.dark, margin: '0 0 20px' }}>Family-Owned Business,<br />Personalized Service</h3>
              <p style={{ color: S.muted, fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>Unlike big franchises, we treat every client like a partner. As a local family-owned business, we understand your workspace reflects your brand. That's why we tailor every cleaning plan to your specific needs.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'Direct communication with management — no call centres',
                  'Same trusted team assigned to your location every visit',
                  'Custom cleaning plans built around your schedule',
                  'Quick response times — we\'re right here for you',
                ].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: S.text, fontSize: 15 }}>
                    <CheckCircle size={18} color={S.red} style={{ flexShrink: 0, marginTop: 2 }} /> {item}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', gap: 16 }}>
                {[{ v: '25+', l: 'Years in Business' }, { v: '500+', l: 'Happy Clients' }].map(s => (
                  <div key={s.l} style={{ background: S.offWhite, borderRadius: 14, padding: '20px 28px', textAlign: 'center' }}>
                    <div style={{ fontSize: 36, fontWeight: 900, color: S.red }}><AnimCounter target={s.v} /></div>
                    <div style={{ fontSize: 13, color: S.muted, marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right testimonial card */}
            <div style={{ background: S.dark, borderRadius: 20, padding: 36, color: '#fff' }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#f39c12" color="#f39c12" />)}
              </div>
              <Quote size={32} color={S.red} style={{ marginBottom: 16 }} />
              <p style={{ fontSize: 17, lineHeight: 1.7, fontStyle: 'italic', margin: '0 0 28px', color: '#dce4f0' }}>
                "CleanService has transformed our office. Their team is professional, reliable, and always goes above and beyond. We highly recommend them!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: S.red, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18, color: '#fff' }}>S</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>Sarah M.</div>
                  <div style={{ color: '#8892a0', fontSize: 13 }}>Office Manager</div>
                </div>
              </div>
            </div>
          </div>
 
          {/* Why 4 icons */}
          <div style={{ background: S.dark, borderRadius: 20, padding: '48px 40px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32 }}>
            {WHY.map(w => (
              <div key={w.title} style={{ textAlign: 'center' }}>
                <div style={{ width: 60, height: 60, borderRadius: 16, background: 'rgba(192,57,43,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <w.icon size={26} color={S.red} />
                </div>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#fff', marginBottom: 6 }}>{w.title}</div>
                <div style={{ color: '#8892a0', fontSize: 13 }}>{w.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── OUR SERVICES ── */}
      <section style={{ padding: '100px 0', background: S.offWhite }}>
        <div style={{ ...S.container, textAlign: 'center' }}>
          <div style={S.pill}><Sparkles size={12} /> OUR EXPERTISE</div>
          <h2 style={S.sectionTitle}>Commercial Cleaning Solutions</h2>
          <p style={{ ...S.sectionSub }}>Comprehensive cleaning solutions for every need — from daily office maintenance to specialized deep cleans.</p>
 
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {apiServices.map(s => (
              <div key={s.id} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: `1px solid ${S.border}`, textAlign: 'left', transition: 'transform .2s,box-shadow .2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ height: 140, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <s.icon size={48} color={S.red} strokeWidth={1.5} />
                </div>
                <div style={{ padding: '24px 24px 20px' }}>
                  <h3 style={{ margin: '0 0 10px', fontSize: 18, fontWeight: 800, color: S.dark }}>{s.title}</h3>
                  <p style={{ color: S.muted, fontSize: 14, lineHeight: 1.6, margin: '0 0 20px' }}>{s.description}</p>
                  <a href="#" style={{ color: S.red, fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                    Learn More <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            ))}
          </div>
 
          <div style={{ marginTop: 40 }}>
            <Link to="/services" style={{ ...S.btn('transparent', S.red, `2px solid ${S.red}`), fontSize: 15, padding: '14px 32px' }}>
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
 
      {/* ── COMMERCIAL CLEANING SECTION ── */}
      <section style={{ padding: '100px 0', background: S.white }}>
        <div style={{ ...S.container, textAlign: 'center' }}>
          <div style={S.pill}><Building2 size={12} /> COMMERCIAL CLEANING</div>
          <h2 style={S.sectionTitle}>Professional Services in Ottawa and Gatineau</h2>
          <p style={{ ...S.sectionSub }}>In today's business world, maintaining a clean and professional work environment is essential for employee health, productivity, and the impression you make on clients.</p>
 
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start', textAlign: 'left', marginBottom: 64 }}>
            {/* Why clean matters */}
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 20px', color: S.dark }}>Why a Clean Environment Matters</h3>
              {[
                { icon: Users, title: 'Employee Health', desc: 'Sanitized surfaces and good air quality reduce the spread of germs and illness.' },
                { icon: Award, title: 'Increased Productivity', desc: 'Employees are more motivated and focused in a clean, organized environment.' },
                { icon: Star, title: 'Client Impressions', desc: 'A spotless office communicates professionalism and attention to detail.' },
                { icon: Shield, title: 'Compliance & Safety', desc: 'Meet health and safety standards required in commercial spaces.' },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, background: S.offWhite, borderRadius: 12, padding: '16px 20px', marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: S.redLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={18} color={S.red} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ color: S.muted, fontSize: 13, lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Spaces we serve */}
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 20px', color: S.dark }}>Spaces We Serve</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                {SPACES.map(sp => (
                  <div key={sp.label} style={{ background: S.redLight, borderRadius: 14, padding: '24px 12px', textAlign: 'center', border: `1px solid #f5c0bb` }}>
                    <sp.icon size={32} color={S.red} style={{ marginBottom: 10 }} />
                    <div style={{ fontWeight: 700, fontSize: 14, color: S.dark }}>{sp.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 28, background: S.dark, borderRadius: 16, padding: '28px 28px' }}>
                <h4 style={{ color: '#fff', margin: '0 0 8px', fontSize: 18, fontWeight: 800 }}>Why Choose Professional Cleaning?</h4>
                <p style={{ color: '#8892a0', fontSize: 14, margin: '0 0 20px' }}>Outsourcing your cleaning services offers significant advantages over in-house staff.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {WHY.map(w => (
                    <div key={w.title} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <w.icon size={16} color={S.red} />
                      <div>
                        <div style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>{w.title}</div>
                        <div style={{ color: '#8892a0', fontSize: 11 }}>{w.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* ── SERVICE AREA + POSTAL CHECKER ── */}
      <section style={{ padding: '100px 0', background: S.offWhite }}>
        <div style={{ ...S.container }}>
          {/* Service area banner */}
          <div style={{ background: `linear-gradient(120deg,${S.red},#e74c3c)`, borderRadius: 20, padding: '48px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 64 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.15)', borderRadius: 999, padding: '5px 14px', marginBottom: 16 }}>
                <MapPin size={12} color="#fff" /><span style={{ color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>SERVICE AREA</span>
              </div>
              <h3 style={{ color: '#fff', fontSize: 28, fontWeight: 900, margin: '0 0 10px' }}>Serving Our Region with Excellence</h3>
              <p style={{ color: 'rgba(255,255,255,.8)', fontSize: 15, margin: '0 0 20px' }}>Our local knowledge means we understand the unique climate challenges of our region and tailor our services accordingly.</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[
                  { icon: Snowflake, label: 'Winter Cleaning' },
                  { icon: Sun, label: 'Summer Maintenance' },
                ].map(tag => (
                  <div key={tag.label} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.15)', borderRadius: 999, padding: '7px 16px', color: '#fff', fontSize: 13, fontWeight: 600 }}>
                    <tag.icon size={14} /> {tag.label}
                  </div>
                ))}
              </div>
            </div>
            <Link to="/contact" style={{ ...S.btn('#fff', S.red), fontSize: 15, padding: '14px 28px', whiteSpace: 'nowrap' }}>
              Get Your Free Quote <ArrowRight size={16} />
            </Link>
          </div>
 
          {/* Postal checker */}
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={S.pill}><MapPin size={12} /> SERVICE AREA CHECKER</div>
            <h2 style={{ ...S.sectionTitle, marginBottom: 12 }}>Are we in <span style={{ color: S.red }}>your area?</span></h2>
            <p style={{ color: S.muted, fontSize: 16, marginBottom: 32 }}>Enter your postal code to check if your business is in our service area.</p>
            <div style={{ display: 'flex', gap: 0, maxWidth: 420, margin: '0 auto', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,.1)', border: `1px solid ${S.border}` }}>
              <input
                value={postalCode}
                onChange={e => setPostalCode(e.target.value)}
                placeholder="e.g. K1A 0B1"
                style={{ flex: 1, padding: '14px 20px', border: 'none', fontSize: 15, outline: 'none' }}
                onKeyDown={e => e.key === 'Enter' && checkArea()}
              />
              <button onClick={checkArea} style={{ ...S.btn(S.red, '#fff'), borderRadius: 0, padding: '14px 24px', fontSize: 14 }}>Check</button>
            </div>
            {areaResult && (
              <div style={{ marginTop: 20, background: '#e8f8ee', border: '1px solid #27ae60', borderRadius: 12, padding: '14px 24px', color: '#1a7a40', fontSize: 15, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle size={18} /> {areaResult}
              </div>
            )}
          </div>
 
          {/* Service areas grid */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={S.pill}><MapPin size={12} /> SERVICE AREAS</div>
            <h2 style={S.sectionTitle}>Service Areas in Your City</h2>
            <p style={{ ...S.sectionSub }}>We proudly serve the entire region, including all major neighbourhoods.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 48 }}>
              {['City Centre', 'West End', 'East Side', 'Downtown Core', 'North Quarter', 'South District', 'Industrial Zone', 'Business Park'].map(area => (
                <div key={area} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: `1px solid ${S.border}`, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 600, color: S.text }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: S.red, flexShrink: 0 }}></span> {area}
                </div>
              ))}
            </div>
          </div>
 
          {/* Office cleaning by location */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={S.pill}><Building2 size={12} /> OFFICE CLEANING</div>
            <h2 style={S.sectionTitle}>Office Cleaning Services by Location</h2>
            <p style={{ ...S.sectionSub }}>Professional office cleaning services tailored to every neighbourhood. Find your location below.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
              {LOCATIONS.map(loc => (
                <div key={loc.name} style={{ background: '#fff', borderRadius: 16, padding: '28px', border: `1px solid ${S.border}`, textAlign: 'left', transition: 'box-shadow .2s' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,.08)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: S.redLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MapPin size={18} color={S.red} />
                    </div>
                    <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: S.dark }}>{loc.name}</h3>
                  </div>
                  <p style={{ color: S.muted, fontSize: 14, lineHeight: 1.6, margin: '0 0 16px' }}>{loc.desc}</p>
                  <div style={{ fontSize: 12, color: S.red, fontWeight: 600, marginBottom: 16 }}>{loc.areas}</div>
                  <a href="#" style={{ color: S.red, fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                    Learn More <ArrowRight size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
 
      {/* ── SEASONAL SPECIAL BANNER ── */}
      <section style={{ background: '#1a4a2e', padding: '64px 0' }}>
        <div style={{ ...S.container, display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.1)', borderRadius: 999, padding: '5px 14px', marginBottom: 20 }}>
              <Sparkles size={12} color="#f1c40f" /><span style={{ color: '#f1c40f', fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>SEASONAL SPECIAL</span>
            </div>
            <h2 style={{ color: '#fff', fontSize: 32, fontWeight: 900, margin: '0 0 12px' }}>
              Winter Was Rough. <span style={{ color: '#f1c40f' }}>Your Building Shows It.</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,.75)', fontSize: 16, margin: '0 0 24px', maxWidth: 540 }}>
              Salt, slush, and months of grime have wrecked your carpets and floors. Commercial spring deep cleans, vacant unit turnovers for property managers, and more.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
              {[{ icon: Snowflake, l: 'Salt Removal' }, { icon: Wind, l: 'Carpet Deep Clean' }, { icon: Building2, l: 'Vacant Units' }].map(t => (
                <div key={t.l} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.1)', borderRadius: 999, padding: '7px 16px', color: '#fff', fontSize: 13, fontWeight: 600 }}>
                  <t.icon size={14} /> {t.l}
                </div>
              ))}
            </div>
            <Link to="/contact" style={{ ...S.btn('#f1c40f', '#1a4a2e'), fontSize: 15, padding: '14px 28px', fontWeight: 800 }}>
              Learn More <ArrowRight size={16} />
            </Link>
          </div>
          <div style={{ display: 'flex', gap: 16, flexShrink: 0 }}>
            {[{ v: '1,500+', l: 'Spring Cleans Done' }, { v: '48hr', l: 'Turnaround Time' }].map(s => (
              <div key={s.l} style={{ background: 'rgba(255,255,255,.1)', borderRadius: 16, padding: '24px 28px', textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: '#f1c40f' }}>{s.v}</div>
                <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 13, marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── TRANSFORMATION GALLERY ── */}
      <section style={{ padding: '100px 0', background: S.offWhite }}>
        <div style={{ ...S.container, textAlign: 'center' }}>
          <div style={{ ...S.pill, background: '#f0f0f0', color: S.text }}>TRANSFORMATION GALLERY</div>
          <h2 style={{ ...S.sectionTitle, marginBottom: 48 }}>Our Work</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 28 }}>
            {GALLERY.map((g, i) => <BeforeAfterCard key={i} label={g.label} sub={g.sub} />)}
          </div>
          <div style={{ marginTop: 40 }}>
            <Link to="/gallery" style={{ ...S.btn(S.red, '#fff'), fontSize: 15, padding: '14px 32px' }}>
              All Office Cleaning Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
 
      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '100px 0', background: S.white }}>
        <div style={{ ...S.container, textAlign: 'center' }}>
          <div style={S.pill}><Star size={12} /> CLIENT REVIEWS</div>
          <h2 style={S.sectionTitle}>What Our Clients Say</h2>
          <p style={{ ...S.sectionSub }}>Don't just take our word for it — hear from the businesses we've served.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: i === 1 ? S.dark : S.offWhite, borderRadius: 20, padding: 32, textAlign: 'left', border: `1px solid ${i === 1 ? 'transparent' : S.border}` }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={16} fill="#f39c12" color="#f39c12" />)}
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.7, fontStyle: 'italic', color: i === 1 ? '#dce4f0' : S.text, margin: '0 0 24px' }}>"{t.content}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: S.red, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontSize: 18 }}>{t.initial}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: i === 1 ? '#fff' : S.dark }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: i === 1 ? '#8892a0' : S.muted }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── FINAL CTA ── */}
      <section style={{ padding: '100px 0', background: `linear-gradient(135deg,${S.dark} 0%,#2c1810 100%)` }}>
        <div style={{ ...S.container, textAlign: 'center' }}>
          <h2 style={{ color: '#fff', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, margin: '0 0 16px' }}>
            Ready to Experience the Difference?
          </h2>
          <p style={{ color: '#8892a0', fontSize: 18, margin: '0 0 48px', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
            Get your free quote today and discover why hundreds of businesses trust us with their cleaning needs.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 64 }}>
            <Link to="/contact" style={{ ...S.btn(S.red, '#fff'), fontSize: 16, padding: '16px 36px' }}>
              Get Your Free Quote <ArrowRight size={18} />
            </Link>
            <a href="tel:6479736745" style={{ ...S.btn('transparent', '#fff', '2px solid rgba(255,255,255,.25)'), fontSize: 16, padding: '16px 36px' }}>
              <Phone size={18} /> Call Us Now
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, maxWidth: 720, margin: '0 auto' }}>
            {[
              { icon: CheckCircle, t: 'Free, no-obligation quotes' },
              { icon: Calendar, t: 'Flexible scheduling options' },
              { icon: Award, t: '100% satisfaction guarantee' },
            ].map(item => (
              <div key={item.t} style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', color: '#8892a0', fontSize: 14 }}>
                <item.icon size={18} color={S.red} /> {item.t}
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── FOOTER ── */}
      <footer style={{ background: '#0d0d1a', color: '#8892a0', padding: '60px 0 32px' }}>
        <div style={{ ...S.container }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: S.red, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 18 }}>CS</div>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#fff' }}>Naina Cleaning Services</div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>Professional residential and commercial cleaning services in Mississauga.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href="tel:6479736745" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8892a0', textDecoration: 'none', fontSize: 14 }}>
                  <Phone size={15} color={S.red} /> 647-973-6745
                </a>
                <a href="mailto:ZUNAIRAZ@GMAIL.COM" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8892a0', textDecoration: 'none', fontSize: 14 }}>
                  <Mail size={15} color={S.red} /> ZUNAIRAZ@GMAIL.COM
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                  <MapPin size={15} color={S.red} /> 1386 Mississauga Rd, Mississauga, ON L5H 2J4
                </div>
              </div>
            </div>
            {[
              { title: 'Services', links: ['Office Cleaning', 'Janitorial Services', 'Post-Construction', 'Carpet Cleaning', 'Floor Maintenance', 'Window Cleaning'] },
              { title: 'Company', links: ['About Us', 'Our Team', 'Careers', 'Gallery', 'Blog'] },
              { title: 'Service Areas', links: ['Downtown Core', 'West End', 'East Side', 'North Quarter', 'South District'] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 15, margin: '0 0 20px' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.links.map(l => <li key={l}><a href="#" style={{ color: '#8892a0', textDecoration: 'none', fontSize: 14, transition: 'color .2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#8892a0'}>{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <span style={{ fontSize: 13 }}>© 2025 CleanService Inc. All rights reserved.</span>
            <div style={{ display: 'flex', gap: 24 }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
                <a key={l} href="#" style={{ color: '#8892a0', textDecoration: 'none', fontSize: 13 }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
 
export default Home;