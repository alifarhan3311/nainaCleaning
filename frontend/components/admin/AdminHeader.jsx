import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, User, Bell, ExternalLink, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header style={{
      background: '#fff',
      borderBottom: '1px solid #e5e7eb',
      padding: '0 24px',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0,
      position: 'sticky',
      top: 0,
      zIndex: 30,
    }}>
      {/* Left — hamburger + page title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          onClick={onMenuClick}
          className="admin-hamburger-btn"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8, color: '#374151', display: 'none' }}
        >
          <Menu size={22} />
        </button>
        <div>
          <div style={{ fontWeight: 800, fontSize: 17, color: '#0f172a' }}>Admin Panel</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>Naina Cleaning Services</div>
        </div>
      </div>

      {/* Right — view site + user info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link
          to="/"
          target="_blank"
          style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', textDecoration: 'none', fontSize: 13, fontWeight: 600, padding: '7px 14px', border: '1px solid #e5e7eb', borderRadius: 8, transition: 'all .2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#c0392b'; e.currentTarget.style.color = '#c0392b'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#64748b'; }}
        >
          <ExternalLink size={14} /> View Site
        </Link>

        {/* User badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: 10, padding: '7px 14px' }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: user?.role === 'superadmin' ? '#7c3aed' : '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {user?.role === 'superadmin' ? <Shield size={14} color="#fff" /> : <User size={14} color="#fff" />}
          </div>
          <div className="admin-user-info">
            <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a', lineHeight: 1.2 }}>{user?.username || 'Admin'}</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>{user?.role === 'superadmin' ? 'Super Admin' : 'Admin'}</div>
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
