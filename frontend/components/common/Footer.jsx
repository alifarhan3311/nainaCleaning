import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const C = {
  red: '#c0392b',
  muted: '#8892a0',
  border: 'rgba(255,255,255,.07)',
};
const wrap = { maxWidth: 1140, margin: '0 auto', padding: '0 24px' };

const Footer = () => (
  <footer style={{ background: '#0d0d1a', color: C.muted, padding: '60px 0 28px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
    <div style={{ ...wrap }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>

        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 17 }}>NC</div>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#fff' }}>Naina Cleaning Services</div>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 24, maxWidth: 280 }}>
            Professional residential and commercial cleaning services in Mississauga. Trusted by hundreds of clients since 2000.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href="tel:6479736745" style={{ display: 'flex', alignItems: 'center', gap: 8, color: C.muted, textDecoration: 'none', fontSize: 14, transition: 'color .2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = C.muted}
            >
              <Phone size={14} color={C.red} /> 647-973-6745
            </a>
            <a href="mailto:ZUNAIRAZ@GMAIL.COM" style={{ display: 'flex', alignItems: 'center', gap: 8, color: C.muted, textDecoration: 'none', fontSize: 14, transition: 'color .2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = C.muted}
            >
              <Mail size={14} color={C.red} /> ZUNAIRAZ@GMAIL.COM
            </a>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14 }}>
              <MapPin size={14} color={C.red} style={{ marginTop: 2, flexShrink: 0 }} />
              1386 Mississauga Rd, Mississauga, ON L5H 2J4
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 14, margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[['Home', '/'], ['About', '/about'], ['Services', '/services'], ['Gallery', '/gallery'], ['Contact', '/contact']].map(([label, path]) => (
              <li key={label}>
                <Link to={path} style={{ color: C.muted, textDecoration: 'none', fontSize: 14, transition: 'color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = C.muted}
                >{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 14, margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Services</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['Office Cleaning', 'Janitorial Services', 'Post-Construction', 'Carpet Cleaning', 'Floor Maintenance', 'Window Cleaning'].map(s => (
              <li key={s}>
                <Link to="/services" style={{ color: C.muted, textDecoration: 'none', fontSize: 14, transition: 'color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = C.muted}
                >{s}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Business Hours */}
        <div>
          <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 14, margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Business Hours</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['Mon – Fri', '8:00 AM – 6:00 PM'],
              ['Saturday', '9:00 AM – 4:00 PM'],
              ['Sunday', 'Emergency only'],
            ].map(([day, hours]) => (
              <div key={day} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ color: C.muted }}>{day}</span>
                <span style={{ color: '#ccc', fontWeight: 600 }}>{hours}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, background: 'rgba(192,57,43,.15)', border: '1px solid rgba(192,57,43,.3)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>Need urgent cleaning?</div>
            <a href="tel:6479736745" style={{ color: C.red, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>Call us now →</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontSize: 13 }}>© {new Date().getFullYear()} Naina Cleaning Services. All rights reserved.</span>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
            <a key={l} href="#" style={{ color: C.muted, textDecoration: 'none', fontSize: 13, transition: 'color .2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = C.muted}
            >{l}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
