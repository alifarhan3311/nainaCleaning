import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import {
  Award, Users, Shield, Clock, CheckCircle,
  ArrowRight, Phone, Leaf, BadgeCheck, Quote, Star,
} from 'lucide-react';

const C = {
  red: '#c0392b', redLight: '#fdecea',
  dark: '#1a1a2e', text: '#2d2d2d',
  muted: '#6b7280', border: '#e5e7eb',
  white: '#ffffff', off: '#f9fafb',
};
const wrap = { maxWidth: 1140, margin: '0 auto', padding: '0 24px' };
const pill = { display: 'inline-flex', alignItems: 'center', gap: 6, background: C.redLight, color: C.red, borderRadius: 999, padding: '6px 16px', fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 16 };
const h2style = { fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 900, lineHeight: 1.15, color: C.dark, margin: '0 0 14px' };

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
        const t = setInterval(() => { cur += step; if (cur >= num) { setVal(num); clearInterval(t); } else setVal(cur); }, 20);
        obs.disconnect();
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [num]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const VALUES = [
  { icon: Shield, title: 'Trust & Reliability', desc: 'We build lasting relationships through consistent quality and dependable service.' },
  { icon: Award, title: 'Excellence', desc: 'Our team is trained to deliver exceptional cleaning results that exceed expectations.' },
  { icon: Users, title: 'Customer Focus', desc: 'Your satisfaction is our priority. We tailor our services to meet your specific needs.' },
  { icon: Clock, title: 'Punctuality', desc: 'We respect your time and always arrive on schedule, ready to work.' },
];
const STATS = [
  { value: '25+', label: 'Years Experience' },
  { value: '500+', label: 'Happy Clients' },
  { value: '50+', label: 'Team Members' },
  { value: '98%', label: 'Satisfaction Rate' },
];
const WHY = [
  'Experienced and trained professionals',
  'Eco-friendly cleaning products',
  'Flexible scheduling options',
  'Competitive pricing',
  '100% satisfaction guaranteed',
  'Fully insured and bonded',
  'Local family-owned business',
  'Personalized service for every client',
];

