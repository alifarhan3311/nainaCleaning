import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { ArrowRight, Phone, LayoutGrid, X, Sparkle } from 'lucide-react';

const ITEMS = [
  { id: 1, title: 'Residential Cleaning', category: 'Residential', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop', desc: 'Professional home cleaning services' },
  { id: 2, title: 'Office Cleaning', category: 'Commercial', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', desc: 'Clean and organized office spaces' },
  { id: 3, title: 'Kitchen Deep Clean', category: 'Residential', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop', desc: 'Thorough kitchen cleaning & sanitization' },
  { id: 4, title: 'Retail Space', category: 'Commercial', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop', desc: 'Retail store professional cleaning' },
  { id: 5, title: 'Bathroom Cleaning', category: 'Residential', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop', desc: 'Sparkling clean bathrooms' },
  { id: 6, title: 'Conference Room', category: 'Commercial', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=600&fit=crop', desc: 'Professional meeting space maintenance' },
  { id: 7, title: 'Living Room', category: 'Residential', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', desc: 'Comfortable, immaculate living areas' },
  { id: 8, title: 'Warehouse', category: 'Commercial', image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=600&fit=crop', desc: 'Industrial space deep cleaning' },
];

const CATS = ['All', 'Residential', 'Commercial'];

const Gallery = () => {
  const [selected, setSelected] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = selected === 'All' ? ITEMS : ITEMS.filter(i => i.category === selected);

  return (
    <div className="min-h-screen bg-midnight font-sans">
      <Navbar />

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,.85)' }}
        >
          <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer" style={{ background: 'rgba(255,255,255,.15)' }}>
            <X size={20} color="#fff" />
          </button>
          <div onClick={e => e.stopPropagation()} className="max-w-3xl w-full">
            <img src={lightbox.image} alt={lightbox.title} className="w-full rounded-2xl object-cover" style={{ maxHeight: '70vh' }} />
            <div className="mt-4 text-center">
              <div className="text-white font-bold text-lg">{lightbox.title}</div>
              <div className="text-surface-muted text-sm mt-1">{lightbox.desc}</div>
            </div>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(120deg, #0B1220 55%, #2c1810)', padding: '72px 0 80px' }}>
        <div className="absolute top-0 right-[5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-white/5 blur-[60px]" />
        <div className="max-w-7xl mx-auto px-6 relative text-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-[11px] font-bold tracking-wider uppercase mb-4">
            <LayoutGrid size={12} /> OUR GALLERY
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
            Our <span className="text-primary">Work</span> Gallery
          </h1>
          <p className="text-surface-muted text-lg leading-relaxed max-w-xl mx-auto mb-10">
            See the quality of our work through our portfolio of completed residential and commercial cleaning projects.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Get a Free Quote <ArrowRight size={17} />
            </Link>
            <a href="tel:6479736745" className="btn-secondary inline-flex items-center gap-2">
              <Phone size={17} /> 647-973-6745
            </a>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-6">

          {/* Filter tabs */}
          <div className="flex justify-center gap-3 mb-12">
            {CATS.map(cat => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`px-7 py-2.5 rounded-full font-bold text-sm cursor-pointer transition-all duration-200 border-2 ${
                  selected === cat
                    ? 'bg-primary border-primary text-white'
                    : 'bg-transparent border-white/10 text-surface-muted hover:border-primary/50 hover:text-white'
                }`}
              >{cat}</button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map(item => (
              <div
                key={item.id}
                onClick={() => setLightbox(item)}
                className="rounded-2xl overflow-hidden relative cursor-pointer group"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,.3)' }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ height: 220, display: 'block' }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-100 opacity-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,.8) 0%, rgba(0,0,0,.2) 50%, transparent 100%)' }}>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="inline-block bg-primary text-white text-[10px] font-bold rounded-full px-3 py-1 mb-2 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <div className="text-white font-bold text-sm">{item.title}</div>
                    <div className="text-white/70 text-xs mt-0.5">{item.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-surface-muted text-base">No items found.</div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-700">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
            Ready to See the Difference?
          </h2>
          <p className="text-white/85 text-lg max-w-lg mx-auto mb-8 leading-relaxed">
            Contact us today for a free quote and experience the same quality shown in our gallery.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-primary font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-white/90 transition-colors">
              Get Free Quote <ArrowRight size={17} />
            </Link>
            <a href="tel:6479736745" className="inline-flex items-center gap-2 bg-transparent text-white border-2 border-white/35 font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors">
              <Phone size={17} /> 647-973-6745
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;

// const ITEMS = [
//   { id: 1, title: 'Residential Cleaning', category: 'Residential', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop', desc: 'Professional home cleaning services' },
//   { id: 2, title: 'Office Cleaning', category: 'Commercial', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', desc: 'Clean and organized office spaces' },
//   { id: 3, title: 'Kitchen Deep Clean', category: 'Residential', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop', desc: 'Thorough kitchen cleaning & sanitization' },
//   { id: 4, title: 'Retail Space', category: 'Commercial', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop', desc: 'Retail store professional cleaning' },
//   { id: 5, title: 'Bathroom Cleaning', category: 'Residential', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop', desc: 'Sparkling clean bathrooms' },
//   { id: 6, title: 'Conference Room', category: 'Commercial', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=600&fit=crop', desc: 'Professional meeting space maintenance' },
//   { id: 7, title: 'Living Room', category: 'Residential', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', desc: 'Comfortable, immaculate living areas' },
//   { id: 8, title: 'Warehouse', category: 'Commercial', image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=600&fit=crop', desc: 'Industrial space deep cleaning' },
// ];

// const CATS = ['All', 'Residential', 'Commercial'];

// const Gallery = () => {
//   const [selected, setSelected] = useState('All');
//   const [lightbox, setLightbox] = useState(null); // item or null

//   const filtered = selected === 'All' ? ITEMS : ITEMS.filter(i => i.category === selected);

//   return (
//     <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, background: C.white }}>
//       <Navbar />

//       {/* Lightbox */}
//       {lightbox && (
//         <div
//           onClick={() => setLightbox(null)}
//           style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
//         >
//           <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(255,255,255,.15)', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
//             <X size={20} color="#fff" />
//           </button>
//           <div onClick={e => e.stopPropagation()} style={{ maxWidth: 800, width: '100%' }}>
//             <img src={lightbox.image} alt={lightbox.title} style={{ width: '100%', borderRadius: 16, objectFit: 'cover' }} />
//             <div style={{ marginTop: 16, textAlign: 'center' }}>
//               <div style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>{lightbox.title}</div>
//               <div style={{ color: '#8892a0', fontSize: 14, marginTop: 4 }}>{lightbox.desc}</div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── HERO ── */}
//       <section style={{ background: `linear-gradient(120deg, ${C.dark} 55%, #2c1810)`, padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
//         <div style={{ position: 'absolute', top: '-10%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(192,57,43,.12)', filter: 'blur(80px)' }} />
//         <div style={{ ...wrap, position: 'relative', textAlign: 'center' }}>
//           <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(192,57,43,.25)', color: '#f87171', border: '1px solid rgba(192,57,43,.4)', borderRadius: 999, padding: '6px 16px', fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 16 }}>
//             <LayoutGrid size={12} /> OUR GALLERY
//           </div>
//           <h1 style={{ fontSize: 'clamp(32px,4.5vw,54px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, margin: '0 0 16px' }}>
//             Our <span style={{ color: C.red }}>Work</span> Gallery
//           </h1>
//           <p style={{ color: '#b0bac8', fontSize: 17, lineHeight: 1.7, maxWidth: 500, margin: '0 auto 36px' }}>
//             See the quality of our work through our portfolio of completed residential and commercial cleaning projects.
//           </p>
//           <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
//             <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.red, color: '#fff', borderRadius: 8, padding: '13px 28px', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
//               Get a Free Quote <ArrowRight size={17} />
//             </Link>
//             <a href="tel:6479736745" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,.25)', borderRadius: 8, padding: '13px 28px', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
//               <Phone size={17} /> 647-973-6745
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* ── GALLERY ── */}
//       <section style={{ padding: '80px 0', background: C.off }}>
//         <div style={{ ...wrap }}>

//           {/* Filter tabs */}
//           <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 48 }}>
//             {CATS.map(cat => (
//               <button
//                 key={cat}
//                 onClick={() => setSelected(cat)}
//                 style={{
//                   padding: '10px 28px', borderRadius: 999, fontWeight: 700, fontSize: 14,
//                   cursor: 'pointer', transition: 'all .18s',
//                   background: selected === cat ? C.red : C.white,
//                   color: selected === cat ? '#fff' : C.muted,
//                   border: `2px solid ${selected === cat ? C.red : C.border}`,
//                 }}
//               >{cat}</button>
//             ))}
//           </div>

//           {/* Grid */}
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
//             {filtered.map(item => (
//               <div
//                 key={item.id}
//                 onClick={() => setLightbox(item)}
//                 style={{ borderRadius: 16, overflow: 'hidden', position: 'relative', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,.08)', transition: 'transform .2s, box-shadow .2s' }}
//                 onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,.15)'; }}
//                 onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,.08)'; }}
//               >
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }}
//                 />
//                 {/* Overlay */}
//                 <div style={{
//                   position: 'absolute', inset: 0,
//                   background: 'linear-gradient(to top, rgba(0,0,0,.75) 0%, transparent 50%)',
//                   display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
//                   padding: '16px',
//                 }}>
//                   <span style={{ display: 'inline-block', background: C.red, color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 999, padding: '3px 10px', marginBottom: 6, alignSelf: 'flex-start', textTransform: 'uppercase', letterSpacing: .8 }}>
//                     {item.category}
//                   </span>
//                   <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{item.title}</div>
//                   <div style={{ color: 'rgba(255,255,255,.75)', fontSize: 12, marginTop: 2 }}>{item.desc}</div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {filtered.length === 0 && (
//             <div style={{ textAlign: 'center', padding: '60px 0', color: C.muted, fontSize: 16 }}>No items found.</div>
//           )}
//         </div>
//       </section>

//       {/* ── CTA ── */}
//       <section style={{ padding: '80px 0', background: `linear-gradient(135deg, ${C.red}, #e74c3c)` }}>
//         <div style={{ ...wrap, textAlign: 'center' }}>
//           <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontWeight: 900, color: '#fff', margin: '0 0 12px' }}>
//             Ready to See the Difference?
//           </h2>
//           <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 17, maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.6 }}>
//             Contact us today for a free quote and experience the same quality shown in our gallery.
//           </p>
//           <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
//             <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: C.red, borderRadius: 8, padding: '14px 32px', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
//               Get Free Quote <ArrowRight size={17} />
//             </Link>
//             <a href="tel:6479736745" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,.35)', borderRadius: 8, padding: '14px 32px', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
//               <Phone size={17} /> 647-973-6745
//             </a>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default Gallery;
