import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, User, ExternalLink, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 flex-shrink-0 border-b border-white/10"
      style={{ background: '#0B1220', height: 64, position: 'sticky', top: 0, zIndex: 30 }}
    >
      {/* Left — hamburger + page title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="admin-hamburger-btn bg-none border-none cursor-pointer p-1.5 rounded-lg text-surface-muted hover:text-white transition-colors hidden"
        >
          <Menu size={22} />
        </button>
        <div>
          <div className="text-white font-extrabold text-lg leading-tight">Admin Panel</div>
          <div className="text-surface-muted text-xs">Naina Cleaning Services</div>
        </div>
      </div>

      {/* Right — view site + user info */}
      <div className="flex items-center gap-3">
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-1.5 text-surface-muted no-underline text-sm font-semibold px-4 py-2 rounded-lg border border-white/10 hover:border-primary/50 hover:text-primary transition-all"
        >
          <ExternalLink size={14} /> View Site
        </Link>

        {/* User badge */}
        <div className="flex items-center gap-2.5 rounded-xl px-4 py-2 border border-white/10" style={{ background: 'rgba(255,255,255,.03)' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-primary">
            {user?.role === 'superadmin' ? <Shield size={14} color="#fff" /> : <User size={14} color="#fff" />}
          </div>
          <div className="admin-user-info">
            <div className="text-white font-bold text-sm leading-tight">{user?.username || 'Admin'}</div>
            <div className="text-surface-muted text-xs">{user?.role === 'superadmin' ? 'Super Admin' : 'Admin'}</div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .admin-hamburger-btn { display: flex !important; }
        }
        @media (max-width: 640px) {
          .admin-user-info { display: none; }
        }
      `}</style>
    </header>
  );
};

export default AdminHeader;
