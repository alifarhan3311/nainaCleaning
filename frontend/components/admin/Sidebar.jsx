import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Layers, MessageSquare, Users, LogOut, X, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, onToggle }) => {
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard',  path: '/admin',           icon: LayoutDashboard, exact: true },
    { name: 'Services',   path: '/admin/services',  icon: Layers },
    { name: 'Messages',   path: '/admin/messages',  icon: MessageSquare },
  ];
  if (user?.role === 'superadmin') {
    navItems.push({ name: 'Admins', path: '/admin/admins', icon: Users });
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onToggle}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 40 }}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        position: 'fixed', top: 0, left: 0,
        width: 260, height: '100vh',
        background: '#0f172a',
        display: 'flex', flexDirection: 'column',
        zIndex: 50,
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform .3s',
        flexShrink: 0,
      }}
        className="admin-sidebar"
      >
        {/* Header */}
        <div style={{ padding: '20px 20px 18px', borderBottom: '1px solid rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#c0392b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 14 }}>NC</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: 14, lineHeight: 1.2 }}>Admin Panel</div>
              <div style={{ color: '#64748b', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Naina Cleaning</div>
            </div>
          </Link>
          <button onClick={onToggle} className="sidebar-close-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#64748b' }}>
            <X size={18} />
          </button>
        </div>

        {/* User info */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#1e3a5f', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {user?.role === 'superadmin' ? <Shield size={18} color="#60a5fa" /> : <Users size={18} color="#60a5fa" />}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.username || 'Admin'}</div>
            <div style={{ color: '#64748b', fontSize: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</div>
          </div>
          {user?.role === 'superadmin' && (
            <div style={{ marginLeft: 'auto', background: 'rgba(167,139,250,.15)', color: '#a78bfa', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 999, whiteSpace: 'nowrap' }}>Super</div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 12px', overflowY: 'auto' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '8px 8px 12px' }}>Navigation</div>
          {navItems.map(({ name, path, icon: Icon, exact }) => (
            <NavLink
              key={path}
              to={path}
              end={exact}
              onClick={() => { if (window.innerWidth < 1024) onToggle(); }}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 12px', borderRadius: 10, marginBottom: 4,
                textDecoration: 'none', fontWeight: 600, fontSize: 14,
                transition: 'background .15s',
                background: isActive ? '#2563eb' : 'transparent',
                color: isActive ? '#fff' : '#94a3b8',
              })}
              onMouseEnter={e => { if (!e.currentTarget.style.background.includes('2563eb')) e.currentTarget.style.background = 'rgba(255,255,255,.06)'; }}
              onMouseLeave={e => { if (!e.currentTarget.style.background.includes('2563eb')) e.currentTarget.style.background = 'transparent'; }}
            >
              <Icon size={18} />
              {name}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <button
            onClick={logout}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 12px', borderRadius: 10,
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#ef4444', fontWeight: 600, fontSize: 14,
              transition: 'background .15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <style>{`
        @media (min-width: 1024px) {
          .admin-sidebar { transform: translateX(0) !important; position: static !important; height: 100vh; }
          .sidebar-close-btn { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
