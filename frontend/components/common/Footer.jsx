import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, PaintBucket } from 'lucide-react';

const Footer = () => (
  <footer className="bg-midnight border-t border-white/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center shadow-lg shadow-primary/30">
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
          <p className="text-surface-muted text-sm leading-relaxed mb-6">
            Professional residential and commercial cleaning services in Mississauga. Trusted by hundreds of clients since 2000.
          </p>
        
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
            <span className="w-1 h-5 bg-primary rounded-full"></span>
            Quick Links
          </h4>
          <ul className="space-y-3">
            {[['Home', '/'], ['About', '/about'], ['Services', '/services'], ['Contact', '/contact']].map(([label, path]) => (
              <li key={label}>
                <Link to={path} className="text-surface-muted hover:text-white transition-colors text-sm inline-flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-px bg-primary transition-all duration-200"></span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
            <span className="w-1 h-5 bg-accent rounded-full"></span>
            Services
          </h4>
          <ul className="space-y-3">
            {['Office Cleaning', 'Janitorial Services', 'Post-Construction', 'Carpet Cleaning', 'Floor Maintenance', 'Window Cleaning'].map(s => (
              <li key={s}>
                <Link to="/services" className="text-surface-muted hover:text-white transition-colors text-sm inline-flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-px bg-accent transition-all duration-200"></span>
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Business Hours */}
        <div>
          <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
            <span className="w-1 h-5 bg-teal rounded-full"></span>
            Business Hours
          </h4>
          <div className="space-y-3">
            {[
              ['Mon – Fri', '8:00 AM – 6:00 PM'],
              ['Saturday', '9:00 AM – 4:00 PM'],
              ['Sunday', 'Emergency only'],
            ].map(([day, hours]) => (
              <div key={day} className="flex justify-between text-sm">
                <span className="text-surface-muted">{day}</span>
                <span className="text-white/80 font-medium">{hours}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-primary/10 border border-primary/30 rounded-xl p-4">
            <div className="text-white font-semibold text-sm mb-2">Need urgent cleaning?</div>
            <a href="tel:6479736745" className="text-primary font-bold text-sm hover:text-primary-300 transition-colors flex items-center gap-1">
              Call us now <span>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-surface-muted text-sm">© {new Date().getFullYear()} Naina Cleaning Services. All rights reserved.</span>
        <div className="flex gap-6">
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
            <a key={l} href="#" className="text-surface-muted hover:text-white text-sm transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
