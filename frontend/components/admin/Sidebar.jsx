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
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,.5)' }}
        />
      )}

      {/* Sidebar */}
      <aside
        className="admin-sidebar fixed top-0 left-0 h-screen w-64 flex flex-col z-50 flex-shrink-0 transition-transform duration-300 lg:static lg:translate-x-0"
        style={{ background: '#0B1220', transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
      >
        {/* Header */}
        <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-black text-sm">NC</div>
            <div>
              <div className="text-white font-extrabold text-sm leading-tight">Admin Panel</div>
              <div className="text-surface-muted text-[10px] uppercase tracking-widest">Naina Cleaning</div>
            </div>
          </Link>
          <button onClick={onToggle} className="sidebar-close-btn bg-none border-none cursor-pointer p-1 text-surface-muted hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* User info */}
        <div className="px-5 py-4 border-b border-white/6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(185,28,28,.2)' }}>
            {user?.role === 'superadmin' ? <Shield size={18} className="text-primary" /> : <Users size={18} className="text-primary" />}
          </div>
          <div className="overflow-hidden">
            <div className="text-white font-bold text-sm truncate">{user?.username || 'Admin'}</div>
            <div className="text-surface-muted text-xs truncate">{user?.email}</div>
          </div>
          {user?.role === 'superadmin' && (
            <div className="ml-auto bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap">Super</div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto">
          <div className="text-[10px] font-bold text-surface-muted tracking-widest uppercase px-2 pb-3 pt-1">Navigation</div>
          {navItems.map(({ name, path, icon: Icon, exact }) => (
            <NavLink
              key={path}
              to={path}
              end={exact}
              onClick={() => { if (window.innerWidth < 1024) onToggle(); }}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 no-underline font-semibold text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-surface-muted hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {name}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/6">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-none border-none cursor-pointer text-red-400 font-semibold text-sm hover:bg-red-500/10 transition-colors"
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
