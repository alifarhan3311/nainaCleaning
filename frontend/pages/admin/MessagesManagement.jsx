import React, { useEffect, useState } from 'react';
import { messageService } from '../../services/messageService';
import { useToast } from '../../context/ToastContext';
import { Trash2, Mail, Clock, Search } from 'lucide-react';

const STATUS_STYLE = {
  new:     { bg: '#dbeafe', color: '#1d4ed8' },
  read:    { bg: '#fef9c3', color: '#92400e' },
  replied: { bg: '#dcfce7', color: '#166534' },
};

const Spinner = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 240 }}>
    <div style={{ width: 44, height: 44, borderRadius: '50%', border: '3px solid #e5e7eb', borderTopColor: '#2563eb', animation: 'spin 0.8s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const MessagesManagement = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { showToast } = useToast();

  useEffect(() => { fetchMessages(); }, [filter]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const res = await messageService.getMessages(params);
      if (res.success) setMessages(res.data.messages || []);
    } catch {
      showToast('Failed to fetch messages', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      const res = await messageService.deleteMessage(id);
      if (res.success) { showToast('Message deleted', 'success'); fetchMessages(); }
    } catch { showToast('Failed to delete', 'error'); }
  };

  const handleStatus = async (id, status) => {
    try {
      const res = await messageService.updateMessageStatus(id, status);
      if (res.success) { showToast('Status updated', 'success'); fetchMessages(); }
    } catch { showToast('Failed to update status', 'error'); }
  };

  const sel = { padding: '5px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer', appearance: 'none' };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0 }}>Messages</h1>
          <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>{messages.length} message{messages.length !== 1 ? 's' : ''} found</p>
        </div>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ padding: '9px 14px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#374151', background: '#fff', cursor: 'pointer', outline: 'none' }}
        >
          <option value="all">All Messages</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      {loading ? <Spinner /> : (
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 0', color: '#94a3b8' }}>
              <Search size={36} color="#e2e8f0" style={{ margin: '0 auto 12px', display: 'block' }} />
              <div style={{ fontSize: 15, fontWeight: 600 }}>No messages found</div>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                    {['Date', 'Name', 'Email', 'Service', 'Message', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {messages.map(msg => {
                    const sc = STATUS_STYLE[msg.status] || { bg: '#f1f5f9', color: '#475569' };
                    return (
                      <tr key={msg._id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background .15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <td style={{ padding: '14px 16px', whiteSpace: 'nowrap', fontSize: 12, color: '#64748b' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Clock size={11} />{new Date(msg.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                          <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a' }}>{msg.name}</div>
                        </td>
                        <td style={{ padding: '14px 16px', whiteSpace: 'nowrap', fontSize: 13, color: '#475569' }}>{msg.email}</td>
                        <td style={{ padding: '14px 16px', whiteSpace: 'nowrap', fontSize: 13, color: '#64748b' }}>{msg.service || '—'}</td>
                        <td style={{ padding: '14px 16px', maxWidth: 220 }}>
                          <div style={{ fontSize: 13, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.message}</div>
                        </td>
                        <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                          <select
                            value={msg.status}
                            onChange={e => handleStatus(msg._id, e.target.value)}
                            style={{ ...sel, background: sc.bg, color: sc.color }}
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                          </select>
                        </td>
                        <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <a href={`mailto:${msg.email}`}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 7, background: '#eff6ff', color: '#2563eb', fontSize: 12, fontWeight: 600, textDecoration: 'none', border: '1px solid #bfdbfe' }}>
                              <Mail size={13} /> Reply
                            </a>
                            <button onClick={() => handleDelete(msg._id)}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 7, background: '#fef2f2', color: '#dc2626', fontSize: 12, fontWeight: 600, border: '1px solid #fecaca', cursor: 'pointer' }}>
                              <Trash2 size={13} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessagesManagement;
