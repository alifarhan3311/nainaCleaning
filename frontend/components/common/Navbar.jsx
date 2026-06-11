import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/* ── same tokens as Services page ── */
const RED   = '#c0392b';
const DARK  = '#1a1a2e';
const MUTED = '#6b7280';
const TEXT  = '#2d2d2d';

const NAV_LINKS = [
  { name: 'Home',     path: '/' },
  { name: 'About',    path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Gallery',  path: '/gallery' },
  { name: 'Contact',  path: '/contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 200,
      background: scrolled ? 'rgba(255,255,255,.97)' : '#fff',
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,.08)' : '0 1px 0 #e5e7eb',
      transition: 'all .3s',
    }}>

      {/* ── main bar ── */}
      <div style={{
        maxWidth: 1140, margin: '0 auto', padding: '0 24px',
        display: 'flex', alignItems: 'center', height: 68, gap: 8,
      }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginRight: 12, flexShrink: 0 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, background: RED,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 900, fontSize: 15,
          }}>NC</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: DARK, lineHeight: 1.2 }}>Naina Cleaning</div>
            <div style={{ fontSize: 10, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Professional Cleaning</div>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="nav-links-desktop">
          {NAV_LINKS.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              style={{
                color: isActive(path) ? RED : TEXT,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 14,
                padding: '4px 2px',
                borderBottom: isActive(path) ? `2px solid ${RED}` : '2px solid transparent',
                whiteSpace: 'nowrap',
                transition: 'color .18s',
              }}
            >{name}</Link>
          ))}
        </div>

        {/* Desktop right */}
        <div className="nav-right-desktop">
          <a href="tel:6479736745" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            color: RED, fontWeight: 700, fontSize: 13,
            textDecoration: 'none', whiteSpace: 'nowrap',
          }}>
            <Phone size={14} /> 647-973-6745
          </a>

          {isAuthenticated ? (
            <>
              <Link to="/admin" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                color: TEXT, textDecoration: 'none', fontWeight: 600,
                fontSize: 13, padding: '8px 14px',
                border: '1px solid #e5e7eb', borderRadius: 8,
                whiteSpace: 'nowrap',
              }}>
                <Shield size={13} /> Admin
              </Link>
              <button onClick={logout} style={{
                background: '#374151', color: '#fff', border: 'none',
                borderRadius: 8, padding: '9px 18px',
                fontWeight: 700, fontSize: 13, cursor: 'pointer',
              }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{
                color: TEXT, textDecoration: 'none', fontWeight: 600,
                fontSize: 13, padding: '8px 16px',
                border: '1px solid #e5e7eb', borderRadius: 8,
                whiteSpace: 'nowrap',
              }}>Login</Link>
              <Link to="/contact" style={{
                background: RED, color: '#fff', textDecoration: 'none',
                borderRadius: 8, padding: '9px 20px',
                fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap',
              }}>Free Quote</Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="nav-hamburger"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, marginLeft: 'auto' }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} color={TEXT} /> : <Menu size={22} color={TEXT} />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div style={{ background: '#fff', borderTop: '1px solid #f3f4f6', padding: '12px 24px 24px' }}>
          {NAV_LINKS.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block', padding: '12px 0',
                borderBottom: '1px solid #f9fafb',
                color: isActive(path) ? RED : TEXT,
                textDecoration: 'none', fontWeight: 600, fontSize: 15,
              }}
            >{name}</Link>
          ))}

          <a href="tel:6479736745" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            color: RED, fontWeight: 700, fontSize: 14,
            textDecoration: 'none', padding: '12px 0',
            borderBottom: '1px solid #f9fafb',
          }}>
            <Phone size={15} /> 647-973-6745
          </a>

          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            {isAuthenticated ? (
              <>
                <Link to="/admin" onClick={() => setMenuOpen(false)} style={{
                  flex: 1, textAlign: 'center', padding: '11px',
                  border: '1px solid #e5e7eb', borderRadius: 8,
                  color: TEXT, textDecoration: 'none', fontWeight: 600, fontSize: 14,
                }}>Admin Panel</Link>
                <button onClick={() => { logout(); setMenuOpen(false); }} style={{
                  flex: 1, background: '#374151', color: '#fff',
                  border: 'none', borderRadius: 8, padding: '11px',
                  fontWeight: 700, fontSize: 14, cursor: 'pointer',
                }}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} style={{
                  flex: 1, textAlign: 'center', padding: '11px',
                  border: '1px solid #e5e7eb', borderRadius: 8,
                  color: TEXT, textDecoration: 'none', fontWeight: 600, fontSize: 14,
                }}>Login</Link>
                <Link to="/contact" onClick={() => setMenuOpen(false)} style={{
                  flex: 1, textAlign: 'center',
                  background: RED, color: '#fff',
                  textDecoration: 'none', borderRadius: 8,
                  padding: '11px', fontWeight: 700, fontSize: 14,
                }}>Free Quote</Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        .nav-links-desktop {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 28px;
          margin-left: 8px;
        }
        .nav-right-desktop {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-left: auto;
          flex-shrink: 0;
        }
        .nav-hamburger { display: none !important; }

        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-right-desktop  { display: none !important; }
          .nav-hamburger      { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
