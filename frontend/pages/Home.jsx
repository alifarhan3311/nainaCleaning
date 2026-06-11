import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import {
  Sparkles, Shield, Clock, Award, CheckCircle, ArrowRight, Star,
  Phone, Mail, MapPin, ChevronDown, Play, Users, Building2,
  Leaf, BadgeCheck, Wrench, Calendar, ThumbsUp, Quote,
  Sun, Snowflake, Home as HomeIcon, Briefcase, Store, Factory, Wind,
  Check, StarHalf, ArrowUpRight, Sparkle
} from 'lucide-react';

/* ─────────────────────────────────────────────
   STATS
───────────────────────────────────────────── */
const STATS = [
  { value: '25+', label: 'Years Experience', icon: Award },
  { value: '500+', label: 'Happy Clients', icon: Users },
  { value: '50+', label: 'Team Members', icon: Briefcase },
  { value: '98%', label: 'Satisfaction Rate', icon: ThumbsUp },
];

/* ─────────────────────────────────────────────
   FEATURES
───────────────────────────────────────────── */
const FEATURES = [
  { icon: BadgeCheck, title: 'The Right Clean for Your Site', desc: 'Every building is different. We assess your space, understand your operations, and build a custom cleaning plan that fits - no cookie-cutter packages.', color: 'primary' },
  { icon: Briefcase, title: 'Focus on Your Business', desc: 'Stop worrying about cleaning. We show up on time, every time - so you can focus on running your business while we handle the rest.', color: 'accent' },
  { icon: Users, title: 'A Real Partnership', desc: "We're not just a vendor - we're an extension of your team. Your dedicated account manager knows your building, your people, and your standards.", color: 'teal' },
  { icon: Shield, title: 'Problems Solved, Not Created', desc: 'Missed cleanings, poor quality, no communication - we have heard it all. With us, those problems disappear. Guaranteed.', color: 'primary' },
  { icon: Leaf, title: 'Eco-Friendly Products', desc: 'We use certified green cleaning products safe for your employees, clients, and the environment - without compromising cleaning power.', color: 'accent' },
  { icon: Award, title: 'Fully Insured & Bonded', desc: 'Complete peace of mind with comprehensive insurance coverage. Our entire team is background-checked, bonded, and professionally trained.', color: 'teal' },
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
   TESTIMONIALS
───────────────────────────────────────────── */
const TESTIMONIALS = [
  { name: 'Sarah Johnson', role: 'Office Manager', content: 'Naina Cleaning has transformed our office. Their team is professional, reliable, and always goes above and beyond. We highly recommend them!', rating: 5, initial: 'S' },
  { name: 'Michael Chen', role: 'Business Owner', content: "Best cleaning service for our office. They're reliable, efficient, and always leave our workspace spotless. Been with them 3 years now.", rating: 5, initial: 'M' },
  { name: 'Emily Rodriguez', role: 'Property Manager', content: "I've been using their services for years. Consistent quality and excellent customer service. Switching to them was the best decision.", rating: 5, initial: 'E' },
];

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

/* ══════════════════════════════════════════════
   HOME PAGE COMPONENT
══════════════════════════════════════════════ */
const Home = () => {
  return (
    <div className="min-h-screen bg-midnight">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-midnight via-card to-midnight"></div>
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-teal/10 rounded-full blur-[128px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fadeInUp">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <Sparkle className="w-4 h-4" />
                Premium Cleaning Services in Mississauga
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Experience the
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-400 to-accent">
                  Midnight Luxe Clean
                </span>
              </h1>
              
              <p className="text-lg text-surface-muted mb-8 max-w-xl leading-relaxed">
                Professional residential and commercial cleaning services that transform your space. 
                Trusted by 500+ clients with a 98% satisfaction rate.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
                  Get Free Quote <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/services" className="btn-secondary inline-flex items-center gap-2 text-base px-8 py-4">
                  Our Services
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-teal" />
                  <span className="text-sm text-surface-muted">Fully Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-accent" />
                  <span className="text-sm text-surface-muted">Eco-Friendly</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-sm text-surface-muted">25+ Years</span>
                </div>
              </div>
            </div>

            {/* Right - Stats Cards */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((stat, i) => (
                  <div key={stat.label} className={`glass-card p-6 animate-fadeInUp`} style={{ animationDelay: `${i * 100}ms` }}>
                    <stat.icon className="w-8 h-8 text-primary mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">
                      <AnimCounter target={stat.value} />
                    </div>
                    <div className="text-sm text-surface-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 glass p-4 rounded-2xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-amber-600 flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">4.9/5 Rating</div>
                    <div className="text-xs text-surface-muted">Based on 500+ reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/50" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-surface-muted max-w-2xl mx-auto">
              We don't just clean — we deliver an experience. Here's why hundreds of Mississauga businesses and homeowners trust us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <div key={feature.title} className="group glass-card p-6 hover:border-primary/30 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                  feature.color === 'primary' ? 'bg-primary/20 text-primary' :
                  feature.color === 'accent' ? 'bg-accent/20 text-accent' :
                  'bg-teal/20 text-teal'
                }`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-surface-muted text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 relative bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <span className="text-teal text-sm font-semibold tracking-wider uppercase">Our Services</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
                Premium Cleaning Solutions
              </h2>
            </div>
            <Link to="/services" className="btn-secondary inline-flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: HomeIcon, title: 'Residential', desc: 'Home cleaning & deep cleaning', color: 'primary' },
              { icon: Building2, title: 'Commercial', desc: 'Office & facility cleaning', color: 'teal' },
              { icon: Sparkles, title: 'Deep Clean', desc: 'Intensive sanitization', color: 'accent' },
              { icon: Wind, title: 'Carpet Care', desc: 'Steam & stain removal', color: 'primary' },
            ].map((service, i) => (
              <Link key={service.title} to="/services" className="group glass-card p-6 hover:border-primary/30 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl mb-4 flex items-center justify-center ${
                  service.color === 'primary' ? 'bg-primary/20 text-primary group-hover:bg-primary/30' :
                  service.color === 'teal' ? 'bg-teal/20 text-teal group-hover:bg-teal/30' :
                  'bg-accent/20 text-accent group-hover:bg-accent/30'
                } transition-colors`}>
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{service.title}</h3>
                <p className="text-surface-muted text-sm">{service.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-semibold tracking-wider uppercase">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, i) => (
              <div key={testimonial.name} className="glass-card p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-surface-muted text-sm leading-relaxed mb-6">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.initial}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{testimonial.name}</div>
                    <div className="text-surface-muted text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal/20 rounded-full blur-[100px]"></div>
            <div className="relative">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready for a Cleaner Space?
              </h2>
              <p className="text-surface-muted mb-8 max-w-xl mx-auto">
                Get your free quote today. Our team is ready to transform your home or office with premium cleaning services.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
                  Get Free Quote <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:6479736745" className="btn-secondary inline-flex items-center gap-2 text-base px-8 py-4">
                  <Phone className="w-4 h-4" /> 647-973-6745
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

/* ══════════════════════════════════════════════
   MAIN HOME COMPONENT
══════════════════════════════════════════════ */
// const Home = () => {
//   const [postalCode, setPostalCode] = useState('');
//   const [areaResult, setAreaResult] = useState(null);

//   // Hero quote form state
//   const [quoteForm, setQuoteForm] = useState({
//     name: '', company: '', email: '', phone: '', service: '', frequency: '', sqft: '', message: '',
//   });
//   const [quoteSubmitting, setQuoteSubmitting] = useState(false);
//   const [quoteSuccess, setQuoteSuccess] = useState(false);

//   const handleQuoteChange = (e) => {
//     const { name, value } = e.target;
//     setQuoteForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleQuoteSubmit = async (e) => {
//     e.preventDefault();
//     if (!quoteForm.name || !quoteForm.email || !quoteForm.phone) {
//       alert('Please fill in your name, email and phone number.');
//       return;
//     }
//     setQuoteSubmitting(true);
//     try {
//       const messageText = `Service: ${quoteForm.service || 'N/A'} | Frequency: ${quoteForm.frequency || 'N/A'} | Size: ${quoteForm.sqft || 'N/A'} | Company: ${quoteForm.company || 'N/A'}${quoteForm.message ? ` | Notes: ${quoteForm.message}` : ''}`;
//       await api.post('/messages', {
//         name: quoteForm.name,
//         email: quoteForm.email,
//         phone: quoteForm.phone,
//         service: quoteForm.service,
//         message: messageText,
//       });
//       setQuoteSuccess(true);
//       setQuoteForm({ name: '', company: '', email: '', phone: '', service: '', frequency: '', sqft: '', message: '' });
//     } catch (err) {
//       alert('Failed to send request. Please try again or call us directly.');
//     } finally {
//       setQuoteSubmitting(false);
//     }
//   };

//   // Load real services from API
//   const [apiServices, setApiServices] = useState(MOCK_SERVICES);
//   useEffect(() => {
//     serviceService.getServices({ active: 'true', limit: 20 })
//       .then(res => {
//         if (res.success && res.data.services && res.data.services.length > 0) {
//           const mapped = res.data.services.map((s, i) => ({
//             id: s._id,
//             title: s.title,
//             icon: i % 2 === 0 ? HomeIcon : Building2,
//             description: s.description,
//             color: i % 2 === 0 ? '#e8f0ff' : '#fff0e8',
//           }));
//           setApiServices(mapped);
//         }
//       })
//       .catch(() => {});
//   }, []);
 
//   const checkArea = () => {
//     if (postalCode.trim()) {
//       setAreaResult(`Great news! We serve your area (${postalCode.toUpperCase()}). Our team is ready to provide a free estimate.`);
//     }
//   };

//   return (
//     <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: S.text, background: S.white }}>
//       <Navbar />

//       {/* ── HERO ── */}
//       <section style={{ background: 'linear-gradient(120deg,#1a1a2e 60%,#2c1810)', minHeight: '92vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
//         {/* BG circles */}
//         {[['top:10%,left:60%', '#c0392b22', 500], ['bottom:5%,left:5%', '#ffffff08', 300]].map(([pos, bg, size], i) => (
//           <div key={i} style={{ position: 'absolute', width: size, height: size, borderRadius: '50%', background: bg, filter: 'blur(80px)', ...Object.fromEntries(pos.split(',').map(p => p.split(':'))) }} />
//         ))}
 
//         <div style={{ ...S.container, display: 'grid', gridTemplateColumns: '1fr 420px', gap: 60, alignItems: 'center', padding: '80px 24px' }}>
//           {/* Left */}
//           <div>
//             <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(192,57,43,.2)', border: '1px solid rgba(192,57,43,.4)', borderRadius: 999, padding: '6px 14px', marginBottom: 24 }}>
//               <Star size={13} fill="#f39c12" color="#f39c12" />
//               <span style={{ color: '#f1c40f', fontSize: 12, fontWeight: 700 }}>Rated 5.0 • Mississauga's Most Trusted Cleaning Service</span>
//             </div>
//             <h1 style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, margin: '0 0 20px' }}>
//               Residential &<br />
//               <span style={{ color: S.red }}>Commercial</span><br />
//               Cleaning Services
//             </h1>
//             <p style={{ color: '#bdc3d0', fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 500 }}>
//               Welcome to Naina Cleaning Services — your trusted provider of professional residential and commercial cleaning in Mississauga. We deliver exceptional results for homes and businesses.
//             </p>
//             <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 48 }}>
//               <Link to="/contact" style={{ ...S.btn(S.red, '#fff'), fontSize: 16, padding: '16px 32px' }}>
//                 Get Free Quote <ArrowRight size={18} />
//               </Link>
//               <a href="tel:6479736745" style={{ ...S.btn('transparent', '#fff', '2px solid rgba(255,255,255,.3)'), fontSize: 16, padding: '16px 32px' }}>
//                 <Phone size={18} /> Call Us
//               </a>
//             </div>
//             {/* Stats */}
//             <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
//               {STATS.map(s => (
//                 <div key={s.label}>
//                   <div style={{ fontSize: 32, fontWeight: 900, color: '#fff' }}><AnimCounter target={s.value} /></div>
//                   <div style={{ color: '#8892a0', fontSize: 13, marginTop: 2 }}>{s.label}</div>
//                 </div>
//               ))}
//             </div>
//             {/* Badges */}
//             <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
//               {['ISSA Member', 'Ottawa Board of Trade', '100% Canadian Owned'].map(b => (
//                 <div key={b} style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, padding: '6px 14px', color: '#ccc', fontSize: 12, fontWeight: 600 }}>{b}</div>
//               ))}
//             </div>
//           </div>
 
//           {/* Quote Form */}
//           <div style={{ background: '#fff', borderRadius: 20, padding: 36, boxShadow: '0 24px 80px rgba(0,0,0,.4)' }}>
//             {quoteSuccess ? (
//               <div style={{ textAlign: 'center', padding: '32px 0' }}>
//                 <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#e8f8ee', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
//                   <CheckCircle size={32} color="#27ae60" />
//                 </div>
//                 <h3 style={{ fontSize: 22, fontWeight: 800, color: S.dark, margin: '0 0 8px' }}>Request Sent!</h3>
//                 <p style={{ color: S.muted, fontSize: 14, margin: '0 0 24px' }}>We'll get back to you within 24 hours.</p>
//                 <button onClick={() => setQuoteSuccess(false)} style={{ ...S.btn(S.red, '#fff'), fontSize: 14, padding: '10px 24px' }}>
//                   Send Another Request
//                 </button>
//               </div>
//             ) : (
//               <form onSubmit={handleQuoteSubmit}>
//                 <h3 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: S.dark }}>Request a Quote</h3>
//                 <p style={{ color: S.muted, fontSize: 14, margin: '0 0 24px' }}>Fill out the form and we'll get back to you promptly.</p>
//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
//                   {[['Full Name *', 'name', 'John Doe'], ['Company', 'company', 'Company Ltd.'], ['Email *', 'email', 'email@example.com'], ['Phone *', 'phone', '(555) 555-0123']].map(([label, fieldName, ph]) => (
//                     <div key={fieldName}>
//                       <label style={{ fontSize: 12, fontWeight: 600, color: S.muted, display: 'block', marginBottom: 4 }}>{label}</label>
//                       <input
//                         name={fieldName}
//                         value={quoteForm[fieldName]}
//                         onChange={handleQuoteChange}
//                         placeholder={ph}
//                         type={fieldName === 'email' ? 'email' : fieldName === 'phone' ? 'tel' : 'text'}
//                         style={{ width: '100%', padding: '10px 12px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
//                       />
//                     </div>
//                   ))}
//                 </div>
//                 <div style={{ marginTop: 12 }}>
//                   <label style={{ fontSize: 12, fontWeight: 600, color: S.muted, display: 'block', marginBottom: 4 }}>Service Type *</label>
//                   <select name="service" value={quoteForm.service} onChange={handleQuoteChange} style={{ width: '100%', padding: '10px 12px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 14, outline: 'none' }}>
//                     <option value="">Select a service</option>
//                     {apiServices.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
//                   </select>
//                 </div>
//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
//                   <div>
//                     <label style={{ fontSize: 12, fontWeight: 600, color: S.muted, display: 'block', marginBottom: 4 }}>Frequency</label>
//                     <select name="frequency" value={quoteForm.frequency} onChange={handleQuoteChange} style={{ width: '100%', padding: '10px 12px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 14, outline: 'none' }}>
//                       {['Select frequency', 'Daily', 'Weekly', 'Bi-weekly', 'Monthly'].map(o => <option key={o}>{o}</option>)}
//                     </select>
//                   </div>
//                   <div>
//                     <label style={{ fontSize: 12, fontWeight: 600, color: S.muted, display: 'block', marginBottom: 4 }}>Square Footage</label>
//                     <select name="sqft" value={quoteForm.sqft} onChange={handleQuoteChange} style={{ width: '100%', padding: '10px 12px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 14, outline: 'none' }}>
//                       {['Approx. size', '< 1,000 sq ft', '1,000–5,000', '5,000–20,000', '20,000+'].map(o => <option key={o}>{o}</option>)}
//                     </select>
//                   </div>
//                 </div>
//                 <div style={{ marginTop: 12 }}>
//                   <label style={{ fontSize: 12, fontWeight: 600, color: S.muted, display: 'block', marginBottom: 4 }}>Additional Details</label>
//                   <textarea name="message" value={quoteForm.message} onChange={handleQuoteChange} placeholder="Tell us about your specific cleaning needs..." rows={3} style={{ width: '100%', padding: '10px 12px', border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
//                 </div>
//                 <button type="submit" disabled={quoteSubmitting} style={{ ...S.btn(S.red, '#fff'), width: '100%', justifyContent: 'center', marginTop: 16, padding: '14px', fontSize: 15, borderRadius: 10, opacity: quoteSubmitting ? 0.7 : 1 }}>
//                   {quoteSubmitting ? 'Sending...' : (<>Get My Free Estimate <ArrowRight size={16} /></>)}
//                 </button>
//                 <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 12 }}>
//                   {['24h Response', 'No Obligation'].map(t => (
//                     <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#27ae60', fontWeight: 600 }}>
//                       <CheckCircle size={13} /> {t}
//                     </span>
//                   ))}
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       </section>
 
//       {/* ── YOUR CLEANING SOLUTIONS ── */}
//       <section style={{ background: S.offWhite, padding: '100px 0' }}>
//         <div style={{ ...S.container, textAlign: 'center' }}>
//           <div style={S.pill}><Sparkles size={12} /> YOUR CLEANING SOLUTIONS</div>
//           <h2 style={S.sectionTitle}>Janitorial & Commercial Cleaning —<br /><span style={{ color: S.red }}>You've Come to the Right Place.</span></h2>
//           <p style={S.sectionSub}>Looking for a reliable cleaning company that understands your needs? We're your trusted partner. Here's what you get when you work with us.</p>
 
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
//             {FEATURES.map((f, i) => (
//               <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '32px 28px', textAlign: 'left', border: `1px solid ${S.border}`, transition: 'box-shadow .2s', boxShadow: '0 2px 12px rgba(0,0,0,.04)' }}
//                 onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(192,57,43,.12)'}
//                 onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,.04)'}
//               >
//                 <div style={{ width: 52, height: 52, borderRadius: 14, background: S.redLight, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
//                   <f.icon size={24} color={S.red} />
//                 </div>
//                 <h3 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 10px', color: S.dark }}>{f.title}</h3>
//                 <p style={{ color: S.muted, fontSize: 14, lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
//               </div>
//             ))}
//           </div>
 
//           <div style={{ marginTop: 48, background: `linear-gradient(135deg,${S.red},#e74c3c)`, borderRadius: 20, padding: '40px 48px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
//             <div>
//               <h3 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800 }}>CleanService — Your janitorial & commercial cleaning solutions.</h3>
//               <p style={{ margin: 0, opacity: .85, fontSize: 15 }}>Since 2000, we've been helping businesses keep their spaces spotless.</p>
//             </div>
//             <Link to="/contact" style={{ ...S.btn('#fff', S.red), fontSize: 15, padding: '14px 28px', whiteSpace: 'nowrap' }}>
//               Get Your Free Quote <ArrowRight size={16} />
//             </Link>
//           </div>
//         </div>
//       </section>
 
//       {/* ── WHY CHOOSE US ── */}
//       <section style={{ padding: '100px 0', background: S.white }}>
//         <div style={{ ...S.container, textAlign: 'center' }}>
//           <div style={S.pill}><ThumbsUp size={12} /> WHY CHOOSE US</div>
//           <h2 style={S.sectionTitle}>The Trusted Choice for<br /><span style={{ color: S.red }}>Your Business</span></h2>
//           <p style={S.sectionSub}>For over 25 years, local businesses have trusted us to keep their spaces spotless. Here's why.</p>
 
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 40, alignItems: 'center', textAlign: 'left', marginBottom: 64 }}>
//             {/* Left copy */}
//             <div>
//               <h3 style={{ fontSize: 28, fontWeight: 800, color: S.dark, margin: '0 0 20px' }}>Family-Owned Business,<br />Personalized Service</h3>
//               <p style={{ color: S.muted, fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>Unlike big franchises, we treat every client like a partner. As a local family-owned business, we understand your workspace reflects your brand. That's why we tailor every cleaning plan to your specific needs.</p>
//               <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
//                 {[
//                   'Direct communication with management — no call centres',
//                   'Same trusted team assigned to your location every visit',
//                   'Custom cleaning plans built around your schedule',
//                   'Quick response times — we\'re right here for you',
//                 ].map(item => (
//                   <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: S.text, fontSize: 15 }}>
//                     <CheckCircle size={18} color={S.red} style={{ flexShrink: 0, marginTop: 2 }} /> {item}
//                   </li>
//                 ))}
//               </ul>
//               <div style={{ display: 'flex', gap: 16 }}>
//                 {[{ v: '25+', l: 'Years in Business' }, { v: '500+', l: 'Happy Clients' }].map(s => (
//                   <div key={s.l} style={{ background: S.offWhite, borderRadius: 14, padding: '20px 28px', textAlign: 'center' }}>
//                     <div style={{ fontSize: 36, fontWeight: 900, color: S.red }}><AnimCounter target={s.v} /></div>
//                     <div style={{ fontSize: 13, color: S.muted, marginTop: 4 }}>{s.l}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             {/* Right testimonial card */}
//             <div style={{ background: S.dark, borderRadius: 20, padding: 36, color: '#fff' }}>
//               <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
//                 {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#f39c12" color="#f39c12" />)}
//               </div>
//               <Quote size={32} color={S.red} style={{ marginBottom: 16 }} />
//               <p style={{ fontSize: 17, lineHeight: 1.7, fontStyle: 'italic', margin: '0 0 28px', color: '#dce4f0' }}>
//                 "CleanService has transformed our office. Their team is professional, reliable, and always goes above and beyond. We highly recommend them!"
//               </p>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
//                 <div style={{ width: 44, height: 44, borderRadius: '50%', background: S.red, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18, color: '#fff' }}>S</div>
//                 <div>
//                   <div style={{ fontWeight: 700, fontSize: 15 }}>Sarah M.</div>
//                   <div style={{ color: '#8892a0', fontSize: 13 }}>Office Manager</div>
//                 </div>
//               </div>
//             </div>
//           </div>
 
//           {/* Why 4 icons */}
//           <div style={{ background: S.dark, borderRadius: 20, padding: '48px 40px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32 }}>
//             {WHY.map(w => (
//               <div key={w.title} style={{ textAlign: 'center' }}>
//                 <div style={{ width: 60, height: 60, borderRadius: 16, background: 'rgba(192,57,43,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
//                   <w.icon size={26} color={S.red} />
//                 </div>
//                 <div style={{ fontWeight: 800, fontSize: 16, color: '#fff', marginBottom: 6 }}>{w.title}</div>
//                 <div style={{ color: '#8892a0', fontSize: 13 }}>{w.sub}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
 
//       {/* ── OUR SERVICES ── */}
//       <section style={{ padding: '100px 0', background: S.offWhite }}>
//         <div style={{ ...S.container, textAlign: 'center' }}>
//           <div style={S.pill}><Sparkles size={12} /> OUR EXPERTISE</div>
//           <h2 style={S.sectionTitle}>Commercial Cleaning Solutions</h2>
//           <p style={{ ...S.sectionSub }}>Comprehensive cleaning solutions for every need — from daily office maintenance to specialized deep cleans.</p>
 
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
//             {apiServices.map(s => (
//               <div key={s.id} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: `1px solid ${S.border}`, textAlign: 'left', transition: 'transform .2s,box-shadow .2s' }}
//                 onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,.1)'; }}
//                 onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
//               >
//                 <div style={{ height: 140, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                   <s.icon size={48} color={S.red} strokeWidth={1.5} />
//                 </div>
//                 <div style={{ padding: '24px 24px 20px' }}>
//                   <h3 style={{ margin: '0 0 10px', fontSize: 18, fontWeight: 800, color: S.dark }}>{s.title}</h3>
//                   <p style={{ color: S.muted, fontSize: 14, lineHeight: 1.6, margin: '0 0 20px' }}>{s.description}</p>
//                   <a href="#" style={{ color: S.red, fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
//                     Learn More <ArrowRight size={15} />
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
 
//           <div style={{ marginTop: 40 }}>
//             <Link to="/services" style={{ ...S.btn('transparent', S.red, `2px solid ${S.red}`), fontSize: 15, padding: '14px 32px' }}>
//               View All Services <ArrowRight size={16} />
//             </Link>
//           </div>
//         </div>
//       </section>
 
//       {/* ── COMMERCIAL CLEANING SECTION ── */}
//       <section style={{ padding: '100px 0', background: S.white }}>
//         <div style={{ ...S.container, textAlign: 'center' }}>
//           <div style={S.pill}><Building2 size={12} /> COMMERCIAL CLEANING</div>
//           <h2 style={S.sectionTitle}>Professional Services in Ottawa and Gatineau</h2>
//           <p style={{ ...S.sectionSub }}>In today's business world, maintaining a clean and professional work environment is essential for employee health, productivity, and the impression you make on clients.</p>
 
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start', textAlign: 'left', marginBottom: 64 }}>
//             {/* Why clean matters */}
//             <div>
//               <h3 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 20px', color: S.dark }}>Why a Clean Environment Matters</h3>
//               {[
//                 { icon: Users, title: 'Employee Health', desc: 'Sanitized surfaces and good air quality reduce the spread of germs and illness.' },
//                 { icon: Award, title: 'Increased Productivity', desc: 'Employees are more motivated and focused in a clean, organized environment.' },
//                 { icon: Star, title: 'Client Impressions', desc: 'A spotless office communicates professionalism and attention to detail.' },
//                 { icon: Shield, title: 'Compliance & Safety', desc: 'Meet health and safety standards required in commercial spaces.' },
//               ].map(item => (
//                 <div key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, background: S.offWhite, borderRadius: 12, padding: '16px 20px', marginBottom: 12 }}>
//                   <div style={{ width: 36, height: 36, borderRadius: 10, background: S.redLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//                     <item.icon size={18} color={S.red} />
//                   </div>
//                   <div>
//                     <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.title}</div>
//                     <div style={{ color: S.muted, fontSize: 13, lineHeight: 1.5 }}>{item.desc}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             {/* Spaces we serve */}
//             <div>
//               <h3 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 20px', color: S.dark }}>Spaces We Serve</h3>
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
//                 {SPACES.map(sp => (
//                   <div key={sp.label} style={{ background: S.redLight, borderRadius: 14, padding: '24px 12px', textAlign: 'center', border: `1px solid #f5c0bb` }}>
//                     <sp.icon size={32} color={S.red} style={{ marginBottom: 10 }} />
//                     <div style={{ fontWeight: 700, fontSize: 14, color: S.dark }}>{sp.label}</div>
//                   </div>
//                 ))}
//               </div>
//               <div style={{ marginTop: 28, background: S.dark, borderRadius: 16, padding: '28px 28px' }}>
//                 <h4 style={{ color: '#fff', margin: '0 0 8px', fontSize: 18, fontWeight: 800 }}>Why Choose Professional Cleaning?</h4>
//                 <p style={{ color: '#8892a0', fontSize: 14, margin: '0 0 20px' }}>Outsourcing your cleaning services offers significant advantages over in-house staff.</p>
//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
//                   {WHY.map(w => (
//                     <div key={w.title} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//                       <w.icon size={16} color={S.red} />
//                       <div>
//                         <div style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>{w.title}</div>
//                         <div style={{ color: '#8892a0', fontSize: 11 }}>{w.sub}</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
 
//       {/* ── SERVICE AREA + POSTAL CHECKER ── */}
//       <section style={{ padding: '100px 0', background: S.offWhite }}>
//         <div style={{ ...S.container }}>
//           {/* Service area banner */}
//           <div style={{ background: `linear-gradient(120deg,${S.red},#e74c3c)`, borderRadius: 20, padding: '48px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 64 }}>
//             <div>
//               <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.15)', borderRadius: 999, padding: '5px 14px', marginBottom: 16 }}>
//                 <MapPin size={12} color="#fff" /><span style={{ color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>SERVICE AREA</span>
//               </div>
//               <h3 style={{ color: '#fff', fontSize: 28, fontWeight: 900, margin: '0 0 10px' }}>Serving Our Region with Excellence</h3>
//               <p style={{ color: 'rgba(255,255,255,.8)', fontSize: 15, margin: '0 0 20px' }}>Our local knowledge means we understand the unique climate challenges of our region and tailor our services accordingly.</p>
//               <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
//                 {[
//                   { icon: Snowflake, label: 'Winter Cleaning' },
//                   { icon: Sun, label: 'Summer Maintenance' },
//                 ].map(tag => (
//                   <div key={tag.label} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.15)', borderRadius: 999, padding: '7px 16px', color: '#fff', fontSize: 13, fontWeight: 600 }}>
//                     <tag.icon size={14} /> {tag.label}
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <Link to="/contact" style={{ ...S.btn('#fff', S.red), fontSize: 15, padding: '14px 28px', whiteSpace: 'nowrap' }}>
//               Get Your Free Quote <ArrowRight size={16} />
//             </Link>
//           </div>
 
//           {/* Postal checker */}
//           <div style={{ textAlign: 'center', marginBottom: 64 }}>
//             <div style={S.pill}><MapPin size={12} /> SERVICE AREA CHECKER</div>
//             <h2 style={{ ...S.sectionTitle, marginBottom: 12 }}>Are we in <span style={{ color: S.red }}>your area?</span></h2>
//             <p style={{ color: S.muted, fontSize: 16, marginBottom: 32 }}>Enter your postal code to check if your business is in our service area.</p>
//             <div style={{ display: 'flex', gap: 0, maxWidth: 420, margin: '0 auto', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,.1)', border: `1px solid ${S.border}` }}>
//               <input
//                 value={postalCode}
//                 onChange={e => setPostalCode(e.target.value)}
//                 placeholder="e.g. K1A 0B1"
//                 style={{ flex: 1, padding: '14px 20px', border: 'none', fontSize: 15, outline: 'none' }}
//                 onKeyDown={e => e.key === 'Enter' && checkArea()}
//               />
//               <button onClick={checkArea} style={{ ...S.btn(S.red, '#fff'), borderRadius: 0, padding: '14px 24px', fontSize: 14 }}>Check</button>
//             </div>
//             {areaResult && (
//               <div style={{ marginTop: 20, background: '#e8f8ee', border: '1px solid #27ae60', borderRadius: 12, padding: '14px 24px', color: '#1a7a40', fontSize: 15, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
//                 <CheckCircle size={18} /> {areaResult}
//               </div>
//             )}
//           </div>
 
//           {/* Service areas grid */}
//           <div style={{ textAlign: 'center', marginBottom: 40 }}>
//             <div style={S.pill}><MapPin size={12} /> SERVICE AREAS</div>
//             <h2 style={S.sectionTitle}>Service Areas in Your City</h2>
//             <p style={{ ...S.sectionSub }}>We proudly serve the entire region, including all major neighbourhoods.</p>
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 48 }}>
//               {['City Centre', 'West End', 'East Side', 'Downtown Core', 'North Quarter', 'South District', 'Industrial Zone', 'Business Park'].map(area => (
//                 <div key={area} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: `1px solid ${S.border}`, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 600, color: S.text }}>
//                   <span style={{ width: 8, height: 8, borderRadius: '50%', background: S.red, flexShrink: 0 }}></span> {area}
//                 </div>
//               ))}
//             </div>
//           </div>
 
//           {/* Office cleaning by location */}
//           <div style={{ textAlign: 'center', marginBottom: 40 }}>
//             <div style={S.pill}><Building2 size={12} /> OFFICE CLEANING</div>
//             <h2 style={S.sectionTitle}>Office Cleaning Services by Location</h2>
//             <p style={{ ...S.sectionSub }}>Professional office cleaning services tailored to every neighbourhood. Find your location below.</p>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
//               {LOCATIONS.map(loc => (
//                 <div key={loc.name} style={{ background: '#fff', borderRadius: 16, padding: '28px', border: `1px solid ${S.border}`, textAlign: 'left', transition: 'box-shadow .2s' }}
//                   onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,.08)'}
//                   onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
//                 >
//                   <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
//                     <div style={{ width: 40, height: 40, borderRadius: 10, background: S.redLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                       <MapPin size={18} color={S.red} />
//                     </div>
//                     <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: S.dark }}>{loc.name}</h3>
//                   </div>
//                   <p style={{ color: S.muted, fontSize: 14, lineHeight: 1.6, margin: '0 0 16px' }}>{loc.desc}</p>
//                   <div style={{ fontSize: 12, color: S.red, fontWeight: 600, marginBottom: 16 }}>{loc.areas}</div>
//                   <a href="#" style={{ color: S.red, fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
//                     Learn More <ArrowRight size={14} />
//                   </a>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
 
//       {/* ── SEASONAL SPECIAL BANNER ── */}
//       <section style={{ background: '#1a4a2e', padding: '64px 0' }}>
//         <div style={{ ...S.container, display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
//           <div>
//             <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.1)', borderRadius: 999, padding: '5px 14px', marginBottom: 20 }}>
//               <Sparkles size={12} color="#f1c40f" /><span style={{ color: '#f1c40f', fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>SEASONAL SPECIAL</span>
//             </div>
//             <h2 style={{ color: '#fff', fontSize: 32, fontWeight: 900, margin: '0 0 12px' }}>
//               Winter Was Rough. <span style={{ color: '#f1c40f' }}>Your Building Shows It.</span>
//             </h2>
//             <p style={{ color: 'rgba(255,255,255,.75)', fontSize: 16, margin: '0 0 24px', maxWidth: 540 }}>
//               Salt, slush, and months of grime have wrecked your carpets and floors. Commercial spring deep cleans, vacant unit turnovers for property managers, and more.
//             </p>
//             <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
//               {[{ icon: Snowflake, l: 'Salt Removal' }, { icon: Wind, l: 'Carpet Deep Clean' }, { icon: Building2, l: 'Vacant Units' }].map(t => (
//                 <div key={t.l} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.1)', borderRadius: 999, padding: '7px 16px', color: '#fff', fontSize: 13, fontWeight: 600 }}>
//                   <t.icon size={14} /> {t.l}
//                 </div>
//               ))}
//             </div>
//             <Link to="/contact" style={{ ...S.btn('#f1c40f', '#1a4a2e'), fontSize: 15, padding: '14px 28px', fontWeight: 800 }}>
//               Learn More <ArrowRight size={16} />
//             </Link>
//           </div>
//           <div style={{ display: 'flex', gap: 16, flexShrink: 0 }}>
//             {[{ v: '1,500+', l: 'Spring Cleans Done' }, { v: '48hr', l: 'Turnaround Time' }].map(s => (
//               <div key={s.l} style={{ background: 'rgba(255,255,255,.1)', borderRadius: 16, padding: '24px 28px', textAlign: 'center' }}>
//                 <div style={{ fontSize: 32, fontWeight: 900, color: '#f1c40f' }}>{s.v}</div>
//                 <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 13, marginTop: 4 }}>{s.l}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
 
//       {/* ── TRANSFORMATION GALLERY ── */}
//       <section style={{ padding: '100px 0', background: S.offWhite }}>
//         <div style={{ ...S.container, textAlign: 'center' }}>
//           <div style={{ ...S.pill, background: '#f0f0f0', color: S.text }}>TRANSFORMATION GALLERY</div>
//           <h2 style={{ ...S.sectionTitle, marginBottom: 48 }}>Our Work</h2>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 28 }}>
//             {GALLERY.map((g, i) => <BeforeAfterCard key={i} label={g.label} sub={g.sub} />)}
//           </div>
//           <div style={{ marginTop: 40 }}>
//             <Link to="/gallery" style={{ ...S.btn(S.red, '#fff'), fontSize: 15, padding: '14px 32px' }}>
//               All Office Cleaning Services <ArrowRight size={16} />
//             </Link>
//           </div>
//         </div>
//       </section>
 
//       {/* ── TESTIMONIALS ── */}
//       <section style={{ padding: '100px 0', background: S.white }}>
//         <div style={{ ...S.container, textAlign: 'center' }}>
//           <div style={S.pill}><Star size={12} /> CLIENT REVIEWS</div>
//           <h2 style={S.sectionTitle}>What Our Clients Say</h2>
//           <p style={{ ...S.sectionSub }}>Don't just take our word for it — hear from the businesses we've served.</p>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
//             {TESTIMONIALS.map((t, i) => (
//               <div key={i} style={{ background: i === 1 ? S.dark : S.offWhite, borderRadius: 20, padding: 32, textAlign: 'left', border: `1px solid ${i === 1 ? 'transparent' : S.border}` }}>
//                 <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
//                   {[...Array(t.rating)].map((_, j) => <Star key={j} size={16} fill="#f39c12" color="#f39c12" />)}
//                 </div>
//                 <p style={{ fontSize: 15, lineHeight: 1.7, fontStyle: 'italic', color: i === 1 ? '#dce4f0' : S.text, margin: '0 0 24px' }}>"{t.content}"</p>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//                   <div style={{ width: 44, height: 44, borderRadius: '50%', background: S.red, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontSize: 18 }}>{t.initial}</div>
//                   <div>
//                     <div style={{ fontWeight: 700, color: i === 1 ? '#fff' : S.dark }}>{t.name}</div>
//                     <div style={{ fontSize: 13, color: i === 1 ? '#8892a0' : S.muted }}>{t.role}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
 
//       {/* ── FINAL CTA ── */}
//       <section style={{ padding: '100px 0', background: `linear-gradient(135deg,${S.dark} 0%,#2c1810 100%)` }}>
//         <div style={{ ...S.container, textAlign: 'center' }}>
//           <h2 style={{ color: '#fff', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, margin: '0 0 16px' }}>
//             Ready to Experience the Difference?
//           </h2>
//           <p style={{ color: '#8892a0', fontSize: 18, margin: '0 0 48px', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
//             Get your free quote today and discover why hundreds of businesses trust us with their cleaning needs.
//           </p>
//           <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 64 }}>
//             <Link to="/contact" style={{ ...S.btn(S.red, '#fff'), fontSize: 16, padding: '16px 36px' }}>
//               Get Your Free Quote <ArrowRight size={18} />
//             </Link>
//             <a href="tel:6479736745" style={{ ...S.btn('transparent', '#fff', '2px solid rgba(255,255,255,.25)'), fontSize: 16, padding: '16px 36px' }}>
//               <Phone size={18} /> Call Us Now
//             </a>
//           </div>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, maxWidth: 720, margin: '0 auto' }}>
//             {[
//               { icon: CheckCircle, t: 'Free, no-obligation quotes' },
//               { icon: Calendar, t: 'Flexible scheduling options' },
//               { icon: Award, t: '100% satisfaction guarantee' },
//             ].map(item => (
//               <div key={item.t} style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', color: '#8892a0', fontSize: 14 }}>
//                 <item.icon size={18} color={S.red} /> {item.t}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
 
//       {/* ── FOOTER ── */}
//       <footer style={{ background: '#0d0d1a', color: '#8892a0', padding: '60px 0 32px' }}>
//         <div style={{ ...S.container }}>
//           <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
//             <div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
//                 <div style={{ width: 42, height: 42, borderRadius: 10, background: S.red, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 18 }}>CS</div>
//                 <div style={{ fontWeight: 800, fontSize: 16, color: '#fff' }}>Naina Cleaning Services</div>
//               </div>
//               <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>Professional residential and commercial cleaning services in Mississauga.</p>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//                 <a href="tel:6479736745" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8892a0', textDecoration: 'none', fontSize: 14 }}>
//                   <Phone size={15} color={S.red} /> 647-973-6745
//                 </a>
//                 <a href="mailto:ZUNAIRAZ@GMAIL.COM" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8892a0', textDecoration: 'none', fontSize: 14 }}>
//                   <Mail size={15} color={S.red} /> ZUNAIRAZ@GMAIL.COM
//                 </a>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
//                   <MapPin size={15} color={S.red} /> 1386 Mississauga Rd, Mississauga, ON L5H 2J4
//                 </div>
//               </div>
//             </div>
//             {[
//               { title: 'Services', links: ['Office Cleaning', 'Janitorial Services', 'Post-Construction', 'Carpet Cleaning', 'Floor Maintenance', 'Window Cleaning'] },
//               { title: 'Company', links: ['About Us', 'Our Team', 'Careers', 'Gallery', 'Blog'] },
//               { title: 'Service Areas', links: ['Downtown Core', 'West End', 'East Side', 'North Quarter', 'South District'] },
//             ].map(col => (
//               <div key={col.title}>
//                 <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 15, margin: '0 0 20px' }}>{col.title}</h4>
//                 <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
//                   {col.links.map(l => <li key={l}><a href="#" style={{ color: '#8892a0', textDecoration: 'none', fontSize: 14, transition: 'color .2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#8892a0'}>{l}</a></li>)}
//                 </ul>
//               </div>
//             ))}
//           </div>
//           <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
//             <span style={{ fontSize: 13 }}>© 2025 CleanService Inc. All rights reserved.</span>
//             <div style={{ display: 'flex', gap: 24 }}>
//               {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
//                 <a key={l} href="#" style={{ color: '#8892a0', textDecoration: 'none', fontSize: 13 }}>{l}</a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };
 
// export default Home;