const About = () => (
  <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, background: C.white }}>
    <Navbar />

    {/* ── HERO ── */}
    <section style={{ background: `linear-gradient(120deg, ${C.dark} 55%, #2c1810)`, padding: '80px 0 90px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-10%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(192,57,43,.12)', filter: 'blur(80px)' }} />
      <div style={{ ...wrap, position: 'relative', textAlign: 'center' }}>
        <div style={{ ...pill, background: 'rgba(192,57,43,.25)', color: '#f87171', border: '1px solid rgba(192,57,43,.4)', display: 'inline-flex' }}>
          <Users size={12} /> ABOUT US
        </div>
        <h1 style={{ fontSize: 'clamp(32px,4.5vw,56px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, margin: '0 0 18px' }}>
          About <span style={{ color: C.red }}>Naina Cleaning</span> Services
        </h1>
        <p style={{ color: '#b0bac8', fontSize: 17, lineHeight: 1.7, maxWidth: 560, margin: '0 auto 36px' }}>
          Mississauga's trusted provider of residential and commercial cleaning services — family-owned, fully insured, over 25 years of excellence.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.red, color: '#fff', borderRadius: 8, padding: '13px 28px', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
            Get a Free Quote <ArrowRight size={17} />
          </Link>
          <a href="tel:6479736745" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,.25)', borderRadius: 8, padding: '13px 28px', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
            <Phone size={17} /> 647-973-6745
          </a>
        </div>
      </div>
    </section>

    {/* ── STATS ── */}
    <section style={{ background: C.white, padding: '0' }}>
      <div style={{ ...wrap }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, marginTop: -40, position: 'relative', zIndex: 10 }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ background: C.white, padding: '28px 24px', textAlign: 'center', borderRight: i < 3 ? `1px solid ${C.border}` : 'none', boxShadow: '0 8px 40px rgba(0,0,0,.08)', borderRadius: i === 0 ? '12px 0 0 12px' : i === 3 ? '0 12px 12px 0' : 0 }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: C.red, lineHeight: 1 }}><AnimCounter target={s.value} /></div>
              <div style={{ color: C.muted, fontSize: 13, marginTop: 6, fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── OUR STORY ── */}
    <section style={{ padding: '90px 0', background: C.off }}>
      <div style={{ ...wrap }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={pill}><Award size={12} /> OUR STORY</div>
            <h2 style={h2style}>25 Years of Trusted <span style={{ color: C.red }}>Cleaning Excellence</span></h2>
            <p style={{ color: C.muted, fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
              Naina Cleaning Services has been providing exceptional cleaning solutions for homes and businesses in Mississauga and the Greater Toronto Area for over 25 years.
            </p>
            <p style={{ color: C.muted, fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
              What started as a small family-owned business has grown into a trusted name in the cleaning industry. Our commitment to quality, reliability, and customer satisfaction has earned us the trust of hundreds of clients.
            </p>
            <p style={{ color: C.muted, fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>
              We specialize in both residential and commercial cleaning, offering tailored solutions to meet your specific needs — from regular home cleaning to industrial facilities.
            </p>
            <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.red, color: '#fff', borderRadius: 8, padding: '13px 28px', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              View Our Services <ArrowRight size={16} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Mission card */}
            <div style={{ background: `linear-gradient(135deg, ${C.red}, #e74c3c)`, borderRadius: 20, padding: '32px', color: '#fff' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 800 }}>Our Mission</h3>
              <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                To provide exceptional cleaning services that create healthy, comfortable environments while building lasting relationships based on trust and reliability.
              </p>
            </div>
            {/* Vision card */}
            <div style={{ background: C.dark, borderRadius: 20, padding: '32px', color: '#fff' }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#f39c12" color="#f39c12" />)}
              </div>
              <Quote size={24} color={C.red} style={{ marginBottom: 12 }} />
              <p style={{ color: '#dce4f0', fontSize: 15, lineHeight: 1.7, fontStyle: 'italic', margin: '0 0 20px' }}>
                "The same trusted team, every single visit. That's what sets Naina Cleaning apart."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 16 }}>M</div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>Michael R.</div>
                  <div style={{ color: '#8892a0', fontSize: 12 }}>Business Owner, Mississauga</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── VALUES ── */}
    <section style={{ padding: '90px 0', background: C.white }}>
      <div style={{ ...wrap, textAlign: 'center' }}>
        <div style={pill}><BadgeCheck size={12} /> OUR VALUES</div>
        <h2 style={h2style}>The Principles That <span style={{ color: C.red }}>Guide Us</span></h2>
        <p style={{ color: C.muted, fontSize: 16, maxWidth: 520, margin: '0 auto 56px', lineHeight: 1.6 }}>
          Everything we do is guided by four core values that have defined us for 25 years.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {VALUES.map((v, i) => (
            <div key={v.title} style={{ background: C.off, borderRadius: 18, padding: '32px 24px', border: `1px solid ${C.border}`, textAlign: 'left', transition: 'box-shadow .2s, transform .2s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(192,57,43,.12)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 14, background: C.redLight, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <v.icon size={24} color={C.red} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 10px', color: C.dark }}>{v.title}</h3>
              <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── WHY CHOOSE US ── */}
    <section style={{ padding: '90px 0', background: C.off }}>
      <div style={{ ...wrap }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={pill}><Shield size={12} /> WHY CHOOSE US</div>
            <h2 style={h2style}>What Makes Us <span style={{ color: C.red }}>Different</span></h2>
            <p style={{ color: C.muted, fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
              We go above and beyond to deliver exceptional cleaning services. Here's what you get when you work with Naina Cleaning.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {WHY.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: C.text }}>
                  <CheckCircle size={16} color={C.red} style={{ flexShrink: 0, marginTop: 2 }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
          {/* Right: features grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { icon: Shield, t: 'Fully Insured', s: '$5M liability coverage' },
              { icon: Leaf, t: 'Eco Products', s: 'Green-certified & safe' },
              { icon: Users, t: 'Dedicated Team', s: 'Same staff every visit' },
              { icon: Clock, t: 'Flexible Hours', s: 'Morning, evening, weekends' },
              { icon: BadgeCheck, t: 'Background Checked', s: 'All staff vetted & bonded' },
              { icon: Award, t: '100% Guarantee', s: 'Re-clean within 24hrs' },
            ].map(item => (
              <div key={item.t} style={{ background: C.white, borderRadius: 14, padding: '20px', border: `1px solid ${C.border}` }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: C.redLight, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  <item.icon size={20} color={C.red} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.dark, marginBottom: 4 }}>{item.t}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{item.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ── FINAL CTA ── */}
    <section style={{ padding: '80px 0', background: `linear-gradient(135deg, ${C.dark}, #2c1810)` }}>
      <div style={{ ...wrap, textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 900, color: '#fff', margin: '0 0 14px' }}>
          Ready to Work With Us?
        </h2>
        <p style={{ color: '#8892a0', fontSize: 17, maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.6 }}>
          Get a free, no-obligation quote today and experience the Naina Cleaning difference.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.red, color: '#fff', borderRadius: 8, padding: '14px 32px', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
            Get Free Quote <ArrowRight size={17} />
          </Link>
          <a href="tel:6479736745" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,.25)', borderRadius: 8, padding: '14px 32px', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
            <Phone size={17} /> 647-973-6745
          </a>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;
