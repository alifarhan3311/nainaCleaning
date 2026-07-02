import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle, Send, Sparkle } from 'lucide-react';
import { messageService } from '../services/messageService';
import { useToast } from '../context/ToastContext';

const CONTACT_INFO = [
  { icon: Phone, label: 'Phone', value: '647-973-6745', href: 'tel:6479736745', bg: 'rgba(185,28,28,0.2)', iconColor: '#ef4444' },
  { icon: Mail, label: 'Email', value: 'ZUNAIRAZ@GMAIL.COM', href: 'mailto:ZUNAIRAZ@GMAIL.COM', bg: 'rgba(37,99,235,0.2)', iconColor: '#60a5fa' },
  { icon: MapPin, label: 'Address', value: '1386 Mississauga Rd, Mississauga, ON L5H 2J4', href: null, bg: 'rgba(22,163,74,0.2)', iconColor: '#4ade80' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await messageService.sendMessage(form);
      if (res.success) {
        setSuccess(true);
        setForm({ name: '', email: '', phone: '', service: '', message: '' });
        showToast('Message sent successfully!', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Failed to send message. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-midnight font-sans">

      <Navbar />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(120deg, #0B1220 55%, #2c1810)', padding: '72px 0 80px' }}>
        <div className="absolute top-0 right-[5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-white/5 blur-[60px]" />
        <div className="max-w-7xl mx-auto px-6 relative text-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-[11px] font-bold tracking-wider uppercase mb-4">
            <Mail size={12} /> CONTACT US
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-surface-muted text-lg leading-relaxed max-w-xl mx-auto">
            Ready for a cleaner space? Send us a message or call us directly — we respond within 24 hours.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-6">
          {/* <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start"> */}

<div className="justify-content-center col-5">
            {/* ── Contact Form ── */}
            {/* <div className="glass-card p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-white mb-1">Send Us a Message</h2>
              <p className="text-surface-muted text-sm mb-8">Fill out the form and we'll get back to you within 24 hours.</p>

              {success ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-teal/20 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={40} className="text-teal" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-surface-muted text-sm mb-6 leading-relaxed">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button onClick={() => setSuccess(false)} className="btn-primary inline-flex items-center gap-2">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-surface-muted uppercase tracking-wider mb-2">Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe"
                        className={`input-dark w-full ${errors.name ? 'border-red-500' : ''}`}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-surface-muted uppercase tracking-wider mb-2">Phone</label>
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="647-123-4567"
                        className="input-dark w-full"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs font-bold text-surface-muted uppercase tracking-wider mb-2">Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com"
                      className={`input-dark w-full ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs font-bold text-surface-muted uppercase tracking-wider mb-2">Service of Interest</label>
                    <select name="service" value={form.service} onChange={handleChange} className="input-dark w-full">
                      <option value="">Select a service...</option>
                      {['Standard Home Cleaning', 'Deep Home Cleaning', 'Move-In/Move-Out', 'Recurring Maid Service', 'Office Cleaning', 'Janitorial Services', 'Post-Construction Cleaning', 'Carpet Steam Cleaning', 'Floor Maintenance', 'Window Cleaning'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs font-bold text-surface-muted uppercase tracking-wider mb-2">Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange}
                      placeholder="Tell us about your cleaning needs, property size, preferred schedule..."
                      rows={5} className={`input-dark w-full resize-none ${errors.message ? 'border-red-500' : ''}`}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button type="submit" disabled={submitting} className="btn-primary w-full justify-center text-base py-4">
                    {submitting ? 'Sending...' : <><Send size={16} /> Send Message</>}
                  </button>

                  <div className="flex justify-center gap-6 mt-4">
                    {['24h Response', 'No Spam', 'Free Quote'].map(t => (
                      <span key={t} className="flex items-center gap-1.5 text-xs text-teal font-semibold">
                        <CheckCircle size={12} /> {t}
                      </span>
                    ))}
                  </div>
                </form>
              )}
            </div> */}

            {/* ── Contact Info ── */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>

              <div className="flex flex-col gap-4 mb-8">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href, bg, iconColor }) => (
                  <div key={label} className="glass-light flex items-start gap-4 p-5 rounded-xl">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                      <Icon size={20} style={{ color: iconColor }} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-surface-muted uppercase tracking-wider mb-1">{label}</div>
                      {href ? (
                        <a href={href} className="text-white font-semibold text-sm hover:text-primary transition-colors">{value}</a>
                      ) : (
                        <div className="text-white text-sm font-semibold leading-relaxed">{value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Business Hours */}
              <div className="glass-card p-6 mb-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <Clock size={18} className="text-primary" />
                  <h3 className="font-bold text-white text-base m-0">Business Hours</h3>
                </div>
                {[
                  { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
                  { day: 'Saturday', hours: '9:00 AM – 4:00 PM' },
                  { day: 'Sunday', hours: 'Emergency only' },
                ].map(({ day, hours }) => (
                  <div key={day} className="flex justify-between py-3 border-b border-white/5 text-sm">
                    <span className="text-surface-muted font-medium">{day}</span>
                    <span className="text-white font-bold">{hours}</span>
                  </div>
                ))}
              </div>

              {/* Quick CTA */}
              <div className="rounded-2xl p-6 bg-gradient-to-br from-primary to-primary-700">
                <h3 className="text-lg font-bold text-white mb-2">Need an Urgent Clean?</h3>
                <p className="text-white/80 text-sm mb-4 leading-relaxed">
                  Call us directly for same-day or emergency cleaning requests.
                </p>
                <a href="tel:6479736745" className="inline-flex items-center gap-2 bg-white text-primary font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-white/90 transition-colors">
                  <Phone size={15} /> Call 647-973-6745
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

export default Contact;



// const Contact = () => {
//   const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
//   const [errors, setErrors] = useState({});
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const { showToast } = useToast();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(p => ({ ...p, [name]: value }));
//     if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
//   };

//   const validate = () => {
//     const e = {};
//     if (!form.name.trim()) e.name = 'Name is required';
//     if (!form.email.trim()) e.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
//     if (!form.message.trim()) e.message = 'Message is required';
//     else if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setSubmitting(true);
//     try {
//       const res = await messageService.sendMessage(form);
//       if (res.success) {
//         setSuccess(true);
//         setForm({ name: '', email: '', phone: '', service: '', message: '' });
//         showToast('Message sent successfully!', 'success');
//       }
//     } catch (err) {
//       showToast(err.message || 'Failed to send message. Please try again.', 'error');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, background: C.white }}>
//       <Navbar />

//       {/* ── HERO ── */}
//       <section style={{ background: `linear-gradient(120deg, ${C.dark} 55%, #2c1810)`, padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
//         <div style={{ position: 'absolute', top: '-10%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(192,57,43,.12)', filter: 'blur(80px)' }} />
//         <div style={{ ...wrap, position: 'relative', textAlign: 'center' }}>
//           <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(192,57,43,.25)', color: '#f87171', border: '1px solid rgba(192,57,43,.4)', borderRadius: 999, padding: '6px 16px', fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 16 }}>
//             <Mail size={12} /> CONTACT US
//           </div>
//           <h1 style={{ fontSize: 'clamp(32px,4.5vw,54px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, margin: '0 0 16px' }}>
//             Get in <span style={{ color: C.red }}>Touch</span>
//           </h1>
//           <p style={{ color: '#b0bac8', fontSize: 17, lineHeight: 1.7, maxWidth: 500, margin: '0 auto' }}>
//             Ready for a cleaner space? Send us a message or call us directly — we respond within 24 hours.
//           </p>
//         </div>
//       </section>

//       {/* ── MAIN CONTENT ── */}
//       <section style={{ padding: '80px 0', background: C.off }}>
//         <div style={{ ...wrap }}>
//           <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 48, alignItems: 'start' }}>

//             {/* ── Contact Form ── */}
//             <div style={{ background: C.white, borderRadius: 20, padding: '40px', boxShadow: '0 4px 32px rgba(0,0,0,.06)', border: `1px solid ${C.border}` }}>
//               <h2 style={{ fontSize: 22, fontWeight: 800, color: C.dark, margin: '0 0 6px' }}>Send Us a Message</h2>
//               <p style={{ color: C.muted, fontSize: 14, margin: '0 0 28px' }}>Fill out the form and we'll get back to you within 24 hours.</p>

//               {success ? (
//                 <div style={{ textAlign: 'center', padding: '40px 20px' }}>
//                   <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#e8f8ee', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
//                     <CheckCircle size={36} color="#27ae60" />
//                   </div>
//                   <h3 style={{ fontSize: 20, fontWeight: 800, color: C.dark, margin: '0 0 8px' }}>Message Sent!</h3>
//                   <p style={{ color: C.muted, fontSize: 14, margin: '0 0 24px', lineHeight: 1.7 }}>
//                     Thank you for reaching out. We'll get back to you within 24 hours.
//                   </p>
//                   <button onClick={() => setSuccess(false)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.red, color: '#fff', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
//                     Send Another Message
//                   </button>
//                 </div>
//               ) : (
//                 <form onSubmit={handleSubmit}>
//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
//                     <div>
//                       <label style={labelStyle}>Full Name *</label>
//                       <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe"
//                         style={{ ...inputStyle, borderColor: errors.name ? '#ef4444' : C.border }}
//                         onFocus={e => e.target.style.borderColor = C.red}
//                         onBlur={e => e.target.style.borderColor = errors.name ? '#ef4444' : C.border}
//                       />
//                       {errors.name && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.name}</p>}
//                     </div>
//                     <div>
//                       <label style={labelStyle}>Phone</label>
//                       <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="647-123-4567"
//                         style={inputStyle}
//                         onFocus={e => e.target.style.borderColor = C.red}
//                         onBlur={e => e.target.style.borderColor = C.border}
//                       />
//                     </div>
//                   </div>

//                   <div style={{ marginBottom: 16 }}>
//                     <label style={labelStyle}>Email Address *</label>
//                     <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com"
//                       style={{ ...inputStyle, borderColor: errors.email ? '#ef4444' : C.border }}
//                       onFocus={e => e.target.style.borderColor = C.red}
//                       onBlur={e => e.target.style.borderColor = errors.email ? '#ef4444' : C.border}
//                     />
//                     {errors.email && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
//                   </div>

//                   <div style={{ marginBottom: 16 }}>
//                     <label style={labelStyle}>Service of Interest</label>
//                     <select name="service" value={form.service} onChange={handleChange}
//                       style={{ ...inputStyle, appearance: 'auto' }}
//                       onFocus={e => e.target.style.borderColor = C.red}
//                       onBlur={e => e.target.style.borderColor = C.border}
//                     >
//                       <option value="">Select a service...</option>
//                       {['Standard Home Cleaning', 'Deep Home Cleaning', 'Move-In/Move-Out', 'Recurring Maid Service', 'Office Cleaning', 'Janitorial Services', 'Post-Construction Cleaning', 'Carpet Steam Cleaning', 'Floor Maintenance', 'Window Cleaning'].map(s => (
//                         <option key={s} value={s}>{s}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div style={{ marginBottom: 24 }}>
//                     <label style={labelStyle}>Message *</label>
//                     <textarea name="message" value={form.message} onChange={handleChange}
//                       placeholder="Tell us about your cleaning needs, property size, preferred schedule..."
//                       rows={5}
//                       style={{ ...inputStyle, resize: 'vertical', borderColor: errors.message ? '#ef4444' : C.border }}
//                       onFocus={e => e.target.style.borderColor = C.red}
//                       onBlur={e => e.target.style.borderColor = errors.message ? '#ef4444' : C.border}
//                     />
//                     {errors.message && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.message}</p>}
//                   </div>

//                   <button type="submit" disabled={submitting} style={{
//                     width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
//                     background: submitting ? '#e57368' : C.red, color: '#fff', border: 'none',
//                     borderRadius: 10, padding: '14px', fontWeight: 700, fontSize: 15,
//                     cursor: submitting ? 'not-allowed' : 'pointer', transition: 'background .2s',
//                   }}>
//                     {submitting ? 'Sending...' : <><Send size={16} /> Send Message</>}
//                   </button>

//                   <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16 }}>
//                     {['24h Response', 'No Spam', 'Free Quote'].map(t => (
//                       <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#27ae60', fontWeight: 600 }}>
//                         <CheckCircle size={12} /> {t}
//                       </span>
//                     ))}
//                   </div>
//                 </form>
//               )}
//             </div>

//             {/* ── Contact Info ── */}
//             <div>
//               <h2 style={{ fontSize: 22, fontWeight: 800, color: C.dark, margin: '0 0 24px' }}>Contact Information</h2>

//               <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
//                 {CONTACT_INFO.map(({ icon: Icon, label, value, href, color, iconColor }) => (
//                   <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, background: C.white, borderRadius: 14, padding: '18px 20px', border: `1px solid ${C.border}` }}>
//                     <div style={{ width: 44, height: 44, borderRadius: 12, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//                       <Icon size={20} color={iconColor} />
//                     </div>
//                     <div>
//                       <div style={{ fontWeight: 700, fontSize: 13, color: C.muted, marginBottom: 4 }}>{label}</div>
//                       {href ? (
//                         <a href={href} style={{ color: C.dark, textDecoration: 'none', fontSize: 15, fontWeight: 600 }}>{value}</a>
//                       ) : (
//                         <div style={{ color: C.dark, fontSize: 14, fontWeight: 600, lineHeight: 1.5 }}>{value}</div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Business Hours */}
//               <div style={{ background: C.white, borderRadius: 14, padding: '24px', border: `1px solid ${C.border}`, marginBottom: 20 }}>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
//                   <Clock size={18} color={C.red} />
//                   <h3 style={{ fontWeight: 700, fontSize: 16, color: C.dark, margin: 0 }}>Business Hours</h3>
//                 </div>
//                 {[
//                   { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
//                   { day: 'Saturday', hours: '9:00 AM – 4:00 PM' },
//                   { day: 'Sunday', hours: 'Emergency only' },
//                 ].map(({ day, hours }) => (
//                   <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.off}`, fontSize: 14 }}>
//                     <span style={{ color: C.muted, fontWeight: 500 }}>{day}</span>
//                     <span style={{ color: C.dark, fontWeight: 700 }}>{hours}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Quick CTA */}
//               <div style={{ background: `linear-gradient(135deg, ${C.red}, #e74c3c)`, borderRadius: 14, padding: '24px', color: '#fff' }}>
//                 <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 800 }}>Need an Urgent Clean?</h3>
//                 <p style={{ margin: '0 0 16px', color: 'rgba(255,255,255,.85)', fontSize: 14, lineHeight: 1.6 }}>
//                   Call us directly for same-day or emergency cleaning requests.
//                 </p>
//                 <a href="tel:6479736745" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: C.red, borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
//                   <Phone size={15} /> Call 647-973-6745
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default Contact;
