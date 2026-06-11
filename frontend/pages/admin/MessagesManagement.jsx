import React, { useEffect, useState } from 'react';
import { messageService } from '../../services/messageService';
import { useToast } from '../../context/ToastContext';
import { Trash2, Mail, Clock, Search } from 'lucide-react';

const STATUS_STYLE = {
  new:     { bg: 'rgba(37,99,235,.15)', color: '#60a5fa' },
  read:    { bg: 'rgba(217,119,6,.15)', color: '#fbbf24' },
  replied: { bg: 'rgba(22,163,74,.15)', color: '#4ade80' },
};

const Spinner = () => (
  <div className="flex items-center justify-center h-60">
    <div className="w-11 h-11 rounded-full border-2 border-white/10 border-t-primary animate-spin" />
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
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Messages</h1>
          <p className="text-surface-muted text-sm mt-1">{messages.length} message{messages.length !== 1 ? 's' : ''} found</p>
        </div>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="input-dark text-sm font-semibold cursor-pointer"
        >
          <option value="all">All Messages</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      {loading ? <Spinner /> : (
        <div className="glass-card overflow-hidden">
          {messages.length === 0 ? (
            <div className="text-center py-16 text-surface-muted">
              <Search size={36} className="mx-auto mb-3 opacity-30" />
              <div className="text-base font-semibold">No messages found</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/6">
                    {['Date', 'Name', 'Email', 'Service', 'Message', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold text-surface-muted uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {messages.map(msg => {
                    const sc = STATUS_STYLE[msg.status] || { bg: 'rgba(71,85,105,.15)', color: '#94a3b8' };
                    return (
                      <tr key={msg._id} className="border-b border-white/4 hover:bg-white/3 transition-colors">
                        <td className="px-4 py-3.5 whitespace-nowrap text-xs text-surface-muted">
                          <div className="flex items-center gap-1">
                            <Clock size={11} />{new Date(msg.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <div className="text-sm font-bold text-white">{msg.name}</div>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-sm text-surface-muted">{msg.email}</td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-sm text-surface-muted">{msg.service || '—'}</td>
                        <td className="px-4 py-3.5 max-w-xs">
                          <div className="text-sm text-surface-muted truncate">{msg.message}</div>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
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
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <a href={`mailto:${msg.email}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold no-underline transition-colors"
                              style={{ background: 'rgba(37,99,235,.15)', color: '#60a5fa', border: '1px solid rgba(37,99,235,.3)' }}>
                              <Mail size={12} /> Reply
                            </a>
                            <button onClick={() => handleDelete(msg._id)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                              style={{ background: 'rgba(220,38,38,.15)', color: '#f87171', border: '1px solid rgba(220,38,38,.3)', cursor: 'pointer' }}>
                              <Trash2 size={12} /> Delete
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

// const MessagesManagement = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('all');
//   const { showToast } = useToast();

//   useEffect(() => { fetchMessages(); }, [filter]);

//   const fetchMessages = async () => {
//     setLoading(true);
//     try {
//       const params = filter !== 'all' ? { status: filter } : {};
//       const res = await messageService.getMessages(params);
//       if (res.success) setMessages(res.data.messages || []);
//     } catch {
//       showToast('Failed to fetch messages', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this message?')) return;
//     try {
//       const res = await messageService.deleteMessage(id);
//       if (res.success) { showToast('Message deleted', 'success'); fetchMessages(); }
//     } catch { showToast('Failed to delete', 'error'); }
//   };

//   const handleStatus = async (id, status) => {
//     try {
//       const res = await messageService.updateMessageStatus(id, status);
//       if (res.success) { showToast('Status updated', 'success'); fetchMessages(); }
//     } catch { showToast('Failed to update status', 'error'); }
//   };

//   const sel = { padding: '5px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer', appearance: 'none' };

//   return (
//     <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
//       {/* Header */}
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
//         <div>
//           <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0 }}>Messages</h1>
//           <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>{messages.length} message{messages.length !== 1 ? 's' : ''} found</p>
//         </div>
//         <select
//           value={filter}
//           onChange={e => setFilter(e.target.value)}
//           style={{ padding: '9px 14px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#374151', background: '#fff', cursor: 'pointer', outline: 'none' }}
//         >
//           <option value="all">All Messages</option>
//           <option value="new">New</option>
//           <option value="read">Read</option>
//           <option value="replied">Replied</option>
//         </select>
//       </div>

//       {loading ? <Spinner /> : (
//         <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
//           {messages.length === 0 ? (
//             <div style={{ textAlign: 'center', padding: '64px 0', color: '#94a3b8' }}>
//               <Search size={36} color="#e2e8f0" style={{ margin: '0 auto 12px', display: 'block' }} />
//               <div style={{ fontSize: 15, fontWeight: 600 }}>No messages found</div>
//             </div>
//           ) : (
//             <div style={{ overflowX: 'auto' }}>
//               <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                 <thead>
//                   <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
//                     {['Date', 'Name', 'Email', 'Service', 'Message', 'Status', 'Actions'].map(h => (
//                       <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {messages.map(msg => {
//                     const sc = STATUS_STYLE[msg.status] || { bg: '#f1f5f9', color: '#475569' };
//                     return (
//                       <tr key={msg._id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background .15s' }}
//                         onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
//                         onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
//                       >
//                         <td style={{ padding: '14px 16px', whiteSpace: 'nowrap', fontSize: 12, color: '#64748b' }}>
//                           <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
//                             <Clock size={11} />{new Date(msg.createdAt).toLocaleDateString()}
//                           </div>
//                         </td>
//                         <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
//                           <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a' }}>{msg.name}</div>
//                         </td>
//                         <td style={{ padding: '14px 16px', whiteSpace: 'nowrap', fontSize: 13, color: '#475569' }}>{msg.email}</td>
//                         <td style={{ padding: '14px 16px', whiteSpace: 'nowrap', fontSize: 13, color: '#64748b' }}>{msg.service || '—'}</td>
//                         <td style={{ padding: '14px 16px', maxWidth: 220 }}>
//                           <div style={{ fontSize: 13, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.message}</div>
//                         </td>
//                         <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
//                           <select
//                             value={msg.status}
//                             onChange={e => handleStatus(msg._id, e.target.value)}
//                             style={{ ...sel, background: sc.bg, color: sc.color }}
//                           >
//                             <option value="new">New</option>
//                             <option value="read">Read</option>
//                             <option value="replied">Replied</option>
//                           </select>
//                         </td>
//                         <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
//                           <div style={{ display: 'flex', gap: 8 }}>
//                             <a href={`mailto:${msg.email}`}
//                               style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 7, background: '#eff6ff', color: '#2563eb', fontSize: 12, fontWeight: 600, textDecoration: 'none', border: '1px solid #bfdbfe' }}>
//                               <Mail size={13} /> Reply
//                             </a>
//                             <button onClick={() => handleDelete(msg._id)}
//                               style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 7, background: '#fef2f2', color: '#dc2626', fontSize: 12, fontWeight: 600, border: '1px solid #fecaca', cursor: 'pointer' }}>
//                               <Trash2 size={13} /> Delete
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessagesManagement;
