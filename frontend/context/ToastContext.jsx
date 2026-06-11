import React, { createContext, useContext, useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const TOAST_STYLES = {
  success: { bg: '#16a34a', icon: CheckCircle },
  error:   { bg: '#dc2626', icon: XCircle },
  warning: { bg: '#d97706', icon: AlertTriangle },
  info:    { bg: '#2563eb', icon: Info },
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  };

  const removeToast = (id) => setToasts(p => p.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}

      {/* Toast container */}
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10, pointerEvents: 'none' }}>
        {toasts.map(toast => {
          const { bg, icon: Icon } = TOAST_STYLES[toast.type] || TOAST_STYLES.info;
          return (
            <div key={toast.id} style={{
              background: bg, color: '#fff',
              borderRadius: 12, padding: '13px 16px',
              display: 'flex', alignItems: 'center', gap: 10,
              minWidth: 280, maxWidth: 380,
              boxShadow: '0 8px 32px rgba(0,0,0,.2)',
              pointerEvents: 'all',
              animation: 'toastIn .25s ease',
              fontFamily: "'Segoe UI', system-ui, sans-serif",
              fontSize: 14, fontWeight: 600,
            }}>
              <Icon size={18} style={{ flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,.7)', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center' }}>
                <X size={15} />
              </button>
            </div>
          );
        })}
      </div>
      <style>{`@keyframes toastIn { from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }`}</style>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};
