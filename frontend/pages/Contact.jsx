import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle, Send } from 'lucide-react';
import { messageService } from '../services/messageService';
import { useToast } from '../context/ToastContext';

const C = {
  red: '#c0392b', redLight: '#fdecea',
  dark: '#1a1a2e', text: '#2d2d2d',
  muted: '#6b7280', border: '#e5e7eb',
  white: '#ffffff', off: '#f9fafb',
};
const wrap = { maxWidth: 1140, margin: '0 auto', padding: '0 24px' };
const inputStyle = {
  width: '100%', padding: '12px 16px',
  border: `1px solid ${C.border}`, borderRadius: 10,
  fontSize: 14, outline: 'none', boxSizing: 'border-box',
  fontFamily: 'inherit', color: C.text, background: C.white,
  transition: 'border-color .2s',
};
const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 };

const CONTACT_INFO = [
  { icon: Phone, label: 'Phone', value: '647-973-6745', href: 'tel:6479736745', color: '#fdecea', iconColor: '#c0392b' },
  { icon: Mail, label: 'Email', value: 'ZUNAIRAZ@GMAIL.COM', href: 'mailto:ZUNAIRAZ@GMAIL.COM', color: '#eff6ff', iconColor: '#2563eb' },
  { icon: MapPin, label: 'Address', value: '1386 Mississauga Rd, Mississauga, ON L5H 2J4', href: null, color: '#f0fdf4', iconColor: '#16a34a' },
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
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, background: C.white }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ background: `linear-gradient(120deg, ${C.dark} 55%, #2c1810)`, padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(192,57,43,.12)', filter: 'blur(80px)' }} />
        <div style={{ ...wrap, position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(192,57,43,.25)', color: '#f87171', border: '1px solid rgba(192,57,43,.4)', borderRadius: 999, padding: '6px 16px', fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 16 }}>
            <Mail size={12} /> CONTACT US
          </div>
          <h1 style={{ fontSize: 'clamp(32px,4.5vw,54px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, margin: '0 0 16px' }}>
            Get in <span style={{ color: C.red }}>Touch</span>
          </h1>
          <p style={{ color: '#b0bac8', fontSize: 17, lineHeight: 1.7, maxWidth: 500, margin: '0 auto' }}>
            Ready for a cleaner space? Send us a message or call us directly — we respond within 24 hours.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section style={{ padding: '80px 0', background: C.off }}>
        <div style={{ ...wrap }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 48, alignItems: 'start' }}>

            {/* ── Contact Form ── */}
            <div style={{ background: C.white, borderRadius: 20, padding: '40px', boxShadow: '0 4px 32px rgba(0,0,0,.06)', border: `1px solid ${C.border}` }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: C.dark, margin: '0 0 6px' }}>Send Us a Message</h2>
              <p style={{ color: C.muted, fontSize: 14, margin: '0 0 28px' }}>Fill out the form and we'll get back to you within 24 hours.</p>

              {success ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#e8f8ee', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <CheckCircle size={36} color="#27ae60" />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: C.dark, margin: '0 0 8px' }}>Message Sent!</h3>
                  <p style={{ color: C.muted, fontSize: 14, margin: '0 0 24px', lineHeight: 1.7 }}>
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button onClick={() => setSuccess(false)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.red, color: '#fff', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe"
                        style={{ ...inputStyle, borderColor: errors.name ? '#ef4444' : C.border }}
                        onFocus={e => e.target.style.borderColor = C.red}
                        onBlur={e => e.target.style.borderColor = errors.name ? '#ef4444' : C.border}
                      />
                      {errors.name && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.name}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>Phone</label>
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="647-123-4567"
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = C.red}
                        onBlur={e => e.target.style.borderColor = C.border}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com"
                      style={{ ...inputStyle, borderColor: errors.email ? '#ef4444' : C.border }}
                      onFocus={e => e.target.style.borderColor = C.red}
                      onBlur={e => e.target.style.borderColor = errors.email ? '#ef4444' : C.border}
                    />
                    {errors.email && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Service of Interest</label>
                    <select name="service" value={form.service} onChange={handleChange}
                      style={{ ...inputStyle, appearance: 'auto' }}
                      onFocus={e => e.target.style.borderColor = C.red}
                      onBlur={e => e.target.style.borderColor = C.border}
                    >
                      <option value="">Select a service...</option>
                      {['Standard Home Cleaning', 'Deep Home Cleaning', 'Move-In/Move-Out', 'Recurring Maid Service', 'Office Cleaning', 'Janitorial Services', 'Post-Construction Cleaning', 'Carpet Steam Cleaning', 'Floor Maintenance', 'Window Cleaning'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={labelStyle}>Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange}
                      placeholder="Tell us about your cleaning needs, property size, preferred schedule..."
                      rows={5}
                      style={{ ...inputStyle, resize: 'vertical', borderColor: errors.message ? '#ef4444' : C.border }}
                      onFocus={e => e.target.style.borderColor = C.red}
                      onBlur={e => e.target.style.borderColor = errors.message ? '#ef4444' : C.border}
                    />
                    {errors.message && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.message}</p>}
                  </div>

                  <button type="submit" disabled={submitting} style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    background: submitting ? '#e57368' : C.red, color: '#fff', border: 'none',
                    borderRadius: 10, padding: '14px', fontWeight: 700, fontSize: 15,
                    cursor: submitting ? 'not-allowed' : 'pointer', transition: 'background .2s',
                  }}>
                    {submitting ? 'Sending...' : <><Send size={16} /> Send Message</>}
                  </button>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16 }}>
                    {['24h Response', 'No Spam', 'Free Quote'].map(t => (
                      <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#27ae60', fontWeight: 600 }}>
                        <CheckCircle size={12} /> {t}
                      </span>
                    ))}
                  </div>
                </form>
              )}
            </div>

            {/* ── Contact Info ── */}
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: C.dark, margin: '0 0 24px' }}>Contact Information</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
                {CONTACT_INFO.map(({ icon: Icon, label, value, href, color, iconColor }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, background: C.white, borderRadius: 14, padding: '18px 20px', border: `1px solid ${C.border}` }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={20} color={iconColor} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: C.muted, marginBottom: 4 }}>{label}</div>
                      {href ? (
                        <a href={href} style={{ color: C.dark, textDecoration: 'none', fontSize: 15, fontWeight: 600 }}>{value}</a>
                      ) : (
                        <div style={{ color: C.dark, fontSize: 14, fontWeight: 600, lineHeight: 1.5 }}>{value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Business Hours */}
              <div style={{ background: C.white, borderRadius: 14, padding: '24px', border: `1px solid ${C.border}`, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <Clock size={18} color={C.red} />
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: C.dark, margin: 0 }}>Business Hours</h3>
                </div>
                {[
                  { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
                  { day: 'Saturday', hours: '9:00 AM – 4:00 PM' },
                  { day: 'Sunday', hours: 'Emergency only' },
                ].map(({ day, hours }) => (
                  <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.off}`, fontSize: 14 }}>
                    <span style={{ color: C.muted, fontWeight: 500 }}>{day}</span>
                    <span style={{ color: C.dark, fontWeight: 700 }}>{hours}</span>
                  </div>
                ))}
              </div>

              {/* Quick CTA */}
              <div style={{ background: `linear-gradient(135deg, ${C.red}, #e74c3c)`, borderRadius: 14, padding: '24px', color: '#fff' }}>
                <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 800 }}>Need an Urgent Clean?</h3>
                <p style={{ margin: '0 0 16px', color: 'rgba(255,255,255,.85)', fontSize: 14, lineHeight: 1.6 }}>
                  Call us directly for same-day or emergency cleaning requests.
                </p>
                <a href="tel:6479736745" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: C.red, borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
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
