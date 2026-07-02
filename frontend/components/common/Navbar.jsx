import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Shield, PaintBucket } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_LINKS = [
  { name: 'Home',     path: '/' },
  { name: 'About',    path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact',   path: '/contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow">
              <PaintBucket className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-white tracking-tight">
                Naina<span className="text-primary">Clean</span>
              </span>
              <p className="text-[10px] text-surface-muted -mt-1 tracking-widest uppercase">
                Premium Services
              </p>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(path)
                    ? 'text-primary bg-primary/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >{name}</Link>
            ))}
          </div>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:6479736745" className="flex items-center gap-2 text-sm text-surface-muted hover:text-accent transition-colors">
              <Phone size={14} /> 647-973-6745
            </a>

            {isAuthenticated ? (
              <>
                <Link to="/admin" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all">
                  <Shield size={14} /> Admin
                </Link>
                <button onClick={logout} className="px-4 py-2 bg-white/10 text-white text-sm font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                  Login
                </Link>
                <Link to="/contact" className="btn-primary !py-2.5 !px-5 text-sm">
                  Get Free Quote
                </Link>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} className="text-white" /> : <Menu size={22} className="text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden glass border-t border-white/10 px-4 py-4 space-y-1">
          {NAV_LINKS.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive(path)
                  ? 'text-primary bg-primary/10'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >{name}</Link>
          ))}
          <div className="pt-3 border-t border-white/10 space-y-2">
            {isAuthenticated ? (
              <>
                <Link to="/admin" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all">
                  <Shield size={14} /> Admin
                </Link>
                <button onClick={() => { logout(); setMenuOpen(false); }} className="w-full px-4 py-3 bg-white/10 text-white text-sm font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all">
                  Login
                </Link>
                <Link to="/contact" onClick={() => setMenuOpen(false)} className="btn-primary w-full justify-center">
                  Get Free Quote
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
