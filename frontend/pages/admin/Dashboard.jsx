import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { serviceService } from '../../services/serviceService';
import { messageService } from '../../services/messageService';
import { Layers, MessageSquare, Users, TrendingUp, ArrowRight, Clock } from 'lucide-react';

const STAT_COLORS = {
  blue:   { bg: '#2563eb', light: '#eff6ff' },
  green:  { bg: '#16a34a', light: '#f0fdf4' },
  yellow: { bg: '#d97706', light: '#fffbeb' },
  purple: { bg: '#7c3aed', light: '#f5f3ff' },
};

const Spinner = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 240 }}>
    <div style={{ width: 44, height: 44, borderRadius: '50%', border: '3px solid #e5e7eb', borderTopColor: '#2563eb', animation: 'spin 0.8s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ totalServices: 0, totalMessages: 0, newMessages: 0 });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, messagesRes] = await Promise.all([
        serviceService.getServices(),
        messageService.getMessages({ limit: 5, status: 'new' }),
      ]);
      if (servicesRes.success) {
        setStats(p => ({ ...p, totalServices: servicesRes.data.pagination?.totalItems || servicesRes.data.services?.length || 0 }));
      }
      if (messagesRes.success) {
        setStats(p => ({
          ...p,
          totalMessages: messagesRes.data.pagination?.totalItems || messagesRes.data.messages?.length || 0,
          newMessages: messagesRes.data.messages?.length || 0,
        }));
        setRecentMessages(messagesRes.data.messages || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Services',  value: stats.totalServices,  icon: Layers,        color: 'blue',   link: '/admin/services' },
    { title: 'Total Messages',  value: stats.totalMessages,  icon: MessageSquare, color: 'green',  link: '/admin/messages' },
    { title: 'New Messages',    value: stats.newMessages,    icon: TrendingUp,    color: 'yellow', link: '/admin/messages' },
    { title: 'Admin Users',     value: 1,                    icon: Users,         color: 'purple', link: '/admin/admins' },
  ];

  if (loading) return <Spinner />;

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0 }}>Dashboard</h1>
        <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>Welcome back! Here's what's happening.</p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }}>
        {statCards.map((s, i) => {
          const col = STAT_COLORS[s.color];
          return (
            <Link key={i} to={s.link} style={{ textDecoration: 'none', display: 'block', background: '#fff', borderRadius: 14, padding: '22px', border: '1px solid #e5e7eb', transition: 'box-shadow .2s, transform .2s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: col.light, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <s.icon size={22} color={col.bg} />
                </div>
                <ArrowRight size={15} color="#94a3b8" />
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#64748b', marginTop: 6, fontWeight: 500 }}>{s.title}</div>
            </Link>
          );
        })}
      </div>

      {/* Recent messages */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>Recent New Messages</h2>
          <Link to="/admin/messages" style={{ fontSize: 13, color: '#2563eb', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
            View all <ArrowRight size={13} />
          </Link>
        </div>
        <div style={{ padding: '8px 0' }}>
          {recentMessages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#94a3b8', fontSize: 14 }}>
              <MessageSquare size={32} color="#e2e8f0" style={{ margin: '0 auto 12px', display: 'block' }} />
              No new messages
            </div>
          ) : (
            recentMessages.map(msg => (
              <div key={msg._id} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 24px', borderBottom: '1px solid #f8fafc', transition: 'background .15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MessageSquare size={17} color="#2563eb" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{msg.name}</div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 1 }}>{msg.email}</div>
                  <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.message}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                  <span style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: 10, fontWeight: 700, borderRadius: 999, padding: '3px 8px', textTransform: 'uppercase' }}>New</span>
                  <span style={{ fontSize: 11, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Clock size={10} /> {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
